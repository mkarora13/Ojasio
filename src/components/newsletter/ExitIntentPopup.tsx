import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { subscribeUser } from '../../lib/newsletter';

export const ExitIntentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('ojasio_subscribed') === 'true';
    if (hasSubscribed) return;

    let popupShown = false;
    let timerId: ReturnType<typeof setTimeout>;

    const showPopup = () => {
      if (!popupShown && !hasSubscribed) {
        setIsOpen(true);
        popupShown = true;
      }
    };

    // 45 seconds timer
    timerId = setTimeout(() => {
      showPopup();
    }, 45000);

    // Mouse exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await subscribeUser(name, email);
      setSuccess(true);
      setSuccessMessage(result.message);
      setTimeout(() => setIsOpen(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1c1c1e]/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#faf8f4] w-full max-w-[480px] rounded-3xl p-10 relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-t-[6px] border-[#4a7c59] animate-fade-in-up">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-[#1c1c1e]/40 hover:text-[#1c1c1e] transition-colors"
        >
           <X size={24} />
        </button>

        {!success ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h2 className="font-display text-4xl text-[#1c1c1e]">Before You Go —<br/>Get This Free.</h2>
            <p className="font-sans text-[#1c1c1e]/70 leading-relaxed mb-2">
              Subscribe and receive Disha Arora's exclusive 7-Day Wellness Kickstart Guide — completely free.
            </p>

            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="First Name" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-white border border-[#1c1c1e]/10 rounded-xl px-5 py-3.5 font-sans outline-none focus:border-[#c9973f] transition-colors"
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border border-[#1c1c1e]/10 rounded-xl px-5 py-3.5 font-sans outline-none focus:border-[#c9973f] transition-colors"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-sans">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#4a7c59] text-white rounded-xl py-4 font-sans font-medium text-lg mt-2 hover:bg-[#3b6448] transition-colors disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Me The Guide'}
            </button>
            <p className="text-center font-sans text-xs text-[#1c1c1e]/40 mt-3">
              By subscribing you agree to receive nutrition guides. We never share your data. Unsubscribe anytime.
            </p>
          </form>
        ) : (
             <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
              <div className="w-16 h-16 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59]">
                <Check size={32} />
              </div>
              <h3 className="font-display text-3xl text-[#1c1c1e]">Success!</h3>
              <p className="font-sans text-[#1c1c1e]/70">{successMessage}</p>
            </div>
        )}
      </div>
    </div>
  );
};
