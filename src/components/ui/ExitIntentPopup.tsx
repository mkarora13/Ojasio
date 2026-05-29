import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves top of screen and popup hasn't been shown yet
      if (e.clientY <= 0 && !hasShown) {
        // Also check if they've dismissed it previously via localStorage
        const dismissed = localStorage.getItem('ojasio_exit_intent_dismissed');
        if (!dismissed) {
          setIsVisible(true);
          setHasShown(true);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('ojasio_exit_intent_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#1A2F2B]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div 
        className="bg-[#FAF9F6] rounded-[2rem] p-8 md:p-12 shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col items-center text-center animate-fade-in-up border border-[#EAC881]/20"
      >
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-[#1A2F2B]/50 hover:text-[#1A2F2B] transition-colors"
          title="Close Popup"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#EAC881]/10 flex items-center justify-center text-[#EAC881] mb-6 shadow-sm border border-[#EAC881]/20">
          <Mail size={32} />
        </div>

        <h2 id="exit-intent-title" className="text-3xl md:text-4xl font-display text-[#1A2F2B] mb-4 
           leading-tight">
          Wait! Before you leave...
        </h2>
        
        <p className="font-serif text-[#1A2F2B]/70 mb-8 max-w-sm font-light text-lg">
          Join our private community and receive an exclusive framework for achieving metabolic harmony.
        </p>
        
        <NewsletterForm />
        
        <p className="mt-6 text-[10px] text-[#1A2F2B]/40 uppercase tracking-widest font-sans font-medium">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};
