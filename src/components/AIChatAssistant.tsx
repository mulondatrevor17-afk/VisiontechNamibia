import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Minimize2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: `Welcome to VisionTech Namibia. Ask me about our web development services, pricing in NAD (N$), live projects, or request a custom quote!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg, time }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = getSmartResponse(userMsg);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setIsTyping(false);
    }, 900);
  };

  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('rates') || q.includes('pricing') || q.includes('nad') || q.includes('n$')) {
      return `VisionTech Namibia offers transparent packages in Namibian Dollars (NAD):\n• Starter Package: N$ 1,500\n• Lite Package: N$ 3,500 (or N$583/mo x 6)\n• Premium Package: N$ 5,500 (or N$917/mo x 6)\n• Biz Enterprise: N$ 9,250 (or N$1,156/mo x 8)\n\nYou can also use our interactive Matrix Quote Calculator on the Services page!`;
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('vue') || q.includes('tailwind')) {
      return `Trevor Mulonda specializes in modern web technologies: React & Vue.js (95%), Tailwind CSS & UI/UX (92%), TypeScript & Node.js (90%), SEO Optimization (92%), and E-Commerce platforms (88%).`;
    }
    if (q.includes('location') || q.includes('where') || q.includes('namibia') || q.includes('windhoek')) {
      return `VisionTech Namibia is based right here in Windhoek, Namibia (${COMPANY_INFO.phone}). We build websites for businesses across all 14 regions of Namibia and internationally!`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('whatsapp')) {
      return `You can reach Trevor directly via Email at ${COMPANY_INFO.email} or WhatsApp / Call at ${COMPANY_INFO.phone}.`;
    }
    if (q.includes('project') || q.includes('portfolio') || q.includes('work') || q.includes('ecommerce') || q.includes('site')) {
      return `VisionTech has built 10 real working websites and web platforms in Namibia, including EWIWI Investment CC, Ragazzi Clothing, Hermanos Home Decor, TTP Auto Trading, SwiftHaul Logistics, and Elite Private School. Check out our Portfolio page to launch live sites!`;
    }
    if (q.includes('who') || q.includes('trevor') || q.includes('visiontech') || q.includes('about')) {
      return `VisionTech Namibia is a modern web design and development studio founded in 2023 by Trevor Mulonda (3 years of experience, 10 live working builds), delivering high-performance, responsive websites for Namibian enterprises.`;
    }

    return `Thanks for your question! Trevor Mulonda and VisionTech Namibia specialize in custom business websites, e-commerce stores, and UI/UX design in Windhoek. Would you like to request a quote or chat on WhatsApp (${COMPANY_INFO.phone})?`;
  };

  return (
    <>
      {/* Floating Widget Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="ai-assistant-trigger"
          className="fixed bottom-20 lg:bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#E94E33] text-white font-bold text-xs uppercase tracking-wider shadow-lg border border-[#1A1A1A] hover:bg-[#d03d23] active:scale-95 transition-all group"
        >
          <div className="relative">
            <Bot className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white animate-ping"></span>
          </div>
          <span className="hidden sm:inline">AI Node Matrix</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white border border-[#1A1A1A] shadow-2xl flex flex-col h-[480px] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3.5 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-full bg-[#E94E33] flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div>
                <h3 className="text-xs font-serif-artistic text-white flex items-center gap-1.5">
                  Ecosystem Assistant <Sparkles className="h-3 w-3 text-[#E94E33]" />
                </h3>
                <span className="text-[9px] text-gray-300 flex items-center gap-1 font-mono uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E94E33]"></span> Online • Rev. 04
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F6] text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="h-6 w-6 border border-[#1A1A1A] bg-white flex items-center justify-center text-[#1A1A1A] shrink-0 mt-0.5">
                    <Bot className="h-3 w-3" />
                  </div>
                )}

                <div className={`max-w-[82%] px-3.5 py-2.5 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#E94E33] text-white font-medium'
                    : 'bg-white text-[#1A1A1A] border border-gray-200'
                }`}>
                  <p>{msg.text}</p>
                  <span className={`text-[8px] font-mono block text-right mt-1 opacity-70 ${msg.sender === 'user' ? 'text-white' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="h-6 w-6 border border-[#1A1A1A] bg-[#1A1A1A] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#E94E33] text-xs font-mono uppercase tracking-widest font-bold">
                <Bot className="h-3.5 w-3.5 animate-bounce" />
                <span>Processing Node Query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 bg-white border-t border-gray-200 flex gap-1.5 overflow-x-auto text-[9px] uppercase tracking-wider font-bold">
            {['Pricing rates?', 'Tech Stack?', 'Book call', 'Location?'].map((sug) => (
              <button
                key={sug}
                onClick={() => {
                  setInput(sug);
                }}
                className="px-2.5 py-1 bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#E94E33] hover:text-white border border-gray-300 shrink-0 transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-[#1A1A1A] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query ecosystem matrix..."
              className="flex-1 px-3 py-1.5 bg-[#FAF9F6] border border-gray-300 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#1A1A1A] text-white hover:bg-[#E94E33] transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
