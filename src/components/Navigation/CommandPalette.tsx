import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Globe, 
  User, 
  Code2, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  FileText, 
  Calculator, 
  MessageSquare, 
  X, 
  Sparkles,
  Command,
  CornerDownLeft
} from 'lucide-react';
import { PROJECTS_DATA, SERVICES_DATA } from '../../data/mockData';
import { Project } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
  onOpenCVModal: () => void;
  onSelectProject: (project: Project) => void;
}

interface CommandItem {
  id: string;
  category: 'Pages' | 'Projects' | 'Services' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
  onOpenCVModal,
  onSelectProject
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build items list based on query
  const allItems: CommandItem[] = [
    // Navigation Pages
    {
      id: 'page-home',
      category: 'Pages',
      title: 'Home',
      subtitle: 'Main landing page & services overview',
      icon: Globe,
      action: () => { navigate('/'); onClose(); }
    },
    {
      id: 'page-about',
      category: 'Pages',
      title: 'About VisionTech',
      subtitle: 'Our story, mission & founder profile',
      icon: User,
      action: () => { navigate('/about'); onClose(); }
    },
    {
      id: 'page-services',
      category: 'Pages',
      title: 'Services & Pricing',
      subtitle: 'Digital engineering, web design & packages',
      icon: Code2,
      action: () => { navigate('/services'); onClose(); }
    },
    {
      id: 'page-portfolio',
      category: 'Pages',
      title: 'Portfolio Work',
      subtitle: 'Featured projects and case studies',
      icon: Briefcase,
      action: () => { navigate('/portfolio'); onClose(); }
    },
    {
      id: 'page-skills',
      category: 'Pages',
      title: 'Tech Stack & Skills',
      subtitle: 'Frontend, backend & AI integration stack',
      icon: Layers,
      action: () => { navigate('/skills'); onClose(); }
    },

    {
      id: 'page-contact',
      category: 'Pages',
      title: 'Contact Us',
      subtitle: 'Get in touch or request a quick consultation',
      icon: Mail,
      action: () => { navigate('/contact'); onClose(); }
    },

    // Actions
    {
      id: 'action-quote',
      category: 'Actions',
      title: 'Instant Cost Calculator',
      subtitle: 'Estimate project timeline & budget in real-time',
      icon: Calculator,
      badge: 'Interactive',
      action: () => { onClose(); onOpenQuoteModal(); }
    },
    {
      id: 'action-cv',
      category: 'Actions',
      title: 'View Founder CV / Profile',
      subtitle: 'Qualifications, engineering experience & bio',
      icon: FileText,
      action: () => { onClose(); onOpenCVModal(); }
    },
    {
      id: 'action-whatsapp',
      category: 'Actions',
      title: 'Chat on WhatsApp',
      subtitle: 'Direct line to Trevor Mulonda (+264 81 567 3119)',
      icon: MessageSquare,
      badge: '2h Reply',
      action: () => { window.open('https://wa.me/264815673119', '_blank'); onClose(); }
    },

    // Projects
    ...PROJECTS_DATA.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'Projects' as const,
      title: proj.title,
      subtitle: `${proj.category} — ${proj.subtitle}`,
      icon: Sparkles,
      badge: proj.category,
      action: () => {
        navigate('/portfolio');
        onSelectProject(proj);
        onClose();
      }
    })),

    // Services
    ...SERVICES_DATA.map((service) => ({
      id: `service-${service.id}`,
      category: 'Services' as const,
      title: service.title.replace(/^\d+\s*—\s*/, ''),
      subtitle: `Starting from ${service.basePrice} — ${service.shortDesc}`,
      icon: Code2,
      badge: service.basePrice,
      action: () => { navigate('/services'); onClose(); }
    }))
  ];

  // Filter items based on user search query
  const filteredItems = allItems.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Keep active index in bounds when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [isOpen, filteredItems, selectedIndex, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  // Group items by category for visual organization
  const groupedCategories = ['Pages', 'Actions', 'Projects', 'Services'] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md overflow-hidden">
          
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Palette Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#12141c] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#161822]">
              <Search className="h-5 w-5 text-[#38bdf8] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, page name, or search project..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-slate-400">
                <span>ESC</span>
              </div>
            </div>

            {/* Search Results Container */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4 divide-y divide-white/5">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Search className="h-8 w-8 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No matching results found</p>
                  <p className="text-xs text-slate-500">Try searching for "Portfolio", "Quote", "E-Commerce", or "Contact"</p>
                </div>
              ) : (
                groupedCategories.map((cat) => {
                  const catItems = filteredItems.filter((i) => i.category === cat);
                  if (catItems.length === 0) return null;

                  return (
                    <div key={cat} className="pt-2 first:pt-0">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">
                        {cat}
                      </div>
                      <div className="mt-1 space-y-1">
                        {catItems.map((item) => {
                          const globalIdx = filteredItems.findIndex((i) => i.id === item.id);
                          const isSelected = globalIdx === selectedIndex;
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.id}
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(globalIdx)}
                              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-white translate-x-0.5'
                                  : 'bg-transparent text-slate-300 hover:bg-white/5 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-2">
                                <div className={`p-2 rounded-lg shrink-0 ${
                                  isSelected ? 'bg-[#38bdf8] text-black font-bold' : 'bg-white/5 text-slate-400 border border-white/10'
                                }`}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white truncate">{item.title}</span>
                                    {item.badge && (
                                      <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-white/10 text-[#38bdf8] border border-[#38bdf8]/30 rounded-md shrink-0">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  {item.subtitle && (
                                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                {isSelected && (
                                  <span className="flex items-center gap-1 text-[10px] text-[#38bdf8] font-mono font-bold uppercase">
                                    Select <CornerDownLeft className="h-3 w-3" />
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2.5 bg-[#090a0f] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">↓</kbd>
                  <span className="text-[10px]">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[9px]">↵</kbd>
                  <span className="text-[10px]">Open</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <Command className="h-3 w-3 text-[#38bdf8]" /> VisionTech Omni-Search
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
