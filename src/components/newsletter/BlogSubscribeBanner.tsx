import React, { useState } from 'react';
import { subscribeUser } from '../../lib/newsletter';
import { Check } from 'lucide-react';

export const BlogInlineSubscribe: React.FC = () => {
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
      <div className="bg-[#1c1c1e] rounded-3xl py-16 px-8 text-center my-16 border-t-4 border-[#c9973f]">
        <div className="w-16 h-16 rounded-full bg-[#c9973f]/20 flex items-center justify-center text-[#c9973f] mx-auto mb-6">
          <Check size={32} />
        </div>
        <h2 className="font-display text-4xl text-[#faf8f4] mb-4">You're in.</h2>
        <p className="font-sans text-[#faf8f4]/80 text-lg max-w-xl mx-auto">
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1e] rounded-3xl py-16 px-6 md:px-12 text-center my-16 border-t-4 border-[#c9973f] shadow-xl">
      <h2 className="font-display text-4xl md:text-5xl text-[#faf8f4] mb-4">Never Miss a Nutrition Breakthrough</h2>
      <p className="font-sans text-[#faf8f4]/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        Join 2,000+ health-conscious individuals receiving Disha Arora's latest evidence-based guides, meal plans, and wellness insights — delivered straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row bg-white p-2 rounded-2xl sm:rounded-full gap-3 sm:gap-0">
          <input 
            type="text" 
            placeholder="First Name" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full sm:w-1/3 bg-transparent px-5 py-4 font-sans outline-none border-b sm:border-b-0 sm:border-r border-gray-200"
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-5 py-4 font-sans outline-none"
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto bg-[#c9973f] text-[#1c1c1e] rounded-xl sm:rounded-full px-8 py-4 font-sans font-medium hover:bg-[#e5b358] transition-colors disabled:opacity-70 whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Get Free Updates'}
          </button>
        </div>
        
        {error && <p className="text-red-400 text-sm font-sans mt-4">{error}</p>}
        
        <p className="font-sans text-xs text-[#faf8f4]/50 mt-6 tracking-wide">
          ✦ Free forever &nbsp;✦ No spam &nbsp;✦ Unsubscribe anytime &nbsp;✦ Trusted by clients in 7 countries
        </p>
      </form>
    </div>
  );
};
