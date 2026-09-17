import React from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const PrivacyPolicyPage: React.FC = () => {
  usePageMetadata('Privacy Policy | VisionTech Namibia', 'Read VisionTech Namibia privacy practices, how we collect data, and your privacy rights.');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-slate-100">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        VisionTech Namibia is committed to protecting your privacy. This page explains what information we collect, why we collect it, and how we use it.
      </p>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          We collect contact information you provide when submitting forms, such as name, email, phone number, company, and project details. We do not sell your information.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">2. How We Use Data</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          We use form submissions to respond to inquiries, send quotes, and provide support. Analytics data may be used to improve site performance and user experience.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">3. Cookies & Tracking</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          This site may use cookies or analytics scripts for performance and conversion measurement. No personally identifiable information is shared with third parties without consent.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-white">4. Your Rights</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          You may request access, correction, or deletion of your personal data by contacting us at info@visiontechna.online.
        </p>
      </section>

      <p className="text-xs text-slate-500 uppercase tracking-widest">Last updated: 2026</p>
    </div>
  );
};
