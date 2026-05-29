import React, { useState, useEffect } from 'react';
import { Mail, Users, Send, CheckCircle2, AlertCircle, Edit } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState('ojasio-secret-admin');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [broadcastForm, setBroadcastForm] = useState({
    title: 'How to Reset Your Circadian Rhythm',
    excerpt: 'The science behind sleep cycles and metabolic health.',
    slug: 'circadian-rhythm-metabolism'
  });

  useEffect(() => {
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      } else {
        setStats(null);
      }
    } catch {
      setStats(null);
    }
    setLoading(false);
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...broadcastForm, adminToken: token })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Broadcast sent successfully!');
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err: any) {
      setMessage('Network error: ' + err.message);
    }
    setBroadcastLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Ojasio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-[#FAF9F6] px-6 py-24 pt-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-display text-[#1A2F2B] mb-2">Admin Dashboard</h1>
              <p className="text-[#1A2F2B]/60 font-sans tracking-wide">Journal Automation & Subscriber Insights</p>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm border border-[#1A2F2B]/5">
              <div className="text-xs font-mono px-3 py-1 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM ONLINE
              </div>
            </div>
          </div>
          
          {loading ? (
             <div className="animate-pulse bg-white rounded-3xl p-12 text-center h-64 border border-[#1A2F2B]/5"></div>
          ) : !stats ? (
             <div className="bg-white rounded-3xl p-12 text-center border border-red-200">
               <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
               <p className="text-[#1A2F2B]">Unauthorized or server error. Check token.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Stats Panel */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#1A2F2B]/5">
                  <div className="flex items-center gap-4 text-[#1A2F2B]/60 mb-6">
                     <Users className="w-5 h-5" />
                     <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">Audience</h3>
                  </div>
                  <div className="space-y-6">
                     <div>
                       <div className="text-4xl font-display text-[#1A2F2B] mb-1">{stats.totalSubscribers}</div>
                       <div className="text-sm font-sans text-[#1A2F2B]/60">Total Subscribers</div>
                     </div>
                     <div className="w-full h-px bg-[#1A2F2B]/5"></div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-[#1A2F2B]/60 font-sans">Active</span>
                       <span className="font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{stats.activeSubscribers}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-[#1A2F2B]/60 font-sans">Unsubscribed</span>
                       <span className="font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-full">{stats.unsubscribed}</span>
                     </div>
                  </div>
                </div>
                
                <div className="bg-[#1A2F2B] text-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Mail className="w-32 h-32" />
                   </div>
                   <div className="relative z-10">
                    <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase mb-4 text-[#EAC881]">Automation Status</h3>
                    <ul className="space-y-3 font-sans text-sm text-white/80">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EAC881]" /> Webhooks bound</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EAC881]" /> Welcome email active</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#EAC881]" /> Secure DB linked</li>
                    </ul>
                   </div>
                </div>
              </div>

              {/* Broadcast Panel */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#1A2F2B]/5 h-full">
                  <div className="flex items-center gap-4 text-[#1A2F2B]/60 mb-8">
                     <Send className="w-5 h-5" />
                     <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase">Trigger Broadcast</h3>
                  </div>
                  
                  <p className="text-sm font-sans text-[#1A2F2B]/70 mb-8">
                    Send a real-time email notification to all active subscribers. The ecosystem uses premium Resend infrastructure to ensure inbox placement.
                  </p>

                  <form onSubmit={handleBroadcast} className="space-y-6">
                    <div>
                       <label className="block text-xs font-sans font-bold tracking-widest uppercase text-[#1A2F2B]/70 mb-2 border-b border-[#1A2F2B]/10 pb-2">Article Title</label>
                       <input 
                         type="text" 
                         value={broadcastForm.title}
                         onChange={e => setBroadcastForm({...broadcastForm, title: e.target.value})}
                         className="w-full bg-[#FAF9F6] border border-[#1A2F2B]/10 rounded-xl px-4 py-3 font-display focus:outline-none focus:border-[#C5A059]"
                         required
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-sans font-bold tracking-widest uppercase text-[#1A2F2B]/70 mb-2 border-b border-[#1A2F2B]/10 pb-2">Excerpt</label>
                       <textarea 
                         value={broadcastForm.excerpt}
                         onChange={e => setBroadcastForm({...broadcastForm, excerpt: e.target.value})}
                         className="w-full bg-[#FAF9F6] border border-[#1A2F2B]/10 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C5A059]"
                         rows={3}
                         required
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-sans font-bold tracking-widest uppercase text-[#1A2F2B]/70 mb-2 border-b border-[#1A2F2B]/10 pb-2">URL Slug</label>
                       <div className="flex items-center bg-[#FAF9F6] border border-[#1A2F2B]/10 rounded-xl overflow-hidden focus-within:border-[#C5A059]">
                          <span className="pl-4 text-[#1A2F2B]/40 text-sm font-mono whitespace-nowrap">ojasio.com/blog/</span>
                          <input 
                            type="text" 
                            value={broadcastForm.slug}
                            onChange={e => setBroadcastForm({...broadcastForm, slug: e.target.value})}
                            className="w-full bg-transparent px-4 py-3 font-mono text-sm focus:outline-none"
                            required
                          />
                       </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-between">
                       <div>
                         {message && (
                            <span className="text-sm font-sans font-medium text-green-700 bg-green-50 px-4 py-2 rounded-md">
                              {message}
                            </span>
                         )}
                       </div>
                       <button
                         type="submit"
                         disabled={broadcastLoading || stats.activeSubscribers === 0}
                         className="px-8 py-3.5 bg-[#1A2F2B] text-white rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-all shadow-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                       >
                         {broadcastLoading ? 'Broadcasting...' : `Send to ${stats.activeSubscribers}`} <Send className="w-4 h-4 ml-2" />
                       </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
