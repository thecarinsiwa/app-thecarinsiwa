import { Controller, Get, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './auth.dto';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'admin_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Ouvre http://localhost:3001/auth/redirect-uri pour voir l’URI à coller dans Google Console */
  @Get('redirect-uri')
  getRedirectUri() {
    const uri = (process.env.GOOGLE_REDIRECT_URI || `${process.env.API_URL || 'http://localhost:3001'}/auth/google/callback`).trim();
    return { redirect_uri: uri };
  }

  @Get('google')
  async googleAuth(@Req() req: Request, @Res() res: Response) {
    const redirect = (process.env.GOOGLE_REDIRECT_URI || `${process.env.API_URL || 'http://localhost:3001'}/auth/google/callback`).trim();
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    if (!clientId) {
      return res.redirect(`${FRONTEND_URL}/admin/login?error=config`);
    }
    const scope = encodeURIComponent('email profile openid');
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    return res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    const redirectUri = (process.env.GOOGLE_REDIRECT_URI || `${process.env.API_URL || 'http://localhost:3001'}/auth/google/callback`).trim();
    if (!code || !clientId || !clientSecret) {
      return res.redirect(`${FRONTEND_URL}/admin/login?error=callback`);
    }
    try {
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      const tokenText = await tokenRes.text();
      if (!tokenRes.ok) {
        console.error('[Auth] Google token error:', tokenRes.status, tokenText);
        return res.redirect(`${FRONTEND_URL}/admin/login?error=token`);
      }
      let tokens: { access_token?: string };
      try {
        tokens = JSON.parse(tokenText);
      } catch {
        console.error('[Auth] Google token response was not JSON:', tokenText.slice(0, 200));
        return res.redirect(`${FRONTEND_URL}/admin/login?error=token`);
      }
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      if (!userRes.ok) {
        return res.redirect(`${FRONTEND_URL}/admin/login?error=profile`);
      }
      const profile = await userRes.json();
      const email = profile.email?.trim();
      if (!email) {
        return res.redirect(`${FRONTEND_URL}/admin/login?error=email`);
      }
      if (!this.authService.isAllowedEmail(email)) {
        return res.redirect(`${FRONTEND_URL}/admin/login?error=unauthorized`);
      }
      const result = await this.authService.createOtpAndSendEmail(email);
      if (!result) {
        return res.redirect(`${FRONTEND_URL}/admin/login?error=otp_send`);
      }
      return res.redirect(`${FRONTEND_URL}/admin/login?token=${encodeURIComponent(result.token)}&step=otp`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : undefined;
      console.error('[Auth] Google callback error:', msg, stack);
      return res.redirect(`${FRONTEND_URL}/admin/login?error=server`);
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto, @Res() res: Response) {
    const result = await this.authService.verifyOtp(dto.token, dto.code);
    if (!result) {
      return res.status(401).json({ message: 'Code invalide ou expiré' });
    }
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, result.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
    return res.json({ success: true });
  }

  @Get('me')
  async me(@Req() req: Request) {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      return { user: null };
    }
    const user = await this.authService.validateToken(token);
    if (!user) {
      return { user: null };
    }
    return { user: { email: user.email } };
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    return res.json({ success: true });
  }
}
