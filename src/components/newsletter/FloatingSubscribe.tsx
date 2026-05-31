import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle } from 'lucide-react';
import { subscribeUser } from '../../lib/newsletter';

export const FloatingSubscribe: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (localStorage.getItem('ojasio_subscribed') === 'true') {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await subscribeUser(null, email);
      setSuccess(true);
      setSuccessMessage(result.message);
      
      setTimeout(() => {
        setIsOpen(false);
        setHidden(true);
      }, 5000);
    } catch (err: any) {
      console.error("Subscription Error:", err);
      setError(err.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-[#4a7c59] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(74,124,89,0.3)] z-[9990] transition-all duration-300 hover:-translate-y-1 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Subscribe"
      >
        <Bell size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-6 w-[340px] max-w-[calc(100vw-48px)] bg-[#faf8f4] border border-[#c9973f]/30 p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-[9991] animate-fade-in-up">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-[#1c1c1e]/50 hover:text-[#1c1c1e] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {!success ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <h3 className="font-display text-2xl text-[#1c1c1e] leading-snug">Stay Updated</h3>
              <p className="font-sans text-sm text-[#1c1c1e]/70">Get updates, news and special announcements from Ojasio.</p>
              
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-[#1c1c1e]/10 rounded-xl px-4 py-3 font-sans text-sm outline-none focus:border-[#c9973f] transition-colors"
                required
              />
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#4a7c59] text-white rounded-xl py-3.5 font-sans font-medium mt-1 hover:bg-[#3b6448] transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-6 gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59]">
                <Check size={24} />
              </div>
              <p className="font-sans text-sm text-[#1c1c1e]">{successMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Non-blocking Error Toast */}
      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl z-[10000] flex items-center gap-3 animate-fade-in-up">
          <AlertCircle size={18} />
          <span className="font-sans text-sm font-medium">{error}</span>
          <button onClick={() => setError('')} className="ml-2 hover:bg-red-600 p-1 rounded-full transition-colors" aria-label="Close error">
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
};
