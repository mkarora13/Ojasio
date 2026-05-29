import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Resend } from 'resend';

// Simple encryption for the token
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'ojasio-fallback-secret-key-32chars!!'; 
const IV_LENGTH = 16;

function encryptEmail(email: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32, '!').slice(0, 32)), iv);
  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const token = encryptEmail(email);

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Ojasio System <noreply@ojasio.com>',
        to: 'hello@ojasio.com',
        subject: 'New Subscription to Ojasio Journal',
        html: `<p>A new user has subscribed to the Ojasio Journal.</p><p><strong>Email:</strong> ${email}</p>`,
      });
      
      await resend.emails.send({
        from: 'Ojasio <hello@ojasio.com>',
        to: email,
        subject: 'Welcome to a new standard of wellness.',
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: -apple-system, sans-serif; background-color: #F8F8F8; margin: 0; padding: 20px; text-align: center; }
    .main { background: #fff; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 8px; border: 1px solid #EAC881; }
    h1 { color: #1A2F2B; font-weight: 300; }
    p { color: #1A2F2B; line-height: 1.6; }
    a { color: #1A2F2B; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="main">
    <h1>Welcome to Ojasio</h1>
    <p>Thank you for subscribing.</p>
    <br><br>
    <a href="https://ojasio.com/unsubscribe?token=${token}">Unsubscribe</a>
  </div>
</body>
</html>
        `,
      });
    }

    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
