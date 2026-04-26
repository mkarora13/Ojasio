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
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "RESEND_API_KEY is not configured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    
    try {
      await resend.emails.send({
        from: 'Ojasio <onboarding@resend.dev>', // Resend dev email, works only for verified emails unless custom domain is added
        to: [email],
        subject: 'Your Ojasio Verification Code',
        html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`,
      });

      // Store OTP with 10 mins expiry
      otpStore.set(email, {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000
      });

      res.json({ success: true, message: "OTP sent successfully" });
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: "Failed to send OTP. Please try again." });
    }
  });

  app.post("/api/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ error: "No OTP found for this email, please request a new one." });
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP has expired. Please request a new one." });
    }

    if (storedOtp.code !== otp) {
      return res.status(400).json({ error: "Invalid OTP. Please try again." });
    }

    // OTP verified successfully
    otpStore.delete(email);
    res.json({ success: true, message: "Email verified successfully" });
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
