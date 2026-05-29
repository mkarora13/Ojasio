import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';

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
  
  const { title, excerpt, slug, adminToken } = req.body;
  if (!adminToken || adminToken !== 'ojasio-secret-admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const dbPath = process.env.NODE_ENV === 'production' || process.env.VERCEL
    ? join('/tmp', 'subscribers.json') 
    : join(process.cwd(), 'subscribers.json');

  let subscribers: any[] = [];
  try {
    if (existsSync(dbPath)) {
      subscribers = JSON.parse(readFileSync(dbPath, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading subscribers db:', err);
  }

  const activeSubscribers = subscribers.filter(s => s.status === 'active');
  const emails = activeSubscribers.map(s => s.email);

  if (emails.length === 0) {
    return res.status(200).json({ success: true, message: 'No active subscribers found.' });
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const batch = emails.map(email => {
        const token = encryptEmail(email);
        return {
          from: 'Ojasio Journal <hello@ojasio.com>',
          to: email,
          subject: title || 'New Insight from Ojasio',
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: -apple-system, sans-serif; background-color: #F8F8F8; margin: 0; padding: 20px; text-align: center; }
    .main { background: #fff; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 8px; border: 1px solid #EAC881; }
    h1 { color: #1A2F2B; font-weight: 300; font-family: 'Playfair Display', serif; }
    p { color: #1A2F2B; line-height: 1.6; }
    .btn { display: inline-block; background: #1A2F2B; color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 4px; letter-spacing: 0.2em; text-transform: uppercase; font-size: 12px; font-weight: 500; margin-top: 30px; }
    .footer { margin-top: 40px; font-size: 11px; opacity: 0.6; }
    .footer a { color: #1A2F2B; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="main">
    <div style="color: #EAC881; letter-spacing: 0.3em; text-transform: uppercase; font-size: 14px; margin-bottom: 24px;">Ojasio Journal</div>
    <h1>${title}</h1>
    <p style="font-style: italic; opacity: 0.8; margin-bottom: 20px;">${excerpt}</p>
    <p>Read the latest insights from our clinical nutrition team.</p>
    <a href="https://www.ojasio.com/blog/${slug}" class="btn">Read the Full Insight</a>
    
    <div class="footer">
      <p>Elevating human health through science and sustainability.</p>
      <a href="https://www.ojasio.com/unsubscribe?token=${token}">Unsubscribe</a> | <a href="https://www.ojasio.com">ojasio.com</a>
    </div>
  </div>
</body>
</html>
          `
        };
      });

      await resend.emails.sendBatch(batch);
    } catch (err) {
      console.error('Broadcast failed', err);
      return res.status(500).json({ error: 'Broadcast failed due to email service error.' });
    }
  } else {
     console.log('Mock broadcast to', emails.length, 'subscribers');
  }

  return res.status(200).json({ success: true, message: `Successfully broadcasted to ${emails.length} subscribers` });
}
