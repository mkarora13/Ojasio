import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing.');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[API /subscribe] Environment check - RESEND: ${!!process.env.RESEND_API_KEY}, SUPABASE: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source = 'Website', userAgent = 'Unknown' } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address required' });
    }

    let sb;
    try {
      sb = getSupabase();
    } catch (e: any) {
       console.error('[CRIT] Supabase keys are missing or invalid: ', e.message);
       return res.status(500).json({ error: 'System Configuration Error' });
    }

    // 1. Check for duplicates / Save subscriber
    const { data: existing, error: searchError } = await sb
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
       // if we found one, it might be unsubscribed, but for simplicity we just return already subscribed
       return res.status(400).json({ error: 'Email already subscribed' });
    }

    // No exact existing active subscriber found, proceed to insert
    const { error: insertError } = await sb
      .from('subscribers')
      .insert([
        {
          email,
          source,
          user_agent: userAgent,
          status: 'active',
          subscribed_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('[ERROR] Database insert failed:', insertError);
      return res.status(500).json({ error: 'Could not save subscriber data' });
    }

    console.log(`[SUCCESS] Subscriber ${email} saved to database.`);

    // 2. Email Infrastructure
    if (!process.env.RESEND_API_KEY) {
      console.warn('[WARNING] RESEND_API_KEY missing. Skipping emails.');
      return res.status(200).json({ success: true, message: 'Subscribed successfully (Emails disabled)' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      // Welcome Email
      await resend.emails.send({
        from: 'Ojasio <hello@ojasio.com>',
        to: email,
        subject: 'Welcome to the Ojasio Journal',
        html: `<h2>Welcome to the Ojasio Journal</h2><p>You have successfully subscribed.</p><p><a href="https://www.ojasio.com/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>`
      });
      
      // Admin Lead Notification
      await resend.emails.send({
        from: 'Ojasio System <hello@ojasio.com>',
        to: 'hello@ojasio.com',
        subject: 'New Subscription to Ojasio Journal',
        html: `<p>New subscriber: ${email}</p><p>Source: ${source}</p>`
      });

      console.log(`[SUCCESS] Emails sent for ${email}`);
    } catch (emailError) {
      console.error('[ERROR] Resend execution failed:', emailError);
      // We don't fail the request if emails fail, as db save succeeded.
    }

    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (err: any) {
    console.error('[ERROR] Unhandled exception in subscribe handler:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
