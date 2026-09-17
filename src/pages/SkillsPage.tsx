import React, { useState } from 'react';
import { SKILLS_DATA, HERO_IMAGE } from '../data/mockData';
import { Layers, Sparkles, Code2, Server, Palette } from 'lucide-react';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Motion/ScrollReveal';
import { usePageMetadata } from '../hooks/usePageMetadata';

export const SkillsPage: React.FC = () => {
  usePageMetadata(
    'Tech Stack & Engineering Skills | VisionTech Namibia',
    'Explore the modern technologies powering VisionTech Namibia projects: React, Vue.js, TypeScript, Tailwind CSS, Vite, Node.js, and cloud deployments.',
    { path: '/skills', keywords: 'React developer Namibia, full stack developer Windhoek, frontend engineer Namibia' }
  );

  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Frontend', 'Backend', 'UI/UX & Design', 'Cloud & AI', 'Languages'];

  const filteredSkills = activeTab === 'All' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 3D Canvas Header Banner */}
      <Futuristic3DCanvasHero
        variant="constellation"
        badgeText="ENGINEERING STACK & TECH SPECS"
        title="Technical Skills & Expertise"
        subtitle="Full-stack architecture, modern frontend frameworks, cloud deployment pipelines, and custom UI/UX design systems."
        heightClassName="min-h-[300px]"
      />

      {/* Main Section */}
      <ScrollReveal direction="up" distance={30}>
        <div className="artistic-card p-6 sm:p-10 bg-[#12141c] border border-white/10 rounded-2xl shadow-2xl">
          
          {/* Filter Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'pill-btn-active' : 'pill-btn'}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Visual Illustration */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
              <div className="relative w-full max-w-md h-72 sm:h-80 border border-white/10 rounded-2xl overflow-hidden group bg-[#090a0f] shadow-lg">
                <img
                  src={HERO_IMAGE}
                  alt="Tech Skills Graphic"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#12141c]/90 backdrop-blur-md border border-white/10 text-left rounded-xl">
                  <span className="text-[9px] uppercase tracking-widest text-[#38bdf8] font-bold block">
                    VisionTech Stack
                  </span>
                  <span className="text-xs font-bold text-white">
                    Next-Gen Tech Integrations & Cloud Architecture
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-md text-xs">
                <div className="p-3 bg-[#161822] border border-white/10 text-white rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider text-[10px]">
                  <Code2 className="h-4 w-4 text-[#38bdf8]" />
                  <span>Clean ESM Code</span>
                </div>
                <div className="p-3 bg-[#161822] border border-white/10 text-white rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider text-[10px]">
                  <Palette className="h-4 w-4 text-[#38bdf8]" />
                  <span>Pixel UI/UX</span>
                </div>
              </div>
            </div>

            {/* Right Progress Bars Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1 border-b border-white/10 pb-3">
                <h3 className="text-2xl font-bold text-white">Technical Proficiency</h3>
                <p className="text-xs text-slate-400">Measured by hands-on production code and project delivery.</p>
              </div>

              <div className="space-y-4">
                {filteredSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 p-3.5 bg-[#161822] border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#38bdf8]"></span>
                        <span className="font-bold text-white">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">({skill.category})</span>
                      </div>
                      <span className="font-mono font-bold text-[#38bdf8]">{skill.percentage}%</span>
                    </div>

                    <div className="h-2.5 w-full bg-[#090a0f] overflow-hidden rounded-full border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-[#38bdf8] transition-all duration-1000 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-1">
                      <span>{skill.experienceYears} Years Production Exp</span>
                      <span>{skill.projectsCount}+ Projects Delivered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Additional Engineering Practices */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaggerItem>
          <div className="p-6 bg-[#12141c] border border-white/10 rounded-2xl space-y-2 h-full">
            <div className="h-10 w-10 bg-[#38bdf8] text-black font-bold flex items-center justify-center rounded-xl">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Modern Frontend Frameworks</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Expert mastery in React 19, Vue.js, Vite, and Tailwind CSS v4, delivering sub-second page loads and fluid state transitions.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-6 bg-[#12141c] border border-white/10 rounded-2xl space-y-2 h-full">
            <div className="h-10 w-10 bg-white/10 text-white flex items-center justify-center rounded-xl border border-white/10">
              <Server className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Backend & API Architecture</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Building secure Express, Node.js, and Python microservices with PostgreSQL, Firebase, and RESTful/GraphQL APIs.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="p-6 bg-[#12141c] border border-white/10 rounded-2xl space-y-2 h-full">
            <div className="h-10 w-10 bg-[#38bdf8] text-black font-bold flex items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">AI & Automation Systems</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrating Gemini API LLMs, automated workflow pipelines, and custom prompt logic into customer-facing web tools.
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>

    </div>
  );
};
