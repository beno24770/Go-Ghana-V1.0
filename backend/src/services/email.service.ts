import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

export const sendVerificationEmail = async (email: string, token: string, displayName?: string) => {
    const verificationUrl = `${FRONTEND_URL}/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'GoGhana <noreply@goghana.ai>',
        to: [email],
        subject: 'Verify your GoGhana account',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #006B3F; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">GoGhana</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Welcome${displayName ? `, ${displayName}` : ''}!</h2>
          <p>Please verify your email by clicking below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: #006B3F; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px;">Verify Email</a>
          </div>
          <p style="color: #999; font-size: 12px;">Link expires in 24 hours.</p>
        </div>
      </div>
    `,
    });

    if (error) throw new Error('Failed to send verification email');
    return data;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'GoGhana <noreply@goghana.ai>',
        to: [email],
        subject: 'Reset your GoGhana password',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #006B3F; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">GoGhana</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Password Reset</h2>
          <p>Click below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: #CE1126; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px;">Reset Password</a>
          </div>
          <p style="color: #999; font-size: 12px;">Link expires in 1 hour.</p>
        </div>
      </div>
    `,
    });

    if (error) throw new Error('Failed to send reset email');
    return data;
};
