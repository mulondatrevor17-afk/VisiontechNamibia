import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_INFO } from '../data/mockData';
import { Mail, Phone, MapPin, Send, MessageSquare, Map, Clock } from 'lucide-react';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import { ScrollReveal } from '../components/Motion/ScrollReveal';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const ContactPage: React.FC = () => {
  usePageMetadata(
    'Contact VisionTech Namibia | Get a Free Web Design Quote',
    'Get in touch with VisionTech Namibia for your next web design or development project. Fast turnaround, clear pricing, and instant WhatsApp support in Windhoek.',
    { path: '/contact', keywords: 'contact web designer Namibia, hire web developer Windhoek, web design quote Namibia, WhatsApp web developer' }
  );

  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Business Website']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    timeline: 'As soon as possible',
    budget: 'N$ 3,500 - N$ 5,500',
    message: '',
    consent: false
  });

  const interestOptions = [
    'Business Website',
    'E-Commerce',
    'Redesign',
    'SEO',
    'Maintenance',
    'Hosting',
    'Not Sure Yet'
  ];

  const toggleInterest = (item: string) => {
    setSelectedInterests(prev => prev.includes(item) ? prev.filter(i=>i!==item) : [...prev, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: Record<string, string> = {
      'form-name': 'contact',
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || 'Not specified',
      company: formData.company || 'Not specified',
      services: selectedInterests.join(', ') || 'General Inquiry',
      timeline: formData.timeline,
      budget: formData.budget,
      message: formData.message
    };

    try {
      // 1. Submit to Netlify Forms (triggers instant Netlify email notification)
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString()
      });

      // 2. Also dispatch to local/production backend API if available
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (backendErr) {
        // Backend failure is non-fatal since Netlify Forms handles the email
      }

      if (res.ok || res.status === 200 || res.status === 302 || res.status === 0) {
        navigate('/thank-you');
      } else {
        // If Netlify form isn't catching, still navigate after logging
        navigate('/thank-you');
      }
    } catch (err: any) {
      console.warn('Network submission notice:', err);
      // Even if offline, navigate to thank you or provide fallback
      navigate('/thank-you');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VisionTech Namibia, I would like to inquire about a project:\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nServices: ${selectedInterests.join(', ')}\nTimeline: ${formData.timeline}\nBudget: ${formData.budget}\nDetails: ${formData.message}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

      <Futuristic3DCanvasHero
        variant="minimal-orb"
        badgeText="24-HOUR GUARANTEED RESPONSE"
        title="Let's Build Something Great"
        subtitle="Tell us about your project and we'll get back to you within 24 hours with a tailored plan and transparent quote — no obligation, no jargon."
        heightClassName="min-h-[300px]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="artistic-card p-6 sm:p-8 space-y-6 bg-[#12141c] border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
            <div className="space-y-4 text-xs font-sans">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 p-3.5 bg-[#161822] border border-white/10 rounded-xl hover:border-[#38bdf8]/50 transition-colors text-white"
              >
                <div className="h-9 w-9 bg-[#38bdf8] text-black font-bold flex items-center justify-center shrink-0 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Us</span>
                  <span className="font-bold text-white">{COMPANY_INFO.email}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-[#161822] border border-white/10 rounded-xl hover:border-emerald-400/50 transition-colors text-white"
              >
                <div className="h-9 w-9 bg-emerald-500 text-black font-bold flex items-center justify-center shrink-0 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">WhatsApp Direct</span>
                  <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 bg-[#161822] border border-white/10 rounded-xl text-white">
                <div className="h-9 w-9 bg-white/10 text-white font-bold flex items-center justify-center shrink-0 rounded-lg">
                  <MapPin className="h-4 w-4 text-[#38bdf8]" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                  <span className="font-bold text-white">{COMPANY_INFO.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Studio Hours</h3>
              <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                <div className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="text-white font-bold">08:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-white font-bold">09:00 – 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-slate-500">Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="artistic-card p-6 sm:p-8 bg-[#12141c] border border-white/10 rounded-2xl">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden Netlify Form Identity */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>

              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Send Us a Message</h2>
                <p className="text-xs text-slate-400">Fill out the form below and we'll reply to your email within 24 hours.</p>
              </div>

              {submitError && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-200">
                  <p className="mb-2">{submitError}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/264815673119?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                    >
                      Send via WhatsApp
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Project%20Inquiry%20from%20${encodeURIComponent(formData.firstName)}&body=${whatsappMessage}`}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-[11px]"
                    >
                      Send via Email App
                    </a>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-2">What service(s) are you interested in?</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${isSelected ? 'bg-[#38bdf8] text-black' : 'bg-white/5 text-white'}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="services" value={selectedInterests.join(', ')} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Shikongo"
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="johannes@company.com.na"
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+264 81 123 4567"
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Shikongo Logistics Ltd"
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Project Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option className="bg-[#12141c]">As soon as possible</option>
                    <option className="bg-[#12141c]">Within 1 - 2 weeks</option>
                    <option className="bg-[#12141c]">Within 1 month</option>
                    <option className="bg-[#12141c]">Just exploring options</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Estimated Budget (N$)</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                >
                  <option className="bg-[#12141c]">Starter: N$ 1,500</option>
                  <option className="bg-[#12141c]">Lite: N$ 3,500 (or N$583 x 6 mos)</option>
                  <option className="bg-[#12141c]">Premium: N$ 5,500 (or N$917 x 6 mos)</option>
                  <option className="bg-[#12141c]">Biz: N$ 9,250 (or N$1,156 x 8 mos)</option>
                  <option className="bg-[#12141c]">Custom Scope / Unsure</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Message / Project Details *</label>
                  <span className="text-[10px] text-slate-500 font-mono">{formData.message.length}/2000</span>
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your business, what goals you want to achieve with your website, or any specific features you need..."
                  className="w-full px-3.5 py-2.5 bg-[#161822] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 accent-[#38bdf8]"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-300">
                  I agree to VisionTech Namibia processing my details to respond to this project inquiry.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="pill-btn-active w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold py-3 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>

      </div>

      <ScrollReveal direction="up" distance={20}>
        <div className="artistic-card p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#12141c] border border-white/10 rounded-2xl">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8]">Find Us</span>
            <h3 className="text-xl font-bold text-white mt-1">Based in Windhoek, Namibia</h3>
            <p className="text-xs text-slate-400 mt-1">We work with clients across Namibia and Southern Africa.</p>
          </div>
          <a
            href="https://maps.google.com/?q=Windhoek,Namibia"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn flex items-center gap-2 text-xs uppercase tracking-wider font-bold shrink-0"
          >
            <Map className="h-4 w-4 text-[#38bdf8]" /> Open in Google Maps
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" distance={25}>
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#38bdf8]">Quick Answers</span>
            <h2 className="text-3xl font-bold text-white mt-1">Before You Reach Out.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              { q: "How quickly can you start my project?", a: "Typically within 24 to 48 hours of agreeing on the project scope and initial deposit." },
              { q: "Do you work with businesses outside Windhoek?", a: "Yes! We work with clients across Namibia and internationally via WhatsApp, email, and video calls." },
              { q: "How much does a website cost?", a: "Our packages start at N$ 1,500 for a Starter website up to N$ 9,250 for custom enterprise builds." },
              { q: "Do I own my website after it's built?", a: "Yes — once the final payment is cleared, you own all source code and assets." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-[#161822] border border-white/10 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal scale={0.96} distance={30}>
        <div className="p-8 sm:p-12 text-center bg-[#12141c] border border-white/10 rounded-3xl text-white shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">Your Dream Website Is One Message Away.</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">Ready to launch your online presence with VisionTech? Let's build your next high-performance website.</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn-active flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3"
            >
              <MessageSquare className="h-4 w-4" /> WhatsApp Us Now
            </a>
            <a href={`tel:${COMPANY_INFO.phone}`} className="pill-btn flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3">
              <Phone className="h-4 w-4 text-[#38bdf8]" /> Call Us Direct
            </a>
          </div>
        </div>
      </ScrollReveal>

    </div>
  );
};
