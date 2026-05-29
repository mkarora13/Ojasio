import type { VercelRequest, VercelResponse } from '@vercel/node';
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
  console.log(`[API /unsubscribe] Environment check - SUPABASE: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL}`);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body || {};

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

    // Update subscriber status in database
    const { error: updateError } = await sb
      .from('subscribers')
      .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
      .eq('email', email);

    if (updateError) {
      console.error('[ERROR] Database update failed:', updateError);
      return res.status(500).json({ error: 'Could not update subscriber data' });
    }

    console.log(`[SUCCESS] Subscriber ${email} unsubscribed successfully.`);
    return res.status(200).json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err: any) {
    console.error('[ERROR] Unhandled exception in unsubscribe handler:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

