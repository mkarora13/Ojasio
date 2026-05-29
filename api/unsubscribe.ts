import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'ojasio-fallback-secret-key-32chars!!';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    return res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
