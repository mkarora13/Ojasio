import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // NOTE: Simple mock auth for demonstration purpose
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer ojasio-secret-admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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

  const active = subscribers.filter(s => s.status === 'active').length;
  const unsubscribed = subscribers.filter(s => s.status === 'unsubscribed').length;

  return res.status(200).json({
    totalSubscribers: subscribers.length,
    activeSubscribers: active,
    unsubscribed: unsubscribed,
    subscribers
  });
}
