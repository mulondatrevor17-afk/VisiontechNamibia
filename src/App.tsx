import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navigation/Navbar';
import { GlassDock } from './components/Navigation/GlassDock';
import { Breadcrumbs } from './components/Navigation/Breadcrumbs';
import { Footer } from './components/Footer';
import { AIChatAssistant } from './components/AIChatAssistant';
import { ScrollProgress } from './components/Motion/ScrollReveal';
import { CommandPalette } from './components/Navigation/CommandPalette';
import { LoadingState } from './components/shared/LoadingState';
import { MobileStickyCTA } from './components/shared/MobileStickyCTA';

const HomePage = lazy(() => import('./pages/HomePage').then((mod) => ({ default: mod.HomePage })));
const SkillsPage = lazy(() => import('./pages/SkillsPage').then((mod) => ({ default: mod.SkillsPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then((mod) => ({ default: mod.PortfolioPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((mod) => ({ default: mod.ServicesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((mod) => ({ default: mod.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((mod) => ({ default: mod.ContactPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then((mod) => ({ default: mod.ThankYouPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((mod) => ({ default: mod.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((mod) => ({ default: mod.TermsPage })));

import { ProjectModal } from './components/Modals/ProjectModal';
import { CVModal } from './components/Modals/CVModal';
import { QuoteCalculatorModal, QuoteCalculatorContent } from './components/Modals/QuoteCalculatorModal';
import { Drawer } from './components/ui/Drawer';
import useMediaQuery from './hooks/useMediaQuery';
import PageWrapper from './components/layout/PageWrapper';
import { Project } from './types';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated route container for artistic page transitions
function AnimatedRoutes({
  onOpenQuoteModal,
  onOpenCVModal,
  onSelectProject,
}: {
  onOpenQuoteModal: () => void;
  onOpenCVModal: () => void;
  onSelectProject: (proj: Project | null) => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageWrapper locationKey={location.pathname}>
        <Routes location={location}>
          <Route 
            path="/" 
            element={
              <HomePage 
                onOpenQuoteModal={onOpenQuoteModal}
                onOpenCVModal={onOpenCVModal}
                onSelectProject={onSelectProject}
              />
            } 
          />
          <Route path="/skills" element={<SkillsPage />} />
          <Route 
            path="/portfolio" 
            element={
              <PortfolioPage 
                onSelectProject={onSelectProject}
              />
            } 
          />
          <Route 
            path="/services" 
            element={
              <ServicesPage 
                onOpenQuoteModal={onOpenQuoteModal}
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </PageWrapper>
    </AnimatePresence>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 640px)');

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans selection:bg-[#38bdf8] selection:text-black relative">
        
        {/* Navbar Header */}
        <Navbar 
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenCVModal={() => setIsCVModalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Hyperlinked Path Breadcrumbs */}
        <Breadcrumbs />

        {/* Floating Neon Cyan Glass Dock (Desktop left / Mobile bottom) */}
        <GlassDock onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 transition-all duration-300">
          <Suspense fallback={<LoadingState full={true} />}>
            <AnimatedRoutes 
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
              onOpenCVModal={() => setIsCVModalOpen(true)}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          </Suspense>
        </main>

        <MobileStickyCTA
          visible={!isQuoteModalOpen}
          onQuote={() => setIsQuoteModalOpen(true)}
          onContact={() => window.location.assign('/contact')}
        />

        {/* AI Chat Assistant Widget */}
        <AIChatAssistant />

        {/* Footer */}
        <Footer />

        {/* Omni-Search Command Palette */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onOpenCVModal={() => setIsCVModalOpen(true)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Modals */}
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />

        <CVModal 
          isOpen={isCVModalOpen} 
          onClose={() => setIsCVModalOpen(false)} 
        />

        {/* Quote calculator: modal on desktop, drawer on small screens */}
        <QuoteCalculatorModal 
          isOpen={isQuoteModalOpen && !isMobile} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />

        <Drawer isOpen={isQuoteModalOpen && isMobile} onClose={() => setIsQuoteModalOpen(false)}>
          <QuoteCalculatorContent onClose={() => setIsQuoteModalOpen(false)} />
        </Drawer>

      </div>
    </BrowserRouter>
  );
}
