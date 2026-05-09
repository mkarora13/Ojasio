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
              <img 
                src="https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?_gl=1*i3glqi*_ga*NTM3MzUwNTMxLjE3NzcyMjg2OTI.*_ga_8JE65Q40S6*czE3NzcyMjg2OTEkbzEkZzEkdDE3NzcyMzEzMjQkajQ4JGwwJGgw" 
                alt="Ojasio Logo" 
                className="w-14 h-14 object-cover rounded-full border border-gold/30 transform group-hover:scale-105 transition-transform duration-300 shadow-sm"
              />
              <div className="flex flex-col justify-center">
                <span className="font-display text-3xl font-semibold tracking-wide text-green-deep leading-none">
                  OJASIO
                </span>
                <span className="font-sans text-[0.65rem] tracking-[0.25em] text-gold uppercase mt-1.5 w-max hidden lg:block font-medium">
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
        className={`md:hidden absolute w-full bg-ivory border-b border-gold/20 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block pb-2 border-b border-gold/10 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? 'text-gold'
                    : 'text-green-deep hover:text-gold'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
