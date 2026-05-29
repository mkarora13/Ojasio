import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';

function verifyToken(token: string): string | null {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) return null;
    const secret = process.env.ENCRYPTION_KEY || 'ojasio-fallback-secret-key-32chars!!';
    const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('base64url');
    if (signature === expectedSignature) {
      return Buffer.from(data, 'base64url').toString('utf8');
    }
    return null;
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[API /unsubscribe] Method: ${req.method}, Environment check: ENCRYPTION_KEY: ${!!process.env.ENCRYPTION_KEY}`);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email: fallbackEmail } = req.body;
      
    let email = fallbackEmail;
    
    if (token) {
      const decodedEmail = verifyToken(token);
      if (decodedEmail) {
        email = decodedEmail;
      } else {
        console.warn(`[WARNING] Invalid or expired unsubscribe token used.`);
        return res.status(400).json({ error: 'Invalid or expired unsubscribe token.' });
      }
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid unsubscribe request.' });
    }

    const { existsSync, readFileSync, writeFileSync } = await import('fs');
    const { join } = await import('path');
    
    // Check for development/production file path
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
    
    const subscriberIndex = subscribers.findIndex((s: any) => s.email === email);
    if (subscriberIndex !== -1) {
      subscribers[subscriberIndex].status = 'unsubscribed';
      subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();
      try {
        writeFileSync(dbPath, JSON.stringify(subscribers, null, 2));
      } catch (err) {
        console.error('Error saving updated subscribers db:', err);
      }
    }

    return res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
