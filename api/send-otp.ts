import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "RESEND_API_KEY is not configured on the server" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
  
  // Create an HMAC hash of the OTP + email to verify later ephemerally
  const secret = process.env.OTP_SECRET || 'ojas-secret-key-123';
  const dataToHash = `${email}:${otp}`;
  const hash = crypto.createHmac('sha256', secret).update(dataToHash).digest('hex');
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

  try {
    const { data, error } = await resend.emails.send({
      from: 'Ojasio <onboarding@resend.dev>', // Resend dev email
      to: [email],
      subject: 'Your Ojasio Verification Code',
      html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`,
    });

    if (error) {
      console.error("Resend send error:", error);
      return res.status(500).json({ error: error.message || "Failed to send OTP email." });
    }

    res.status(200).json({ success: true, message: "OTP sent successfully", hash, expiresAt });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP. Please try again." });
  }
}
