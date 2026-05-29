import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sanitizedEnv = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY ? `Configured (Length: ${process.env.RESEND_API_KEY.length})` : 'MISSING',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? `Configured (Length: ${process.env.NEXT_PUBLIC_SUPABASE_URL.length})` : 'MISSING',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? `Configured (Length: ${process.env.SUPABASE_SERVICE_ROLE_KEY.length})` : 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `Configured (Length: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length})` : 'MISSING'
  };

  let resendInitialized = false;
  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const testResend = new Resend(process.env.RESEND_API_KEY);
      resendInitialized = !!testResend;
    }
  } catch (error: any) {
    console.error('Failed to initialize Resend in diagnostic:', error);
  }

  const diagnosticData = {
    timestamp: new Date().toISOString(),
    env: sanitizedEnv,
    resendSDK: resendInitialized ? 'Initialized successfully' : 'Failed or skipped due to missing API Key'
  };

  console.log('[API /diagnostic] Executed:', diagnosticData);

  return res.status(200).json(diagnosticData);
}
