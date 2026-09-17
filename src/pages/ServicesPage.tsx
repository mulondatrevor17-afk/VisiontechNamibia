import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES_DATA, PRICING_PACKAGES, WHY_US_COMPARISON, FAQS_DATA } from '../data/mockData';
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, XCircle, Sparkles } from 'lucide-react';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import PackageCard from '../components/shared/PackageCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Motion/ScrollReveal';
import { usePageMetadata } from '../hooks/usePageMetadata';

interface ServicesPageProps {
  onOpenQuoteModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuoteModal }) => {
  usePageMetadata(
    'Web Design & Development Services in Namibia | VisionTech',
    'Explore professional web design, e-commerce stores, website redesign, and SEO optimization services for businesses across Namibia with transparent pricing packages.',
    { path: '/services', keywords: 'web design services Namibia, e-commerce development Windhoek, website packages Namibia, web design pricing Windhoek' }
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* 3D Canvas Interactive Hero Header */}
      <Futuristic3DCanvasHero
        variant="cyber-grid"
        badgeText="FULL-STACK SERVICE SUITE"
        title="Every Tool You Need to Scale Online"
        subtitle="From strategy to launch and beyond — a complete suite of digital services designed to grow Namibian businesses online."
        heightClassName="min-h-[320px]"
      >
        <button
          onClick={onOpenQuoteModal}
          className="pill-btn-active py-2.5 px-6 text-xs inline-flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>Request Instant Quote</span>
        </button>
      </Futuristic3DCanvasHero>

      {/* Services Grid 01 - 06 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service) => (
          <StaggerItem key={service.id}>
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl flex flex-col justify-between space-y-6 hover:border-[#38bdf8]/50 transition-all group h-full">
              <div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <span className="text-2xl font-mono font-bold text-[#38bdf8]">{service.tag}</span>
                  <span className="text-xs font-bold font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-emerald-400 rounded-full">
                    From {service.basePrice}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                  {service.title.replace(/^\d+\s*—\s*/, '')}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                  {service.fullDesc}
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] block mb-2">
                    What's Included:
                  </span>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-[#38bdf8] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="pill-btn-active w-full text-xs font-bold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2 mt-4"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Comparison Section */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-12 bg-[#12141c] border border-white/10 rounded-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Comparison</span>
            <h2 className="text-3xl font-bold text-white mt-1 mb-2">
              {WHY_US_COMPARISON.title}
            </h2>
            <p className="text-xs text-slate-400">See why hiring professionals pays for itself.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#161822] border border-white/10 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-300 mb-4 pb-2 border-b border-white/10">
                {WHY_US_COMPARISON.withoutUs.title}
              </h3>
              <ul className="space-y-3">
                {WHY_US_COMPARISON.withoutUs.points.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-[#161924] border border-[#38bdf8]/40 rounded-2xl shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/10">
                {WHY_US_COMPARISON.withUs.title}
              </h3>
              <ul className="space-y-3">
                {WHY_US_COMPARISON.withUs.points.map((pt, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Pricing Tiers Section */}
      <div className="space-y-8">
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1 mb-2">
              Simple Pricing.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              All projects are quoted individually. These tiers are a starting guide.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING_PACKAGES.slice(0,3).map((pkg) => (
            <StaggerItem key={pkg.id}>
              <PackageCard
                tier={pkg.name}
                price={pkg.price}
                highlighted={pkg.highlight}
                features={pkg.features}
              />
              <div className="mt-3">
                <button
                  onClick={onOpenQuoteModal}
                  className={pkg.highlight ? 'pill-btn-active w-full text-xs font-bold uppercase tracking-widest py-3 justify-center' : 'pill-btn w-full text-xs font-bold uppercase tracking-widest py-3 justify-center'}
                >
                  {pkg.cta}
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-[11px] text-slate-500 text-center font-sans italic">
          All prices in Namibian Dollars (N$) · Hosting not included unless specified · Payment plans available
        </p>
      </div>

      {/* FAQ Accordions */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-12 max-w-4xl mx-auto space-y-8 bg-[#12141c] border border-white/10 rounded-2xl">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">FAQ</span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Questions? Answered.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 bg-[#161822] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-white hover:bg-white/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-[#38bdf8] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal scale={0.96} distance={30}>
        <div className="p-8 sm:p-12 text-center bg-[#12141c] border border-white/10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-2">Let's Build Something.</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Ready to transform your online presence? Get in touch and we'll get back to you within 2 hours.
          </p>
          <Link
            to="/contact"
            className="pill-btn-active inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-8 py-3"
          >
            Start Your Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>

    </div>
  );
};
