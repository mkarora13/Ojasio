import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MailMinus, CheckCircle2, XCircle } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

export const Unsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || searchParams.get('token'); // Keep token as fallback just in case old emails used it literally
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const hasRun = React.useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!email) {
      setStatus('error');
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch('/api/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to unsubscribe');
        }

        setStatus('success');
      } catch (err) {
        console.error('Unsubscribe error:', err);
        setStatus('error');
      }
    };

    unsubscribe();
  }, [email]);

  return (
    <>
      <SEO 
        title="Unsubscribe | Ojasio"
        description="Unsubscribe from Ojasio Journal"
        canonicalUrl="/unsubscribe"
      />
      <div className="min-h-[85vh] flex items-center justify-center bg-[#FAF9F6] px-6 py-24 relative overflow-hidden">
        
        {/* Subtle background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#EAC881]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#1A2F2B]/5 max-w-lg w-full text-center relative z-10">
          
          {status === 'loading' && (
            <div className="flex flex-col items-center animate-fade-in-up">
              <svg className="animate-spin h-10 w-10 text-[#C5A059] mb-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h1 className="text-2xl font-display text-[#1A2F2B] mb-3">Updating your preferences</h1>
              <p className="text-[#1A2F2B]/60 font-sans font-light">Please wait a moment.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-[#1A2F2B]/5 flex items-center justify-center text-[#1A2F2B] mb-8 shadow-sm">
                <MailMinus size={24} />
              </div>
              <h1 className="text-3xl font-display text-[#1A2F2B] mb-4">You have been unsubscribed</h1>
              <p className="text-[#1A2F2B]/70 font-sans font-light leading-relaxed mb-10 max-w-sm mx-auto">
                Your email has been securely removed from the Ojasio Journal. We’re sorry to see you go, but we respect your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link to="/" className="inline-block bg-[#1A2F2B] text-white px-8 py-3.5 rounded-md font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A2F2B]/90 transition-all shadow-sm">
                  Return Home
                </Link>
              </div>
              <p className="mt-8 text-[11px] text-[#1A2F2B]/40 font-sans">
                Made a mistake? <Link to="/" className="underline hover:text-[#1A2F2B] transition-colors">Resubscribe anytime at Ojasio.com</Link>
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#1A2F2B] mb-8 border border-red-100 shadow-sm">
                <XCircle size={28} className="text-[#1A2F2B]" />
              </div>
              <h1 className="text-3xl font-display text-[#1A2F2B] mb-4">This unsubscribe link has expired</h1>
              <p className="text-[#1A2F2B]/70 font-sans font-light leading-relaxed mb-10 max-w-sm mx-auto">
                For your security, this unsubscribe link is invalid or has expired. If you’re trying to unsubscribe, please contact us directly below, or reply to any of our emails to be manually removed.
              </p>
              <Link to="/contact" className="inline-block bg-[#1A2F2B] text-white px-8 py-3.5 rounded-md font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A2F2B]/90 transition-all shadow-sm">
                Contact Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
