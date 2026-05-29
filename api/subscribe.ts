import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
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
    const email = req.body?.email;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const token = encryptEmail(email);

    // Store email in local JSON DB (simulating real DB for Vercel demo)
    const dbPath = process.env.NODE_ENV === 'production' || process.env.VERCEL
      ? path.join('/tmp', 'subscribers.json') 
      : path.join(process.cwd(), 'subscribers.json');
      
    let subscribers: any[] = [];
    try {
      if (fs.existsSync(dbPath)) {
        subscribers = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      }
    } catch (err) {
      console.error('Error reading subscribers db:', err);
    }
    
    if (subscribers.find((s: any) => s.email === email)) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    });
    
    try {
      fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));
    } catch (err) {
      console.error('Error saving to subscribers db:', err);
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const adminResponse = await resend.emails.send({
          from: 'Ojasio System <hello@ojasio.com>', // Modified from noreply@ to avoid bounce if unverified domain
          to: 'hello@ojasio.com',
          subject: 'New Subscription to Ojasio Journal',
          html: `<p>A new user has subscribed to the Ojasio Journal.</p><p><strong>Email:</strong> ${email}</p>`,
        });

        if (adminResponse.error) {
           console.error('Admin Email Resend API Error:', adminResponse.error);
        }
        
        const welcomeResponse = await resend.emails.send({
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
    .btn { display: inline-block; background: #1A2F2B; color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 4px; letter-spacing: 0.2em; text-transform: uppercase; font-size: 12px; font-weight: 500; margin-top: 30px; }
    .footer { margin-top: 40px; font-size: 11px; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="main">
    <div style="color: #EAC881; letter-spacing: 0.3em; text-transform: uppercase; font-size: 14px; margin-bottom: 24px;">Ojasio</div>
    <h1>The pursuit of<br>metabolic harmony.</h1>
    <p>By joining the Ojasio Journal, you've taken a deliberate step away from the noise of diet culture and towards evidence-based, sustainable wellness. We believe that true vitality isn't found in extremes, but in the intelligent application of clinical nutrition and metabolic science.</p>
    <br>
    <a href="https://www.ojasio.com/blog" class="btn">Explore the Journal</a>
    
    <div class="footer">
      <p>Elevating human health through science and sustainability.</p>
      <a href="https://www.ojasio.com/unsubscribe?token=${token}">Unsubscribe</a> | <a href="https://www.ojasio.com">ojasio.com</a>
    </div>
  </div>
</body>
</html>
        `,
        });

        if (welcomeResponse.error) {
           console.error('Welcome Email Resend API Error:', welcomeResponse.error);
        }
      } catch (emailError: any) {
        console.error('Email sending failed Exception:', emailError.message || emailError);
        // Continue even if email fails to avoid blocking the user
      }
    }

    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message, stack: error.stack });
  }
}
