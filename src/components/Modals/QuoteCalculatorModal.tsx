import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Check, Calculator, Send, Zap } from 'lucide-react';
import { SERVICES_DATA } from '../../data/mockData';
import { auth, saveQuoteToFirestore, onAuthStateChanged, User } from '../../lib/firebase';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extracted content so it can be reused in Drawer on mobile
export const QuoteCalculatorContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES_DATA[0].id]);
  const [timeline, setTimeline] = useState<'Standard (2-3 weeks)' | 'Express Rush (1 week)' | 'Flexible (1+ month)'>('Standard (2-3 weeks)');
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    seo: true,
    cms: false,
    analytics: true,
    maintenance: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        if (user.displayName) setClientName(user.displayName);
        if (user.email) setClientEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((serviceId) => serviceId !== id));
      }
      return;
    }

    setSelectedServices([...selectedServices, id]);
  };

  const calculateTotal = () => {
    let base = 0;
    selectedServices.forEach((sId) => {
      const serv = SERVICES_DATA.find((s) => s.id === sId);
      if (serv) {
        base += parseInt(serv.basePrice.replace(/[^0-9]/g, ''), 10) || 0;
      }
    });

    if (addons.seo) base += 450;
    if (addons.cms) base += 750;
    if (addons.analytics) base += 300;
    if (addons.maintenance) base += 600;

    if (timeline === 'Express Rush (1 week)') base *= 1.3;
    if (timeline === 'Flexible (1+ month)') base *= 0.95;

    return Math.round(base);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const total = calculateTotal();
    const serviceNames = selectedServices.map(id => SERVICES_DATA.find(s => s.id === id)?.title || id).join(', ');
    const activeAddons = Object.keys(addons).filter(k => addons[k]);

    try {
      // 1. Submit to Netlify Forms for email delivery
      const quotePayload: Record<string, string> = {
        'form-name': 'quote-request',
        name: clientName || 'Client',
        email: clientEmail || 'Not specified',
        services: serviceNames,
        timeline,
        addons: activeAddons.join(', ') || 'None',
        totalEstimate: `N$ ${total} NAD`
      };

      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(quotePayload).toString()
        });
      } catch (postErr) {
        console.warn('Netlify quote form dispatch notice:', postErr);
      }

      // 2. Also save to Firestore if user is authenticated
      if (currentUser) {
        await saveQuoteToFirestore({
          userId: currentUser.uid,
          userEmail: clientEmail || currentUser.email || 'anonymous',
          userName: clientName || currentUser.displayName || 'Client',
          serviceType: serviceNames,
          budget: `N$ ${total} NAD`,
          timeline,
          selectedAddons: activeAddons,
          totalEstimate: total,
          status: 'Pending Review'
        });
      }
    } catch (err) {
      console.error('Failed to save quote:', err);
    } finally {
      setIsSaving(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl text-[#1A1A1A]">
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="h-4 w-4 text-[#E94E33]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E94E33]">Matrix Estimator</span>
      </div>

      <h2 className="text-3xl font-serif-artistic text-[#1A1A1A] mb-2">Custom Node Calculator</h2>
      <p className="text-xs text-gray-600 mb-6">Select your required service nodes, timeline, and enhancements to generate an instant estimate in NAD.</p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Select Services */}
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-3">
              1. Select Service Nodes (Click to toggle)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_DATA.map((serv) => {
                const isSelected = selectedServices.includes(serv.id);
                return (
                  <div
                    key={serv.id}
                    onClick={() => toggleService(serv.id)}
                    className={`cursor-pointer p-3.5 border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#FAF9F6] border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                        : 'bg-white border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A] mb-0.5">{serv.title}</div>
                      <div className="text-[10px] font-mono text-[#E94E33] font-bold">{serv.basePrice} NAD</div>
                    </div>
                    <div className={`h-5 w-5 flex items-center justify-center border ${
                      isSelected ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Add-ons */}
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-3">
              2. Project Enhancements & Features
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: 'seo', label: 'Advanced SEO Optimization (+N$ 450)' },
                { key: 'cms', label: 'Admin Dashboard / CMS (+N$ 750)' },
                { key: 'analytics', label: 'Custom Analytics Setup (+N$ 300)' },
                { key: 'maintenance', label: '1-Year Priority Support (+N$ 600)' },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-2 p-2.5 bg-[#FAF9F6] border border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addons[item.key]}
                    onChange={(e) => setAddons({ ...addons, [item.key]: e.target.checked })}
                    className="border-gray-400 text-[#E94E33] focus:ring-[#E94E33]"
                  />
                  <span className="text-gray-800 text-[11px] font-medium">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Timeline */}
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2">
              3. Preferred Delivery Velocity
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Standard (2-3 weeks)', 'Express Rush (1 week)', 'Flexible (1+ month)'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t as any)}
                  className={`px-3 py-2 border font-bold uppercase text-[10px] tracking-wider transition-colors ${
                    timeline === t
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#1A1A1A]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Live Total Display */}
          <div className="p-4 bg-[#FAF9F6] border border-[#1A1A1A] flex items-center justify-between">
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block">Estimated Node Investment</span>
              <span className="text-xs text-[#E94E33] font-bold">Includes selected scope & velocity multiplier</span>
            </div>
            <div className="text-2xl sm:text-3xl font-light text-[#1A1A1A] tracking-tighter">
              N$ {calculateTotal().toLocaleString()} <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">NAD</span>
            </div>
          </div>

          {/* Client Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Your Name</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-gray-300 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Your Email / WhatsApp</label>
              <input
                type="text"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="john@company.com or +264..."
                className="w-full px-3 py-2 bg-[#FAF9F6] border border-gray-300 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`w-full py-3 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E94E33] hover:bg-[#d03d23]'}`}
          >
            <Send className="h-4 w-4" />
            {isSaving ? 'Submitting Request...' : 'Lock In Quote & Submit Node Request'}
          </button>
        </form>
      ) : (
        <div className="py-8 text-center space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center border border-[#1A1A1A] bg-[#E94E33] text-white">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-serif-artistic text-[#1A1A1A]">Quote Request Transmitted!</h3>
          <p className="text-xs text-gray-700 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-[#E94E33] font-bold">{clientName}</span>. Your estimate of <span className="text-[#1A1A1A] font-bold">N$ {calculateTotal().toLocaleString()} NAD</span> for VisionTech Namibia has been received into the matrix. We will contact you at <span className="text-[#E94E33] font-bold">{clientEmail}</span> within 2 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="px-6 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#E94E33]"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quote Calculator" size="lg">
      <QuoteCalculatorContent onClose={onClose} />
    </Modal>
  );
};
