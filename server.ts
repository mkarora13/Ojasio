import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Simple encryption for the token
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'ojasio-fallback-secret-key-32chars!!'; // Must be 32 bytes
const IV_LENGTH = 16;

function encryptEmail(email: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32, '!').slice(0, 32)), iv);
  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decryptToken(token: string): string | null {
  try {
    const textParts = token.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY.padEnd(32, '!').slice(0, 32)), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
  } catch (err) {
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add compression middleware to gzip responses (improves LCP/Performance)
  app.use(compression());
  app.use(express.json());

  // Subscription API Endpoint (Newsletter system)
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // 1. Store email in a lightweight local database (JSON format)
      // In production, sync this table via Supabase or Firebase
      const dbPath = process.env.NODE_ENV === 'production' 
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
        // Continue anyway since we want to send the email notification
      }

      // 2. Send email via Resend if API key is configured
      if (process.env.RESEND_API_KEY) {
        try {
          const { Resend } = await import('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          // Notify admin
          await resend.emails.send({
            from: 'Ojasio System <hello@ojasio.com>',
            to: 'hello@ojasio.com',
            subject: 'New Subscription to Ojasio Journal',
            html: `<p>A new user has subscribed to the Ojasio Journal.</p><p><strong>Email:</strong> ${email}</p>`,
          });

          const token = encryptEmail(email);

          // Welcome Email for Subscriber
          await resend.emails.send({
          from: 'Ojasio <hello@ojasio.com>',
          to: email,
          subject: 'Welcome to a new standard of wellness.',
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
            <a href="https://ojasio.com/blog" class="cta-button">Explore the Journal</a>
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
            <a href="https://ojasio.com/unsubscribe?token=${token}">Unsubscribe</a> &nbsp;|&nbsp; 
            <a href="https://ojasio.com">ojasio.com</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
          `,
          });
        } catch (emailError: any) {
          console.error('Email sending failed Exception:', emailError.message || emailError);
          // Proceed to success response regardless of email failure
        }
      } else {
         console.log(`RESEND_API_KEY not set. Mock subscribing ${email} and notifying hello@ojasio.com.`);
      }

      res.status(200).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Subscription Endpoint Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/unsubscribe', async (req, res) => {
    try {
      const { token, email: fallbackEmail } = req.body;
      
      let email = fallbackEmail;
      
      if (token) {
        const decodedEmail = decryptToken(token);
        if (decodedEmail) {
          email = decodedEmail;
        } else {
          return res.status(400).json({ error: 'Invalid or expired unsubscribe token.' });
        }
      }

      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid unsubscribe request.' });
      }

      const dbPath = process.env.NODE_ENV === 'production' 
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
      
      const subscriberIndex = subscribers.findIndex((s: any) => s.email === email);
      if (subscriberIndex !== -1) {
        subscribers[subscriberIndex].status = 'unsubscribed';
        subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
        try {
          fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));
        } catch (err) {
          console.error('Error saving updated subscribers db:', err);
        }
      }
      
      res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
    } catch (error) {
      console.error('Unsubscribe Endpoint Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Determine the dist directory path
    // In ES modules, __dirname is not available directly, so we use process.cwd()
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static files from the dist directory with caching for better performance
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true,
      lastModified: true
    }));
    
    // Read index.html
    const indexTemplate = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

    // Send all requests to the index.html file to be handled by React Router
    app.get('*', (req, res) => {
      let html = indexTemplate;

      // Basic injection for known static bots & crawlers, or general
      if (req.originalUrl.includes('/blog/')) {
         const noScriptFallback = `
         <noscript>
           <article>
             <h1>Ojasio Blog Article</h1>
             <p>Welcome to our premium nutrition and wellness blog. This content requires JavaScript to load the interactive article. Please enable JavaScript or visit ojasio.com to learn more about our diet plans for PCOS, weight loss, and working professionals.</p>
           </article>
         </noscript>
         `;
         html = html.replace('<div id="root"></div>', `<div id="root"></div>${noScriptFallback}`);
      }

      res.send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
