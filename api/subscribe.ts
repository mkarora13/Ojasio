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
    const source = req.body?.source || 'Homepage Journal Section';
    const userAgent = req.body?.userAgent || 'Unknown Device';

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

    const timestamp = new Date().toISOString();
    subscribers.push({
      email,
      source,
      userAgent,
      subscribedAt: timestamp,
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
          html: `<h2>NEW OJASIO JOURNAL SUBSCRIBER</h2>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Source:</strong> ${source}</p>
<p><strong>Subscribed At:</strong> ${timestamp}</p>
<p><strong>Device/Browser:</strong> ${userAgent}</p>
<p><strong>Status:</strong> Active</p>`,
        });

        if (adminResponse.error) {
           console.error('Admin Email Resend API Error:', adminResponse.error);
        }
        
        const welcomeResponse = await resend.emails.send({
          from: 'Ojasio <hello@ojasio.com>',
          to: email,
          subject: 'Welcome to the Ojasio Journal',
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Ojasio Journal</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@1,400&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #F8F8F8;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      margin: 0 auto;
    }
    td {
      padding: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F8F8F8;
      padding: 60px 0;
    }
    .main {
      background-color: #FFFFFF;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border: 1px solid #EAC881;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      padding: 56px 40px 48px 40px;
      text-align: center;
      background-color: #1A2F2B;
    }
    .header-logo {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #EAC881;
      margin-bottom: 24px;
    }
    .header-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 32px;
      font-weight: 400;
      line-height: 1.3;
      margin: 0;
      color: #FFFFFF;
    }
    .content {
      padding: 48px 40px;
      background-color: #FFFFFF;
    }
    .greeting {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #1A2F2B;
      margin-bottom: 32px;
      opacity: 0.5;
    }
    .body-text {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.8;
      color: #1A2F2B;
      margin-bottom: 24px;
    }
    .body-text-emphasis {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      font-style: italic;
      color: #C5A059;
      margin: 40px 0;
      text-align: center;
      line-height: 1.4;
    }
    .cta-container {
      text-align: center;
      margin-top: 48px;
    }
    .cta-button {
      display: inline-block;
      background-color: #1A2F2B;
      color: #FFFFFF;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 18px 36px;
      text-decoration: none;
      border-radius: 4px;
    }
    .footer {
      padding: 40px;
      background-color: #FAF9F6;
      border-top: 1px solid rgba(26, 47, 43, 0.05);
      text-align: center;
    }
    .footer-text {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 300;
      line-height: 1.6;
      color: #1A2F2B;
      opacity: 0.6;
      margin-bottom: 16px;
    }
    .footer-links {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.05em;
      color: #1A2F2B;
      opacity: 0.4;
    }
    .footer-links a {
      color: #1A2F2B;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main" role="presentation">
      <tr>
        <td class="header">
          <div class="header-logo">Ojasio</div>
          <h1 class="header-title">The pursuit of<br>metabolic harmony.</h1>
        </td>
      </tr>
      <tr>
        <td class="content">
          <div class="greeting">Read time: 1 minute</div>
          
          <p class="body-text">Welcome to a space reserved for those who refuse to settle for baseline health.</p>
          
          <p class="body-text">By joining the Ojasio Journal, you've taken a deliberate step away from the noise of diet culture and towards evidence-based, sustainable wellness. We believe that true vitality isn't found in extremes, but in the intelligent application of clinical nutrition and metabolic science.</p>
          
          <div class="body-text-emphasis">
            "Health is not the absence of disease,<br>it is the presence of vitality."
          </div>
          
          <p class="body-text">In the coming weeks, you can expect curated insights delivered quietly to your inbox. We will decode complex nutritional science, share actionable protocols for working professionals, and explore the nuanced realities of achieving lasting metabolic balance.</p>
          
          <p class="body-text">No spam. No overwhelming daily blasts. Just pure signal.</p>
          
          <p class="body-text">Welcome to the inner circle.</p>

          <div class="cta-container">
            <a href="https://www.ojasio.com/blog" class="cta-button">Explore the Journal</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          <p class="footer-text">
            Ojasio Wellness<br>
            Elevating human health through science and sustainability.
          </p>
          <div class="footer-links">
            <a href="https://www.ojasio.com/unsubscribe?token=${token}">Unsubscribe</a> &nbsp;|&nbsp; 
            <a href="https://www.ojasio.com">ojasio.com</a>
          </div>
        </td>
      </tr>
    </table>
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
