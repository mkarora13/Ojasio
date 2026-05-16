import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Founder', path: '/founder' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-ivory/90 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pr-4">
            <NavLink to="/" className="flex items-center gap-4 group">
              <img loading="lazy" 
                src="https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?_gl=1*i3glqi*_ga*NTM3MzUwNTMxLjE3NzcyMjg2OTI.*_ga_8JE65Q40S6*czE3NzcyMjg2OTEkbzEkZzEkdDE3NzcyMzEzMjQkajQ4JGwwJGgw" 
                alt="Ojasio Logo" 
                className="w-14 h-14 object-cover rounded-full border border-gold/30 transform group-hover:scale-105 transition-transform duration-300 shadow-sm"
              />
              <div className="flex flex-col justify-center">
                <span className="font-display text-3xl font-semibold tracking-wide text-green-deep leading-none">
                  OJASIO
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-green-deep/70 uppercase mt-1.5 block font-medium leading-tight">
                  Personalised Nutrition • Real Results
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center text-sm uppercase tracking-[0.15em] font-sans font-medium text-green-deep/80">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 hover:text-gold relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all hover:after:w-full ${
                    isActive ? 'text-gold after:w-full text-shadow-sm' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-deep hover:text-green-soft focus:outline-none focus:ring-2 focus:ring-gold rounded-md p-2"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-ivory/98 backdrop-blur-xl overflow-y-auto transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-10 py-10 space-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-sm font-sans uppercase tracking-[0.25em] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-gold translate-x-2'
                    : 'text-green-deep hover:text-gold hover:translate-x-2 opacity-80'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="w-full h-px bg-gold/20 mt-8" />
        </div>
      </div>
    </nav>
  );
};
