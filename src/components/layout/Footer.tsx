import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';

export const Footer: React.FC = () => {
  const qrRef = useRef<HTMLDivElement>(null);

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold tracking-tighter text-green-deep mb-4 flex items-center gap-3">
              <img 
                src="https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?_gl=1*i3glqi*_ga*NTM3MzUwNTMxLjE3NzcyMjg2OTI.*_ga_8JE65Q40S6*czE3NzcyMjg2OTEkbzEkZzEkdDE3NzcyMzEzMjQkajQ4JGwwJGgw" 
                alt="Ojasio Logo" 
                className="w-12 h-12 object-cover rounded-full border border-gold/30"
              />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tighter text-green-deep leading-none">
                  OJASIO
                </span>
                <span className="font-sans text-[0.55rem] tracking-widest text-gold uppercase mt-1 w-max">
                  Personalised Nutrition Real Results
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
              <li><NavLink to="/expert" className="text-green-deep/80 hover:text-gold transition-colors">Disha Arora</NavLink></li>
              <li><NavLink to="/contact" className="text-green-deep/80 hover:text-gold transition-colors">Contact</NavLink></li>
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

          <div className="flex flex-col items-start md:items-center">
            <h3 className="font-sans font-bold text-[10px] tracking-widest uppercase mb-6 text-gold text-center">Scan to Visit</h3>
            <a href="#" onClick={handleDownloadQR} className="bg-white p-3 rounded-xl shadow-sm border border-gold/20 flex flex-col items-center justify-center hover:shadow-md transition-all">
              <div ref={qrRef} className="bg-white">
                <QRCode 
                  value="https://ojasio.com" 
                  size={80} 
                  className="text-green-deep"
                  fgColor="#1C3F3A" // green-deep colour
                />
              </div>
            </a>
            <p className="mt-3 text-[9px] font-sans text-green-deep/60 uppercase tracking-widest text-center cursor-pointer hover:text-gold transition-colors" onClick={handleDownloadQR}>Tap to Download</p>
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
    </footer>
  );
};
