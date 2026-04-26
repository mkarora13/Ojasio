import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';

// Store OTPs in memory for this example (use Redis/Database in production)
const otpStore = new Map<string, { code: string, expiresAt: number }>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/send-otp", async (req, res) => {
    const handler = (await import('./api/send-otp.js')).default;
    await handler(req as any, res as any);
  });

  app.post("/api/verify-otp", async (req, res) => {
    const handler = (await import('./api/verify-otp.js')).default;
    await handler(req as any, res as any);
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
    
    // Serve static files from the dist directory
    app.use(express.static(distPath));
    
    // Send all requests to the index.html file to be handled by React Router
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
