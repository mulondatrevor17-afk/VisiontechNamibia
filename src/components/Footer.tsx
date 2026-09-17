import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, LOGO_IMAGE } from '../data/mockData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#252321] bg-[#0A0A0A] text-[#F5F5F0] text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Info */}
        <div className="space-y-3 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-white/5 overflow-hidden p-0.5">
              <img src={LOGO_IMAGE} alt="VisionTech Logo" className="h-full w-full object-contain" />
            </div>
              <span className="text-lg font-bold text-white tracking-tight">
                VisionTech <span className="text-[#D4A017] font-sans text-xs uppercase ml-1">NAMIBIA</span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">{COMPANY_INFO.aboutShort}</p>
          <div className="flex items-center gap-2 pt-2">
            <a href={COMPANY_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#252321] bg-white/5 text-[#F5F5F0] hover:border-[#D4A017] hover:text-[#D4A017] transition-colors rounded-lg">
              <Github className="h-4 w-4" />
            </a>
            <a href={COMPANY_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#252321] bg-white/5 text-[#F5F5F0] hover:border-[#D4A017] hover:text-[#D4A017] transition-colors rounded-lg">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={COMPANY_INFO.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border border-[#252321] bg-white/5 text-[#F5F5F0] hover:border-[#D4A017] hover:text-[#D4A017] transition-colors rounded-lg">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Hyperlinked Quick Navigation */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4A017] mb-3 font-bold">Quick Navigation</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/" className="hover:text-white transition-colors font-medium">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors font-medium">About Trevor</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors font-medium">Web Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition-colors font-medium">Portfolio Projects</Link></li>
            <li><Link to="/skills" className="hover:text-white transition-colors font-medium">Skills & Tech Stack</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors font-medium">Get In Touch</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors font-medium">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Featured Projects Links */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4A017] mb-3 font-bold">Featured Projects</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/portfolio?category=E-Commerce" className="hover:text-white transition-colors">NamBuild Construction</Link></li>
            <li><Link to="/portfolio?category=Web Apps" className="hover:text-white transition-colors">Savanna Restaurant</Link></li>
            <li><Link to="/portfolio?category=Web Apps" className="hover:text-white transition-colors">Elite School Website</Link></li>
            <li><Link to="/portfolio?category=UI/UX Design" className="hover:text-white transition-colors">Healthcare Clinic Site</Link></li>
            <li><Link to="/portfolio?category=AI Tools" className="hover:text-white transition-colors">Logistics Fleet Platform</Link></li>
          </ul>
        </div>

        {/* Contact Info Windhoek */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D4A017] mb-3 font-bold">Studio Coordinates</h4>
          <div className="space-y-2.5 text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D4A017] shrink-0" />
              <span>{COMPANY_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#D4A017] shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#D4A017] shrink-0" />
              <span>{COMPANY_INFO.phone}</span>
            </div>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-white/5 border border-[#252321] rounded-full text-[9px] uppercase tracking-wider font-bold text-[#D4A017]">
                ● Accepting New Projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#252321] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8A8A8A] text-[10px] uppercase tracking-wider font-semibold">
        <p>© {new Date().getFullYear()} VisionTech Namibia. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <button onClick={scrollToTop} className="p-2 bg-white/5 border border-[#252321] text-white hover:bg-white/15 transition-colors rounded-lg flex items-center gap-1.5 uppercase font-bold text-[9px] tracking-widest">
            <ArrowUp className="h-3 w-3 text-[#D4A017]" />
            <span>Back To Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
