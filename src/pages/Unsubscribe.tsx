import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MailMinus, CheckCircle2, XCircle } from 'lucide-react';
import { SEO } from '../components/seo/SEO';

export const Unsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
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
      <div className="min-h-[70vh] flex items-center justify-center bg-ivory px-4 py-24">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gold/20 max-w-lg w-full text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-gold mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h1 className="text-2xl font-display text-green-deep">Processing request...</h1>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h1 className="text-3xl font-display text-green-deep mb-4">Unsubscribed Successfully</h1>
              <p className="text-green-deep/70 font-sans mb-8">
                <strong>{email}</strong> has been removed from the Ojasio Journal. You will no longer receive our newsletter.
              </p>
              <Link to="/" className="inline-block bg-green-deep text-white px-8 py-3.5 rounded-xl font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors">
                Return Home
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6">
                <XCircle size={32} />
              </div>
              <h1 className="text-3xl font-display text-green-deep mb-4">Something went wrong</h1>
              <p className="text-green-deep/70 font-sans mb-8">
                We couldn't process your request. Please try again or contact us directly if the issue persists.
              </p>
              <Link to="/" className="inline-block bg-green-deep text-white px-8 py-3.5 rounded-xl font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold transition-colors">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
