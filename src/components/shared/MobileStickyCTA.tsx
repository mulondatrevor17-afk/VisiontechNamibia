import React from 'react';

interface MobileStickyCTAProps {
  visible: boolean;
  onQuote: () => void;
  onContact: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ visible, onQuote, onContact }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block lg:hidden bg-[#090a0f]/95 border-t border-white/10 backdrop-blur-xl px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <button
          onClick={onQuote}
          className="flex-1 rounded-2xl bg-[#D4A017] px-4 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#D4A017]/20 hover:bg-[#c6a30c] transition-colors"
        >
          Get Quote
        </button>
        <button
          onClick={onContact}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};
