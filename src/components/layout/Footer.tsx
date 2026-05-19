import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Linkedin, Mail, X } from 'lucide-react';
import QRCodeModule from 'react-qr-code';
const QRCode = (QRCodeModule as any).default || QRCodeModule;

import { motion, AnimatePresence } from 'motion/react';

export const Footer: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleDownloadQR = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    // Clone and resize for high-quality export
    const svgClone = svg.cloneNode(true) as SVGElement;
    const exportSize = 512;
    svgClone.setAttribute('width', exportSize.toString());
    svgClone.setAttribute('height', exportSize.toString());

    const svgData = new XMLSerializer().serializeToString(svgClone);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Add padding to the downloaded image
      const padding = Math.floor(exportSize * 0.1); // Proportional padding
      canvas.width = exportSize + padding * 2;
      canvas.height = exportSize + padding * 2;
      
      if (ctx) {
        ctx.fillStyle = '#1A2F2B'; // Match the premium dark background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, padding, padding, exportSize, exportSize);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'Ojasio_QRCode.png';
        downloadLink.href = pngFile;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <footer className="bg-beige text-[#1A2F2B] relative overflow-hidden border-t border-[#EAC881]/30">
      {/* Decorative Gradients for Richness */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#EAC881]/20 to-transparent blur-[100px] opacity-60 pointer-events-none transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#1A2F2B]/5 to-transparent blur-[120px] opacity-40 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1A2F2B]/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-4 flex flex-col pr-4 lg:pr-10">
            <div className="flex items-center gap-5 group mb-6 cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#EAC881] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#1A2F2B]/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white">
                  <img loading="lazy" 
                    src="https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?_gl=1*i3glqi*_ga*NTM3MzUwNTMxLjE3NzcyMjg2OTI.*_ga_8JE65Q40S6*czE3NzcyMjg2OTEkbzEkZzEkdDE3NzcyMzEzMjQkajQ4JGwwJGgw" 
                    alt="Ojasio Logo" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl tracking-widest text-[#1A2F2B] leading-none mb-1.5">
                  OJASIO
                </span>
                <span className="font-sans text-[9px] tracking-[0.3em] text-[#C5A059] uppercase block font-bold leading-tight">
                  Personalised Nutrition
                </span>
              </div>
            </div>
            <p className="text-[14px] font-sans text-[#1A2F2B]/70 leading-relaxed max-w-[300px] mb-8 font-light">
              Elevating metabolic health globally. We merge nuanced clinical science with holistic nourishment to orchestrate your body's profound natural healing.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/ojasio/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-[#1A2F2B]/10 text-[#1A2F2B]/70 hover:bg-[#1A2F2B] hover:text-[#EAC881] hover:border-[#1A2F2B] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group">
                <Instagram size={17} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="https://www.linkedin.com/in/dishaarora3085/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-[#1A2F2B]/10 text-[#1A2F2B]/70 hover:bg-[#1A2F2B] hover:text-[#EAC881] hover:border-[#1A2F2B] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group">
                <Linkedin size={17} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="mailto:hello@ojasio.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-[#1A2F2B]/10 text-[#1A2F2B]/70 hover:bg-[#1A2F2B] hover:text-[#EAC881] hover:border-[#1A2F2B] transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 group" aria-label="Email Ojasio">
                <Mail size={17} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-[#1A2F2B] border-b border-[#1A2F2B]/10 pb-3 inline-block">Navigation</h3>
            <ul className="space-y-4 font-sans text-[14px]">
              <li><NavLink to="/" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Home</NavLink></li>
              <li><NavLink to="/about" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>About</NavLink></li>
              <li><NavLink to="/founder" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Founder</NavLink></li>
              <li><NavLink to="/reviews" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Reviews</NavLink></li>
              <li><NavLink to="/blog" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Journal</NavLink></li>
              <li><NavLink to="/faq" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>FAQ</NavLink></li>
              <li><NavLink to="/contact" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Contact</NavLink></li>
            </ul>
          </div>
          
          {/* Programs Column */}
          <div className="lg:col-span-3 lg:pl-2">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-[#1A2F2B] border-b border-[#1A2F2B]/10 pb-3 inline-block">Signature Protocols</h3>
            <ul className="space-y-4 font-sans text-[14px]">
              <li><NavLink to="/programs/pcos-diet-plan" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>PCOS Reversal Protocol</NavLink></li>
              <li><NavLink to="/programs/weight-loss-diet-plan" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Metabolic Weight Loss</NavLink></li>
              <li><NavLink to="/programs/thyroid-diet-plan" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Thyroid Optimization</NavLink></li>
              <li><NavLink to="/programs/hormonal-imbalance-diet" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Hormonal Equilibrium</NavLink></li>
              <li><NavLink to="/programs/diet-plan-for-working-professionals" className="text-[#1A2F2B]/70 hover:text-[#1A2F2B] transition-all duration-300 font-medium inline-flex items-center group"><span className="w-0 h-px bg-[#C5A059] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out"></span>Executive Wellness</NavLink></li>
            </ul>
          </div>
          
          {/* Connect & QR Column */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col lg:items-end sm:justify-between lg:justify-start">
            <div className="mb-10 lg:text-right">
              <h3 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase mb-6 text-[#1A2F2B] border-b border-[#1A2F2B]/10 pb-3 inline-block lg:mr-0 pl-1">Concierge</h3>
              <p className="font-sans text-[13px] text-[#1A2F2B]/60 mb-2 font-light hidden lg:block">
                Direct inquiries:
              </p>
              <a 
                href="mailto:hello@ojasio.com" 
                className="font-serif text-[18px] text-[#1A2F2B] italic hover:text-[#C5A059] transition-all duration-300 inline-block border-b border-transparent hover:border-[#C5A059]/40 pb-0.5"
              >
                hello@ojasio.com
              </a>
            </div>

            <div className="flex flex-col items-start sm:items-end lg:items-end justify-start group cursor-pointer" onClick={(e) => { e.preventDefault(); setIsQRModalOpen(true); }}>
              <div className="relative bg-white/70 p-2.5 rounded-[1.25rem] border border-[#1A2F2B]/10 flex flex-col items-center justify-center hover:bg-white transition-all duration-500 overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#EAC881]/5 via-[#EAC881]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div ref={qrRef} className="bg-white rounded-xl overflow-hidden p-2 relative z-10 border border-[#1A2F2B]/5">
                  <QRCode 
                    value="https://ojasio.com" 
                    size={64} 
                    className="text-[#1A2F2B] transform group-hover:scale-105 transition-transform duration-700"
                    fgColor="#1A2F2B"
                    bgColor="#ffffff"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-[#1A2F2B]/50 group-hover:text-[#1A2F2B] transition-colors duration-300">
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-bold">Share Profile</span>
                <div className="w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-6 opacity-0 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-[#1A2F2B]/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-[13px] md:text-[14px] font-serif italic text-[#1A2F2B]/80 text-center md:text-left">
              "Sustained vitality begins with profound nourishment."
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center">
             <div className="flex items-center gap-2 bg-white/60 px-4 py-1.5 rounded-full border border-[#1A2F2B]/10 shadow-[0_2px_10px_rgb(0,0,0,0.02)] backdrop-blur-sm hover:bg-white transition-all duration-300 cursor-default">
                 <div className="flex gap-[1px] text-[#C5A059]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                 </div>
                 <span className="text-[#1A2F2B] text-[10px] tracking-[0.2em] font-sans font-bold uppercase mt-[1px]">4.9/5</span>
             </div>
             <span className="text-[10px] font-sans text-[#1A2F2B]/60 tracking-[0.1em] uppercase font-bold">© {new Date().getFullYear()} Ojasio. All rights reserved.</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isQRModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setIsQRModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF9F6] outline outline-1 outline-[#EAC881]/30 p-8 pt-12 rounded-[2rem] flex flex-col items-center shadow-2xl relative max-w-sm w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsQRModalOpen(false)}
                className="absolute top-6 right-6 text-[#1A2F2B]/50 hover:text-[#1A2F2B] transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="font-display text-4xl text-[#1A2F2B] mb-3 text-center tracking-tight">Connect</h3>
              <p className="text-xs font-sans text-[#1A2F2B]/70 mb-8 text-center px-4 font-light leading-relaxed">
                Scan to access Ojasio from your mobile device.
              </p>
              <div className="bg-white p-6 rounded-2xl mb-8 shadow-[0_4px_20px_rgba(26,47,43,0.05)] border border-[#EAC881]/20">
                <QRCode 
                  value="https://ojasio.com" 
                  size={180} 
                  className="text-[#1A2F2B]"
                  fgColor="#1A2F2B"
                  bgColor="#ffffff" 
                />
              </div>
              <button 
                onClick={handleDownloadQR}
                className="w-full flex items-center justify-center gap-2 bg-[#EAC881] text-[#1A2F2B] px-6 py-3.5 rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all shadow-[0_8px_20px_rgba(234,200,129,0.3)] hover:-translate-y-0.5"
              >
                Save to Device
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
