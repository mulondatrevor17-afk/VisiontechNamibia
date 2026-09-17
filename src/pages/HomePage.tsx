import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Briefcase, CheckCircle2, XCircle, FileText, Linkedin, Facebook, Instagram, Twitter, MessageCircle, Globe, Layers, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, PROJECTS_DATA, SERVICES_DATA, PROCESS_STEPS, WHY_US_COMPARISON, TESTIMONIALS_DATA, DARK_WORKSPACE_IMAGE, HERO_IMAGE } from '../data/mockData';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Motion/ScrollReveal';
import { usePageMetadata } from '../hooks/usePageMetadata';
import GlowPortrait from '../components/shared/GlowPortrait';
import StatBadge from '../components/shared/StatBadge';
import TrustBar from '../components/shared/TrustBar';

interface HomePageProps {
  onOpenQuoteModal: () => void;
  onOpenCVModal: () => void;
  onSelectProject: (proj: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal, onOpenCVModal, onSelectProject }) => {
  usePageMetadata(
    'VisionTech Namibia | Web Design & Development Studio Windhoek',
    'VisionTech Namibia is Windhoek’s premier web design and development studio. We build modern, high-speed websites, e-commerce stores, and custom web applications.',
    { path: '/', keywords: 'web design Namibia, website developer Windhoek, e-commerce Namibia, web development Windhoek' }
  );

  return (
    <div className="space-y-20 pb-20 bg-[#0b0c10] text-slate-100 min-h-screen">
      
      {/* Hero Section matching the requested dark workspace layout */}
      <section className="relative min-h-[85vh] flex flex-col justify-between pt-8 pb-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        
        {/* Background Dark Workspace Desktop Setup */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img 
            src={DARK_WORKSPACE_IMAGE} 
            alt="Dark Workspace Setup" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-[#0b0c10]/70"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8">
          
          {/* Hero Left Content - Matching the exact typography hierarchy of the reference image */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Small Eyebrow First Name / Brand */}
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-light tracking-[0.25em] text-slate-300 uppercase block font-sans">
                TREVOR
              </span>
              
              {/* Huge Bold Uppercase Name / Brand */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none">
                MULONDA
              </h1>
            </div>

            {/* Sub-line Role / Title */}
            <p className="text-lg sm:text-xl font-light text-slate-300 tracking-wider">
              {COMPANY_INFO.role} &amp; Web Architect
            </p>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {COMPANY_INFO.heroDescription}
            </p>

            {/* Pill Border Buttons matching the reference image */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenCVModal}
                className="pill-btn-active"
              >
                <FileText className="h-4 w-4" />
                Resume
              </button>

              <Link
                to="/portfolio"
                className="pill-btn"
              >
                <Briefcase className="h-4 w-4" />
                Portfolio
              </Link>

              <button
                onClick={onOpenQuoteModal}
                className="pill-btn border-[#38bdf8]/50 hover:border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black"
              >
                <Sparkles className="h-4 w-4" />
                Get Quote
              </button>
            </div>
          </div>

          {/* Hero Right Visual — Glow portrait with floating stat badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <GlowPortrait src={HERO_IMAGE} alt="VisionTech Namibia lead" />

              {/* Floating stat badges (max 2 shown) */}
              <StatBadge position="top-right" value={COMPANY_INFO.stats.projectsDelivered} label="Projects" />
              <StatBadge position="bottom-right" value={COMPANY_INFO.stats.yearsExperience} label="Experience" />
            </div>
          </div>

        </div>

      </section>

      {/* Trust bar beneath hero */}
      <TrustBar metrics={[`${COMPANY_INFO.stats.projectsDelivered} Projects`, `${COMPANY_INFO.stats.yearsExperience} Experience`, 'Windhoek & Oshakati']} />

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
          <div className="artistic-card p-6 sm:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Services</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  Digital Engineering &amp; Web Design
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                  Custom web platforms, mobile responsive applications, and brand-first digital solutions.
                </p>
              </div>
              <Link
                to="/services"
                className="pill-btn shrink-0"
              >
                All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((service) => (
                <StaggerItem key={service.id}>
                  <div className="p-6 bg-[#161822] border border-white/10 rounded-xl hover:border-[#38bdf8]/50 transition-all flex flex-col justify-between group h-full">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#38bdf8]">{service.tag}</span>
                      <h3 className="text-lg font-bold text-white mt-2 mb-2 group-hover:text-[#38bdf8] transition-colors">
                        {service.title.replace(/^\d+\s*—\s*/, '')}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white/5 text-slate-300 border border-white/10 rounded-full">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Why VisionTech: Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={25}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Comparison</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
              {WHY_US_COMPARISON.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {WHY_US_COMPARISON.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DIY Card */}
          <ScrollReveal direction="left" distance={40} delay={0.1}>
            <div className="p-8 bg-[#12141c] border border-white/10 rounded-2xl h-full">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Traditional DIY</span>
                  <h3 className="text-xl font-bold text-slate-300">{WHY_US_COMPARISON.withoutUs.title}</h3>
                </div>
                <XCircle className="h-8 w-8 text-slate-600" />
              </div>

              <ul className="space-y-3">
                {WHY_US_COMPARISON.withoutUs.points.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-slate-400">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* With VisionTech Card */}
          <ScrollReveal direction="right" distance={40} delay={0.2}>
            <div className="p-8 bg-[#161924] border border-[#38bdf8]/40 rounded-2xl shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#38bdf8]/5 rounded-full filter blur-2xl"></div>
              
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">VisionTech Standard</span>
                    <h3 className="text-xl font-bold text-white">{WHY_US_COMPARISON.withUs.title}</h3>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-[#38bdf8]" />
                </div>

                <ul className="space-y-3 relative z-10">
                  {WHY_US_COMPARISON.withUs.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-slate-200 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full pill-btn-active justify-center text-xs uppercase tracking-widest py-3"
                >
                  Start Project With Us
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
          <div className="artistic-card p-6 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Process</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
                Development Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A transparent, milestone-driven process designed for speed, security, and quality.
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS_STEPS.map((step) => (
                <StaggerItem key={step.step}>
                  <div className="p-6 bg-[#161822] border border-white/10 rounded-xl relative flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black font-mono text-[#38bdf8]">{step.step}</span>
                        <span className="px-2.5 py-0.5 bg-white/10 text-slate-300 text-[9px] font-mono rounded-full uppercase">
                          {step.timeframe}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Projects Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={25}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Portfolio</span>
              <h2 className="text-3xl font-bold text-white mt-1">Featured Work.</h2>
            </div>
            <Link
              to="/portfolio"
              className="pill-btn shrink-0"
            >
              All Work ({PROJECTS_DATA.length}) <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.slice(0, 6).map((project) => (
            <StaggerItem key={project.id}>
              <div
                onClick={() => onSelectProject(project)}
                className="cursor-pointer group bg-[#12141c] border border-white/10 rounded-xl overflow-hidden hover:border-[#38bdf8]/50 transition-all flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#0b0c10]/80 text-white rounded-full border border-white/10 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#0b0c10]/80 hover:bg-[#38bdf8] hover:text-black backdrop-blur-md text-slate-200 border border-white/10 rounded-full transition-colors flex items-center gap-1 shadow-md"
                      title="Open live website in new tab"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider pt-2 border-t border-white/10">
                    Explore Details <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
          <div className="artistic-card p-6 sm:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Testimonials</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                Client Feedback
              </h2>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS_DATA.map((t) => (
                <StaggerItem key={t.id}>
                  <div className="p-6 bg-[#161822] border border-white/10 rounded-xl flex flex-col justify-between space-y-4 h-full">
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{t.content}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-10 h-10 border border-white/20 rounded-full overflow-hidden bg-white/5 shrink-0">
                        <img src={t.avatar} alt={t.clientName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                        <p className="text-[10px] text-slate-400">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </section>

      {/* Namibia Local SEO Authority & Regional Coverage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={30}>
          <div className="artistic-card p-6 sm:p-12 bg-[#12141c] border border-white/10 rounded-3xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Local SEO & National Coverage</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
                Web Design Built for Namibia.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you operate in Windhoek, coastal ports, or northern commercial hubs, VisionTech Namibia builds high-ranking websites engineered for Namibian mobile networks and local customer behavior.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl space-y-3">
                <div className="h-9 w-9 bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center rounded-xl font-bold text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-white">Windhoek & Central Namibia</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Corporate websites, legal practices, private schools, medical clinics, and professional service firms across Windhoek and Khomas Region.
                </p>
              </div>

              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl space-y-3">
                <div className="h-9 w-9 bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center rounded-xl font-bold text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-white">Coastal & Tourism Hubs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hospitality, restaurant reservation platforms, logistics, transport fleet systems, and luxury decor portals in Swakopmund & Walvis Bay.
                </p>
              </div>

              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl space-y-3">
                <div className="h-9 w-9 bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center rounded-xl font-bold text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-white">Northern & Regional Enterprises</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  E-commerce fashion storefronts, auto traders, construction contractors, and retail portals in Oshakati, Ongwediva, Rundu, and beyond.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Popular Searches:</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] text-slate-300">Web Design Windhoek</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] text-slate-300">E-Commerce Namibia</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] text-slate-300">Website Cost Namibia</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-full text-[11px] text-slate-300">SEO Services Namibia</span>
              </div>
              <Link to="/services" className="text-[#38bdf8] hover:underline font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                Explore Packages in NAD <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal scale={0.96} distance={30}>
          <div className="p-8 sm:p-14 text-center bg-[#12141c] border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#38bdf8]/5 rounded-full filter blur-3xl pointer-events-none"></div>

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8] relative z-10">Ready to Begin?</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 mb-4 relative z-10">
              Let's Build Your Vision.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
              Tell us about your web project and we'll reply within 2 hours with a comprehensive roadmap and transparent cost estimate.
            </p>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <button
                onClick={onOpenQuoteModal}
                className="pill-btn-active text-xs font-bold uppercase tracking-widest px-8 py-3"
              >
                Start Project
              </button>
              <Link
                to="/portfolio"
                className="pill-btn text-xs font-bold uppercase tracking-widest px-8 py-3"
              >
                View Portfolio
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 text-center relative z-10">
              <div>
                <div className="text-xl font-bold text-[#38bdf8]">{COMPANY_INFO.stats.projectsDelivered}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Projects Built</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#38bdf8]">{COMPANY_INFO.stats.avgDelivery}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Avg. Delivery</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#38bdf8]">{COMPANY_INFO.stats.satisfactionRate}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Satisfaction</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#38bdf8]">{COMPANY_INFO.stats.responseTime}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Response Time</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

