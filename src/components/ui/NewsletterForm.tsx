import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md">
      {status === 'success' ? (
        <div className="flex items-center gap-3 p-4 bg-[#1A2F2B]/5 rounded-lg border border-[#1A2F2B]/10 animate-fade-in-up" role="alert" aria-live="polite">
          <CheckCircle2 className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
          <p className="text-sm font-sans text-[#1A2F2B] font-medium">You’re now part of the Ojasio Journal.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 group" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">Email address for luxury wellness newsletter</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A2F2B]/40 group-focus-within:text-[#C5A059] transition-colors" aria-hidden="true" />
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-required="true"
              disabled={status === 'loading'}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#1A2F2B]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all font-sans text-sm text-[#1A2F2B] placeholder-[#1A2F2B]/40 disabled:opacity-70 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 bg-[#1A2F2B] text-white rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining...
              </>
            ) : (
              'Subscribe to Journal'
            )}
          </button>
          {status === 'error' && (
            <p className="text-red-500 text-xs font-sans mt-1" role="alert">Please enter a valid email address.</p>
          )}
        </form>
      )}
    </div>
  );
};
