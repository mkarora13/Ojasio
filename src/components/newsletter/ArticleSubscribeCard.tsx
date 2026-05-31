import React, { useState } from 'react';
import { subscribeUser } from '../../lib/newsletter';
import { Check } from 'lucide-react';

export const ArticleSubscribeCard: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await subscribeUser(name, email);
      setSuccess(true);
      setSuccessMessage(result.message);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-[#faf8f4] to-[#4a7c59]/5 border border-[#4a7c59]/20 rounded-3xl p-10 text-center my-12">
        <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center text-[#4a7c59] mx-auto mb-4">
          <Check size={24} />
        </div>
        <h3 className="font-display text-2xl text-[#1c1c1e]">Thank you!</h3>
        <p className="font-sans text-[#1c1c1e]/70 mt-2">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#faf8f4] to-[#4a7c59]/5 border border-[#4a7c59]/20 rounded-3xl p-8 md:p-12 text-center my-12 shadow-sm">
      <h3 className="font-display text-3xl md:text-4xl text-[#1c1c1e] mb-4">Enjoyed This Article? Get the Next One First.</h3>
      <p className="font-sans text-[#1c1c1e]/70 text-lg max-w-xl mx-auto mb-8">
        Subscribe for free and receive Disha Arora's latest nutrition guides, PCOS strategies, weight loss protocols, and meal plans directly in your inbox.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="First Name" 
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full bg-white border border-[#1c1c1e]/10 rounded-xl px-5 py-3.5 font-sans outline-none focus:border-[#4a7c59]"
          required
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-white border border-[#1c1c1e]/10 rounded-xl px-5 py-3.5 font-sans outline-none focus:border-[#4a7c59]"
          required
        />
        {error && <p className="text-red-500 text-sm font-sans">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#4a7c59] text-white rounded-xl px-8 py-3.5 font-sans font-medium hover:bg-[#3b6448] transition-colors disabled:opacity-70 mt-1"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};
