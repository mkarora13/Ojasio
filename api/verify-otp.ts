import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, otp, hash, expiresAt } = req.body;
  if (!email || !otp || !hash || !expiresAt) {
    return res.status(400).json({ error: "Missing required verification data" });
  }

  if (Date.now() > expiresAt) {
    return res.status(400).json({ error: "OTP has expired. Please request a new one." });
  }

  const secret = process.env.OTP_SECRET || 'ojas-secret-key-123';
  const dataToHash = `${email}:${otp}`;
  const validHash = crypto.createHmac('sha256', secret).update(dataToHash).digest('hex');

  if (hash !== validHash) {
    return res.status(400).json({ error: "Invalid OTP. Please try again." });
  }

  res.status(200).json({ success: true, message: "Email verified successfully" });
}
