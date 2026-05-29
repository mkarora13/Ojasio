import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
// @ts-ignore - Importing the central handler
import subscribeHandler from './api/subscribe.js';
// @ts-ignore - Importing the central handler
import unsubscribeHandler from './api/unsubscribe.js';

async function startServer() {
  console.log('----------------------------------------');
  console.log('[SYSTEM] Initializing Server');
  console.log('[SYSTEM] Check ENV variables:');
  console.log(`- RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Configured' : '❌ MISSING (Emails will silently fail)'}`);
  console.log(`- ENCRYPTION_KEY: ${process.env.ENCRYPTION_KEY ? '✅ Configured' : '⚠️ Falling back to default'}`);
  console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
  console.log('----------------------------------------');

  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // Add compression middleware to gzip responses (improves LCP/Performance)
  app.use(compression());
  app.use(express.json());

  // Use the exact same Vercel Serverless Function to ensure 100% duplicate code removal
  // and perfect production parity across deployment layers
  app.post('/api/subscribe', async (req, res) => {
     // @ts-ignore
     await subscribeHandler(req, res);
  });

  app.post('/api/unsubscribe', async (req, res) => {
     // @ts-ignore
     await unsubscribeHandler(req, res);
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
