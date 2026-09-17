import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const ThankYouPage: React.FC = () => {
  usePageMetadata('Thank You | VisionTech Namibia', 'Thank you for reaching out. VisionTech Namibia will respond within 24 hours to your message or quote request.');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-slate-100">
      <div className="inline-flex items-center justify-center mb-8 h-24 w-24 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Thank you — your message is received.</h1>
      <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
        We will review your request and respond within 24 hours with a clear plan, cost estimate, and next steps. In the meantime, feel free to explore our services, portfolio, or contact us directly by phone or WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="pill-btn-active inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-widest"
        >
          Back to Home
        </Link>
        <Link
          to="/services"
          className="pill-btn inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-widest"
        >
          Explore Services <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
