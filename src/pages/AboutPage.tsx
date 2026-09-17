import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, AVATAR_IMAGE } from '../data/mockData';
import { Award, Users, Clock, CheckCircle2, ArrowRight, Code2, Sparkles, Smartphone, Zap } from 'lucide-react';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Motion/ScrollReveal';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const AboutPage: React.FC = () => {
  usePageMetadata(
    'About Trevor Mulonda & VisionTech Namibia | Web Developer Windhoek',
    'Meet Trevor Mulonda, founder of VisionTech Namibia. A dedicated web developer building clean, fast, high-converting websites for businesses across Namibia since 2023.',
    { path: '/about', keywords: 'Trevor Mulonda, VisionTech Namibia about, web developer Windhoek, website designer Namibia' }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* 3D Interactive Hero Header */}
      <Futuristic3DCanvasHero
        variant="minimal-orb"
        badgeText="ABOUT VISIONTECH NAMIBIA"
        title="Building Modern Web Experiences"
        subtitle={COMPANY_INFO.aboutShort}
        heightClassName="min-h-[300px]"
      />

      {/* Header & Bio Section */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-12 bg-[#12141c] border border-white/10 rounded-2xl shadow-2xl">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#161822] border border-white/10 rounded-2xl text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-[#38bdf8]">{COMPANY_INFO.stats.projectsDelivered}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Websites Built</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-[#38bdf8]">{COMPANY_INFO.stats.yearsExperience}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Web Experience</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-[#38bdf8]">8</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Working Builds</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-mono font-bold text-emerald-400">100%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dedication</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Our Story & Founder Quote */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-12 bg-[#12141c] border border-white/10 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative border border-white/20 p-2 bg-[#161822] rounded-2xl shadow-xl max-w-sm w-full overflow-hidden">
                <img
                  src={AVATAR_IMAGE}
                  alt={COMPANY_INFO.founder}
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="p-4 bg-[#090a0f] text-white text-center mt-2 rounded-xl border border-white/10">
                  <h3 className="font-bold text-lg text-white">{COMPANY_INFO.founder}</h3>
                  <p className="text-[10px] text-[#38bdf8] font-bold uppercase tracking-widest">{COMPANY_INFO.role}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Our Story</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Modern Web Development with Passion & Precision
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {COMPANY_INFO.aboutLong}
              </p>

              <blockquote className="p-6 bg-[#161822] border-l-4 border-[#38bdf8] rounded-r-xl space-y-2">
                <p className="text-xs sm:text-sm text-white italic">
                  "Every business deserves a website that represents their brand at its best — fast, beautiful, and built to convert visitors into customers."
                </p>
                <footer className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                  — {COMPANY_INFO.founder}, {COMPANY_INFO.role}
                </footer>
              </blockquote>

              <div className="flex flex-wrap gap-4 pt-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Fast Turnaround
                </span>
                <span className="px-3 py-1 bg-white/5 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Modern Tech Stack
                </span>
                <span className="px-3 py-1 bg-white/5 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Accepting New Clients
                </span>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Core Capabilities */}
      <div className="space-y-6">
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Capabilities</span>
            <h2 className="text-3xl font-bold text-white mt-1">What We Bring to Your Project.</h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl relative h-full space-y-3">
              <div className="h-10 w-10 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl flex items-center justify-center border border-[#38bdf8]/20">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Modern Frameworks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Built with cutting-edge React, Vue, Vite, and Tailwind CSS for lightning-fast speeds.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl relative h-full space-y-3">
              <div className="h-10 w-10 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl flex items-center justify-center border border-[#38bdf8]/20">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">100% Mobile Responsive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Flawless display and smooth interactions across all smartphone, tablet, and desktop screens.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl relative h-full space-y-3">
              <div className="h-10 w-10 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl flex items-center justify-center border border-[#38bdf8]/20">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Rapid Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Agile development process delivering working business websites in 7 to 14 days.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl relative h-full space-y-3">
              <div className="h-10 w-10 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl flex items-center justify-center border border-[#38bdf8]/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Direct Collaboration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Work directly with the developer. No middlemen, no confusion, instant feedback.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Our Values */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-12 bg-[#12141c] border border-white/10 rounded-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Our Values</span>
            <h2 className="text-3xl font-bold text-white mt-1">What We Believe In.</h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl h-full">
                <h3 className="text-base font-bold text-white mb-2">Precision</h3>
                <p className="text-xs text-slate-400">Every pixel, every line of code, every interaction is crafted with intention and care.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl h-full">
                <h3 className="text-base font-bold text-white mb-2">Transparency</h3>
                <p className="text-xs text-slate-400">No hidden fees, no surprises. Clear communication and honest pricing from day one.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl h-full">
                <h3 className="text-base font-bold text-white mb-2">Partnership</h3>
                <p className="text-xs text-slate-400">We don't just build websites — we build long-term relationships with our clients.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="p-5 bg-[#161822] border border-white/10 rounded-2xl h-full">
                <h3 className="text-base font-bold text-white mb-2">Innovation</h3>
                <p className="text-xs text-slate-400">We stay ahead of the curve, bringing cutting-edge technology to every project.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal scale={0.96} distance={30}>
        <div className="p-8 sm:p-12 text-center bg-[#12141c] border border-white/10 rounded-3xl text-white shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Work Together?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Let's discuss how we can help transform your digital presence and grow your business online.
          </p>
          <Link
            to="/contact"
            className="pill-btn-active inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-8 py-3"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>

    </div>
  );
};
