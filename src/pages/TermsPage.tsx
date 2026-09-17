import React from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const TermsPage: React.FC = () => {
  usePageMetadata('Terms of Service | VisionTech Namibia', 'Read the VisionTech Namibia terms of service for website development, maintenance, and client relationships.');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-100">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        These terms govern the relationship between VisionTech Namibia and clients who engage our web design, development, or digital services.
      </p>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">1. Services</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          VisionTech Namibia provides custom website design, web development, maintenance, hosting recommendations, and digital strategy services. Every engagement is defined by a separate proposal and agreement.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">2. Payment</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Project fees are due according to the terms in each proposal. Standard payment terms may include a 50% deposit upfront and the remaining balance on delivery or acceptance.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">3. Revisions</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Revision rounds are specified in each project agreement. Additional work beyond the agreed scope may incur extra charges.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">4. Intellectual Property</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Ownership of the final website and source code passes to the client after final payment. Third-party licenses, fonts, or components remain subject to their own licenses.
        </p>
      </section>

      <p className="text-xs text-slate-500 uppercase tracking-widest">Last updated: 2026</p>
    </div>
  );
};
