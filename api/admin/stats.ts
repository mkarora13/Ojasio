import type { VercelRequest, VercelResponse } from '@vercel/node';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

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

  const active = subscribers.filter(s => s.status === 'active').length;
  const unsubscribed = subscribers.filter(s => s.status === 'unsubscribed').length;

  return res.status(200).json({
    totalSubscribers: subscribers.length,
    activeSubscribers: active,
    unsubscribed: unsubscribed,
    subscribers
  });
}
