import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, User, Mail, Code2, Search } from 'lucide-react';

interface GlassDockProps {
  onOpenCommandPalette?: () => void;
}

export const GlassDock: React.FC<GlassDockProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();

  const dockItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: User },
    { path: '/services', label: 'Services', icon: Code2 },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/skills', label: 'Skills', icon: Layers },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Left Floating Vertical Artistic Dock */}
      <aside 
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 p-2.5 rounded-full bg-[#12141c]/80 backdrop-blur-md border border-white/10 shadow-2xl"
        aria-label="Quick Navigation Dock"
      >
        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            title="Omni-Search (Ctrl+K)"
            id="dock-desktop-search"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/40 text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all duration-200"
          >
            <Search className="h-4 w-4" />
            <span className="pointer-events-none absolute left-14 hidden group-hover:flex items-center rounded-lg bg-[#161822] border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl whitespace-nowrap z-50">
              Search (Ctrl+K)
            </span>
          </button>
        )}

        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              id={`dock-desktop-${item.label.toLowerCase()}`}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
                active
                  ? 'bg-[#38bdf8] text-black shadow-lg scale-105 font-bold'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />

              {/* Active Indicator */}
              {active && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#090a0f] rounded-full"></span>
              )}

              {/* Tooltip on Hover */}
              <span className="pointer-events-none absolute left-14 hidden group-hover:flex items-center rounded-lg bg-[#161822] border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl whitespace-nowrap z-50">
                {item.label}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* Mobile Bottom Floating Horizontal Dock */}
      <nav 
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-around gap-1 px-3 py-2 rounded-full bg-[#12141c]/90 backdrop-blur-md border border-white/10 shadow-2xl w-[92%] max-w-md"
        aria-label="Mobile Navigation Dock"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              id={`dock-mobile-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded-full transition-all ${
                active
                  ? 'text-black bg-[#38bdf8] font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
