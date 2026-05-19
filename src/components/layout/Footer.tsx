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
        ctx.fillStyle = '#FFFFFF';
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
    <footer className="bg-beige text-green-deep border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12">
          <div className="md:col-span-2 lg:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tighter text-green-deep mb-4 flex items-center gap-3">
              <img loading="lazy" 
                src="https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?_gl=1*i3glqi*_ga*NTM3MzUwNTMxLjE3NzcyMjg2OTI.*_ga_8JE65Q40S6*czE3NzcyMjg2OTEkbzEkZzEkdDE3NzcyMzEzMjQkajQ4JGwwJGgw" 
                alt="Ojasio Logo" 
                className="w-12 h-12 object-cover rounded-full border border-gold/30"
              />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tighter text-green-deep leading-none">
                  OJASIO
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-green-deep/70 uppercase mt-1.5 block font-medium leading-tight">
                  Personalised Nutrition • Real Results
                </span>
              </div>
            </span>
            <p className="mt-4 text-xs font-sans text-green-deep/60 leading-normal max-w-sm">
              Personalized diet plans combining modern science with holistic nutrition to deliver sustainable results for a global community.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans font-bold text-[10px] tracking-widest uppercase mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3 font-sans text-xs">
              <li><NavLink to="/" className="text-green-deep/80 hover:text-gold transition-colors">Home</NavLink></li>
              <li><NavLink to="/about" className="text-green-deep/80 hover:text-gold transition-colors">About Us</NavLink></li>
              <li><NavLink to="/founder" className="text-green-deep/80 hover:text-gold transition-colors">Founder</NavLink></li>
              <li><NavLink to="/reviews" className="text-green-deep/80 hover:text-gold transition-colors">Reviews</NavLink></li>
              <li><NavLink to="/blog" className="text-green-deep/80 hover:text-gold transition-colors">Blog</NavLink></li>
              <li><NavLink to="/faq" className="text-green-deep/80 hover:text-gold transition-colors">FAQ</NavLink></li>
              <li><NavLink to="/contact" className="text-green-deep/80 hover:text-gold transition-colors">Contact</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-bold text-[10px] tracking-widest uppercase mb-6 text-gold">Programs</h3>
            <ul className="space-y-3 font-sans text-xs">
              <li><NavLink to="/programs/pcos-diet-plan" className="text-green-deep/80 hover:text-gold transition-colors">PCOS Diet Plan</NavLink></li>
              <li><NavLink to="/programs/weight-loss-diet-plan" className="text-green-deep/80 hover:text-gold transition-colors">Weight Loss Plan</NavLink></li>
              <li><NavLink to="/programs/thyroid-diet-plan" className="text-green-deep/80 hover:text-gold transition-colors">Thyroid Diet Plan</NavLink></li>
              <li><NavLink to="/programs/hormonal-imbalance-diet" className="text-green-deep/80 hover:text-gold transition-colors">Hormonal Imbalance</NavLink></li>
              <li><NavLink to="/programs/diet-plan-for-working-professionals" className="text-green-deep/80 hover:text-gold transition-colors">Working Professionals</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-bold text-[10px] tracking-widest uppercase mb-6 text-gold">Connect</h3>
            <div className="mb-8 space-y-2">
              <p className="font-sans text-xs text-green-deep/60">
                For any queries, reach us at:
              </p>
              <a 
                href="mailto:hello@ojasio.com" 
                className="font-sans text-xs text-green-deep/80 hover:text-gold transition-colors inline-block font-medium"
              >
                hello@ojasio.com
              </a>
            </div>
            <div className="flex space-x-4 mb-8">
              <a href="https://www.instagram.com/ojasio/" target="_blank" rel="noopener noreferrer" className="p-2 border border-green-deep/20 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="https://www.linkedin.com/in/dishaarora3085/" target="_blank" rel="noopener noreferrer" className="p-2 border border-green-deep/20 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@ojasio.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-green-deep/20 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all" aria-label="Email Ojasio">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-center justify-start">
            <h3 className="font-sans font-bold text-[10px] tracking-widest uppercase mb-6 text-gold lg:text-center">Scan to Visit</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsQRModalOpen(true); }} className="bg-white p-2.5 rounded-2xl shadow-sm border border-gold/30 flex flex-col items-center justify-center hover:shadow-md hover:border-gold/60 transition-all group">
              <div ref={qrRef} className="bg-white rounded-xl overflow-hidden p-1">
                <QRCode 
                  value="https://ojasio.com" 
                  size={90} 
                  className="text-green-deep transform group-hover:scale-105 transition-transform duration-300"
                  fgColor="#1A2F2B"
                />
              </div>
            </a>
            <p className="mt-4 text-[9px] font-sans text-green-deep/70 uppercase tracking-widest lg:text-center cursor-pointer hover:text-gold transition-colors font-semibold" onClick={handleDownloadQR}>Tap to Download</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gold/20 mt-12 pt-8">
          <p className="text-[10px] font-sans font-medium uppercase tracking-widest text-green-deep/60 italic mb-4 md:mb-0">
            "Your transformation starts today."
          </p>
          <div className="flex gap-6 items-center">
             <span className="text-xs font-sans text-green-deep/60">© {new Date().getFullYear()} Ojasio. All rights reserved.</span>
             <span className="text-gold text-xs">★★★★★ (4.9/5)</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isQRModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A2F2B]/60 backdrop-blur-sm" onClick={() => setIsQRModalOpen(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-[2rem] flex flex-col items-center shadow-2xl relative max-w-sm w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsQRModalOpen(false)}
                className="absolute top-6 right-6 text-[#1A2F2B]/50 hover:text-[#1A2F2B] transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h3 className="font-display text-3xl text-[#1A2F2B] mb-2 text-center">Scan QR</h3>
              <p className="text-sm font-sans text-[#1A2F2B]/60 mb-8 text-center px-4">
                Share this QR code to open Ojasio on another device
              </p>
              <div className="bg-white p-6 border border-gold/30 rounded-2xl mb-8 shadow-sm">
                <QRCode 
                  value="https://ojasio.com" 
                  size={200} 
                  className="text-[#1A2F2B]"
                  fgColor="#1C3F3A" 
                />
              </div>
              <button 
                onClick={handleDownloadQR}
                className="w-full flex items-center justify-center gap-2 bg-[#EAC881] text-[#1A2F2B] px-6 py-3 rounded-xl font-sans text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#1A2F2B] hover:text-white transition-all shadow-md"
              >
                Download Image
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
