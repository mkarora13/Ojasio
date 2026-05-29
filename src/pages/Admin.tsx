import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AlertCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
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
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-12 text-center border border-[#1A2F2B]/5 shadow-sm">
            <AlertCircle className="w-12 h-12 text-[#C5A059] mx-auto mb-4" />
            <h2 className="text-xl font-display text-[#1A2F2B] mb-2">System Maintenance</h2>
            <p className="text-[#1A2F2B]/70 font-sans">
              The admin dashboard backend has been deprecated in favor of direct Supabase management.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

