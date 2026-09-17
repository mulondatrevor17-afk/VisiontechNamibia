import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  PhoneCall, 
  Globe, 
  Code2,
  Briefcase,
  Layers,
  User as UserIcon,
  MapPin,
  Mic,
  ShieldCheck,
  Search
} from 'lucide-react';
import { LOGO_IMAGE } from '../../data/mockData';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  onOpenCVModal: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, onOpenCVModal, onOpenCommandPalette }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Globe },
    { path: '/about', label: 'About', icon: UserIcon },
    { path: '/services', label: 'Services', icon: Code2 },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/skills', label: 'Skills', icon: Layers },
    { path: '/contact', label: 'Contact', icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b ${scrolled ? 'border-[#252321] bg-[#0A0A0A]/90 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="group flex items-center gap-3 transition-transform"
            id="nav-brand-link"
          >
            <div className="w-8 h-8 rounded-lg border border-[#252321] flex items-center justify-center bg-white/5 backdrop-blur-xs group-hover:border-[#D4A017] transition-colors overflow-hidden p-1">
              <img src={LOGO_IMAGE} alt="VisionTech Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold font-sans tracking-tight text-white flex items-center gap-1.5">
                VisionTech <span className="text-[#D4A017] text-[10px] font-bold tracking-widest uppercase ml-0.5">NAMIBIA</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`relative py-1 text-xs font-semibold tracking-wider transition-all duration-150 ${
                  active
                    ? 'text-[#D4A017] font-bold border-b-2 border-[#D4A017]'
                    : 'text-[#F5F5F0] hover:text-[#D4A017]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Phone Number like Reference Image Top Right */}
        <div className="hidden sm:flex items-center space-x-3">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-[#252321] hover:border-[#D4A017]/50 text-[#F5F5F0] hover:text-white rounded-full text-xs transition-all group"
              title="Open Omni-Search Command Palette (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 text-[#D4A017] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium hidden md:inline">Search...</span>
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-mono text-slate-400 group-hover:text-slate-200">⌘K</kbd>
            </button>
          )}

          <a
            href="tel:+264815673119"
            className="flex items-center gap-2 text-xs font-mono font-medium text-[#F5F5F0] hover:text-white transition-colors"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[#D4A017]" />
            <span>+264 81 567 3119</span>
          </a>

          <button
            onClick={onOpenQuoteModal}
            id="nav-quote-btn"
            className="pill-btn text-xs py-1.5 px-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D4A017]" />
            Get Quote
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-1.5">
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="p-2 text-[#F5F5F0] hover:text-white"
              title="Search Site"
            >
              <Search className="h-4 w-4 text-[#D4A017]" />
            </button>
          )}

          <a
            href="tel:+264815673119"
            className="p-2 text-[#F5F5F0]"
            title="Call Us"
          >
            <PhoneCall className="h-4 w-4 text-[#D4A017]" />
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            className="p-2 border border-[#252321] bg-white/5 rounded-lg text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#38bdf8]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#252321] bg-[#111111] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-[0.2em]">
              Menu
            </span>
            <a href="tel:+264815673119" className="text-xs text-slate-300 font-mono">
              +264 81 567 3119
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                      active
                        ? 'bg-[#D4A017] text-black font-bold'
                        : 'bg-white/5 text-[#F5F5F0] border border-[#252321] hover:bg-white/10'
                    }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full pill-btn justify-center py-2.5"
            >
              <Sparkles className="h-4 w-4 text-[#D4A017]" />
              Request Instant Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
