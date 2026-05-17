import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
    
    // Serve static files from the dist directory
    app.use(express.static(distPath));
    
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
