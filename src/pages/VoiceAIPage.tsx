import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Send, Bot, User as UserIcon, RefreshCw, Zap, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const VoiceAIPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am VisionVoice, the conversational Gemini Live AI assistant for VisionTech Namibia. You can speak to me with your microphone or type a query. How can I help you build your next web application or calculate project specs today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    // Check speech recognition browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      alert("Speech recognition is not supported in your current browser session. You can still type messages!");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const data = await api.geminiChat({
        message: textToSend,
        history,
        voiceMode: isVoiceOutputEnabled,
      });
      const replyText = data.reply || "I'm sorry, I couldn't generate a response.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (isVoiceOutputEnabled) {
        speakText(replyText);
      }
    } catch (err) {
      console.error('Gemini chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I experienced a brief connection error while contacting Gemini servers. Please try again or check your network.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "What is the cost for an e-commerce platform?",
    "Explain Adam's UI/UX design process",
    "Where is VisionTech HQ in Windhoek?",
    "What tech stack do you recommend for a SaaS startup?",
    "Calculate estimate for a mobile app with Firebase backend"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5 text-[#E94E33]" />
          <span>Gemini Live Multimodal Voice Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-artistic text-[#1A1A1A]">
          VisionVoice <span className="text-[#E94E33]">Conversational Agent</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
          Speak out loud or chat directly with our AI studio agent to inquire about custom software architectures, project prices, and studio consultation.
        </p>
      </div>

      {/* Main Voice & Chat Container */}
      <div className="artistic-card p-6 sm:p-8 space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-[#E94E33] animate-ping' : 'bg-emerald-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              {isListening ? 'Voice Recording Active... Speak Now' : 'Engine Ready (Voice & Text)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isVoiceOutputEnabled) {
                  window.speechSynthesis?.cancel();
                }
                setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-bold uppercase tracking-wider transition-colors ${
                isVoiceOutputEnabled
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {isVoiceOutputEnabled ? <Volume2 className="h-3.5 w-3.5 text-[#E94E33]" /> : <VolumeX className="h-3.5 w-3.5" />}
              Speech Output: {isVoiceOutputEnabled ? 'ON' : 'MUTED'}
            </button>

            <button
              onClick={() => setMessages([messages[0]])}
              className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 hover:text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reset Session
            </button>
          </div>
        </div>

        {/* Live Audio Visualizer Stage */}
        <div className="p-6 bg-[#1A1A1A] text-white flex flex-col items-center justify-center space-y-4 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#E94E33]">
          
          <button
            onClick={toggleListening}
            className={`p-6 rounded-full border-4 transition-all duration-300 ${
              isListening
                ? 'bg-[#E94E33] border-white text-white scale-110 shadow-[0_0_20px_#E94E33]'
                : 'bg-white border-[#E94E33] text-[#1A1A1A] hover:bg-[#E94E33] hover:text-white'
            }`}
          >
            {isListening ? <Mic className="h-8 w-8 animate-bounce" /> : <MicOff className="h-8 w-8" />}
          </button>

          {/* Sound wave graphic animation */}
          {isListening && (
            <div className="flex items-center gap-1 h-8">
              <span className="w-1 bg-[#E94E33] h-full animate-pulse"></span>
              <span className="w-1 bg-white h-3/4 animate-pulse delay-75"></span>
              <span className="w-1 bg-[#E94E33] h-1/2 animate-pulse delay-150"></span>
              <span className="w-1 bg-white h-full animate-pulse delay-200"></span>
              <span className="w-1 bg-[#E94E33] h-2/3 animate-pulse delay-300"></span>
            </div>
          )}

          <p className="text-xs text-gray-300 font-mono tracking-wider">
            {isListening ? "Listening to your voice... Speak clearly" : "Click Microphone button or tap space to start speaking"}
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">Conversational Prompts</span>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 bg-[#FAF9F6] border border-gray-300 hover:border-[#1A1A1A] text-xs font-semibold text-[#1A1A1A] hover:bg-white transition-all text-left"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Messages Transcript Scroll View */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto p-4 bg-[#FAF9F6] border border-[#1A1A1A]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`h-8 w-8 shrink-0 flex items-center justify-center font-bold text-xs ${
                  isUser ? 'bg-[#1A1A1A] text-white' : 'bg-[#E94E33] text-white border border-[#1A1A1A]'
                }`}>
                  {isUser ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className={`max-w-[80%] p-4 border ${
                  isUser
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-gray-300 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between gap-4 mb-1 border-b border-gray-200/20 pb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      {isUser ? 'You' : 'VisionVoice Assistant'}
                    </span>
                    <span className="text-[9px] opacity-60 font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs font-bold text-[#E94E33]">
              <div className="h-8 w-8 bg-[#E94E33] text-white flex items-center justify-center">
                <Bot className="h-4 w-4 animate-spin" />
              </div>
              <span className="font-mono">VisionVoice is formulating Gemini response...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Text Input Box */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Or type a message to VisionVoice..."
            className="flex-1 px-4 py-3 bg-white border border-[#1A1A1A] text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#E94E33]"
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="artistic-btn px-6 flex items-center gap-2 text-xs uppercase font-bold tracking-wider"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </form>

      </div>

    </div>
  );
};
