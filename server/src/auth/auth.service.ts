import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { AdminOtp } from './entities/admin-otp.entity';
import { EmailService } from './email.service';

const DEFAULT_ADMIN_EMAIL = 'thecarinsiwa@gmail.com';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || DEFAULT_ADMIN_EMAIL)
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminOtp)
    private readonly otpRepo: Repository<AdminOtp>,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  isAllowedEmail(email: string): boolean {
    return ADMIN_EMAILS.includes(email.trim().toLowerCase());
  }

  private generateOtp(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  private generateToken(): string {
    return randomBytes(18).toString('base64url');
  }

  async createOtpAndSendEmail(email: string): Promise<{ token: string } | null> {
    if (!this.isAllowedEmail(email)) return null;
    const otp = this.generateOtp();
    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await this.otpRepo.delete({ email });
    await this.otpRepo.save(this.otpRepo.create({ token, email, otp, expiresAt }));
    const sent = await this.emailService.sendOtp(email, otp);
    if (!sent) return null;
    return { token };
  }

  async verifyOtp(token: string, code: string): Promise<{ access_token: string } | null> {
    const row = await this.otpRepo.findOne({ where: { token } });
    if (!row || row.otp !== code.trim()) return null;
    if (new Date() > row.expiresAt) {
      await this.otpRepo.remove(row);
      return null;
    }
    await this.otpRepo.remove(row);
    const payload = { sub: row.email, email: row.email, type: 'admin' as const };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    return { access_token };
  }

  async validateToken(accessToken: string): Promise<{ email: string } | null> {
    try {
      const payload = this.jwtService.verify<{ email: string; type: string }>(accessToken);
      if (payload.type !== 'admin') return null;
      return { email: payload.email };
    } catch {
      return null;
    }
  }
}
