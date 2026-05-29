import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

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
      const dbPath = path.join(process.cwd(), 'subscribers.json');
      let subscribers = [];
      if (fs.existsSync(dbPath)) {
        subscribers = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      }
      
      if (subscribers.find((s: any) => s.email === email)) {
        return res.status(400).json({ error: 'Email already subscribed' });
      }

      subscribers.push({
        email,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      });
      fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));

      // 2. Send email via Resend if API key is configured
      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Notify admin
        await resend.emails.send({
          from: 'Ojasio System <noreply@ojasio.com>',
          to: 'hello@ojasio.com',
          subject: 'New Subscription to Ojasio Journal',
          html: `<p>A new user has subscribed to the Ojasio Journal.</p><p><strong>Email:</strong> ${email}</p>`,
        });

        // Welcome Email for Subscriber
        await resend.emails.send({
          from: 'Ojasio <hello@ojasio.com>',
          to: email,
          subject: 'Welcome to the Ojasio Journal',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A2F2B; padding: 40px 20px; background-color: #FAF9F6; border: 1px solid #EAC881;">
               <h1 style="font-weight: 300; margin-bottom: 24px; text-align: center;">Welcome to Ojasio</h1>
               <p style="line-height: 1.6; margin-bottom: 20px;">Thank you for subscribing to the Ojasio Journal.</p>
               <p style="line-height: 1.6; margin-bottom: 20px;">You will now receive curated insights on clinical nutrition, metabolic science, and sustainable wellness protocols, delivered directly to your inbox.</p>
               <p style="line-height: 1.6;">In Vitality,<br/>The Ojasio Team</p>
               <hr style="border: 0; border-top: 1px solid #1A2F2B20; margin: 40px 0;" />
               <p style="font-size: 11px; text-align: center; color: #1A2F2B80;">
                 <a href="https://ojasio.com/unsubscribe?email=${encodeURIComponent(email)}" style="color: #1A2F2B80; text-decoration: underline;">Unsubscribe</a>
               </p>
            </div>
          `,
        });
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
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      const dbPath = path.join(process.cwd(), 'subscribers.json');
      let subscribers = [];
      if (fs.existsSync(dbPath)) {
        subscribers = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      }
      
      const subscriberIndex = subscribers.findIndex((s: any) => s.email === email);
      if (subscriberIndex !== -1) {
        subscribers[subscriberIndex].status = 'unsubscribed';
        subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
        fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));
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
