import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from '../ui/WhatsAppFloatingButton';

export const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full flex flex-col min-h-screen border-4 sm:border-8 border-beige bg-ivory text-green-deep selection:bg-gold/30 relative">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-white focus:text-green-deep focus:font-bold focus:shadow-xl focus:rounded-full focus:outline-none focus:ring-4 focus:ring-gold"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow flex flex-col" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {location.pathname !== '/contact' && <WhatsAppFloatingButton />}
    </div>
  );
};
