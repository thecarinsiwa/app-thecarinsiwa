import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Resend } from 'resend';

const DEFAULT_RESEND_FROM = 'Carin Siwa <onboarding@resend.dev>';
const OTP_SUBJECT = 'Votre code d’accès admin - Carin Siwa';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter | null = null;
  private resend: Resend | null = null;

  constructor() {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      this.resend = new Resend(resendKey);
    }
    if (!this.resend) {
      const host = process.env.SMTP_HOST;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      if (host && user && pass) {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          connectionTimeout: 15000,
          greetingTimeout: 10000,
        });
      }
    }
  }

  async onModuleInit() {
    if (this.resend) {
      console.log('[Email] Resend configuré – envoi des codes OTP activé');
      return;
    }
    if (!this.transporter) return;
    try {
      await this.transporter.verify();
      console.log('[Email] SMTP OK – envoi des codes OTP activé');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Email] Connexion SMTP échouée:', msg);
      if (err && typeof err === 'object' && 'response' in err) {
        console.error('[Email] Réponse serveur:', (err as { response: string }).response);
      }
      console.error('[Email] Vérifiez SMTP_HOST, SMTP_USER, SMTP_PASS. Gmail : utilisez un mot de passe d’application (https://myaccount.google.com/apppasswords)');
    }
  }

  async sendOtp(to: string, otp: string): Promise<boolean> {
    const html = this.getOtpEmailHtml(otp);
    const text = `Carin Siwa – Connexion admin\n\nVotre code à 6 chiffres : ${otp}\n\nIl expire dans 15 minutes.\n\n— Carin Siwa`;

    if (this.resend) {
      const from = (process.env.EMAIL_FROM || DEFAULT_RESEND_FROM).trim();
      try {
        console.log('[Email] Sending OTP via Resend to', to);
        const { error } = await this.resend.emails.send({
          from,
          to: [to],
          subject: OTP_SUBJECT,
          html,
        });
        if (error) {
          console.error('[Email] Resend send failed:', error.message);
          return false;
        }
        console.log('[Email] OTP sent successfully to', to);
        return true;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('[Email] Resend send OTP failed:', msg);
        return false;
      }
    }

    if (!this.transporter) {
      console.warn('SMTP not configured. OTP (for dev):', otp);
      return true;
    }
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    try {
      console.log('[Email] Sending OTP to', to, 'from', from);
      await this.transporter.sendMail({
        from,
        to,
        subject: OTP_SUBJECT,
        text,
        html,
      });
      console.log('[Email] OTP sent successfully to', to);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const code = err && typeof err === 'object' && 'code' in err ? (err as { code: string }).code : '';
      console.error('[Email] Send OTP failed:', msg, code ? `(code: ${code})` : '');
      if (err && typeof err === 'object' && 'response' in err) {
        console.error('[Email] Server response:', (err as { response: string }).response);
      }
      return false;
    }
  }

  private getOtpEmailHtml(otp: string): string {
    const codeDigits = otp.split('').map((d) => `<span style="display:inline-block;min-width:28px;text-align:center;font-size:28px;font-weight:700;letter-spacing:4px;color:#0f766e;">${d}</span>`).join('');
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code d'accès admin</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:420px;background-color:#ffffff;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.07);overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#0d9488 0%,#0f766e 100%);padding:24px 28px;text-align:center;">
              <h1 style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">Carin Siwa</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.9);">Connexion admin</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.5;">Voici votre code à 6 chiffres pour accéder à l’espace d’administration :</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td align="center" style="background-color:#f0fdfa;border:2px solid #99f6e4;border-radius:12px;padding:20px;">
                    <div style="letter-spacing:2px;">${codeDigits}</div>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#64748b;">Ce code expire dans <strong>15 minutes</strong>. Ne le partagez avec personne.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">Portfolio · Carin Siwa</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
  }
}
