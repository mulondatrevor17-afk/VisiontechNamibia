import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, COMPANY_INFO } from '../data/mockData';
import { Project } from '../types';
import { Eye, ArrowRight, ExternalLink } from 'lucide-react';
import { Futuristic3DCanvasHero } from '../components/3D/Futuristic3DCanvasHero';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/Motion/ScrollReveal';
import { PortfolioSkeleton } from '../components/Skeleton/SkeletonLoader';
import { usePageMetadata } from '../hooks/usePageMetadata';

interface PortfolioPageProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onSelectProject }) => {
  usePageMetadata(
    'Web Design Portfolio & Case Studies | VisionTech Namibia',
    'Browse 10 live websites and digital platforms built by VisionTech Namibia, including e-commerce storefronts, commercial portals, auto showrooms, and school websites.',
    { path: '/portfolio', keywords: 'web design portfolio Namibia, websites built in Windhoek, Namibian web developer projects' }
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load simulation for ultra smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  const categories = ['All', 'Web Apps', 'E-Commerce', 'UI/UX Design'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 3D Canvas Hero Header */}
      <Futuristic3DCanvasHero
        variant="constellation"
        badgeText="FEATURED WORKS & CASE STUDIES"
        title="Our Digital Masterpieces"
        subtitle="Real websites & digital web platforms built for Namibian businesses. Every system is custom-crafted with precision performance."
        heightClassName="min-h-[340px]"
      >
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center max-w-md">
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#38bdf8]">{PROJECTS_DATA.length}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Projects Built</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#38bdf8]">{COMPANY_INFO.stats.yearsExperience}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Experience</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">100%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Dedication</div>
          </div>
        </div>
      </Futuristic3DCanvasHero>

      {/* Filter Category Tabs */}
      <ScrollReveal direction="up" distance={15}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'pill-btn-active' : 'pill-btn'}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Portfolio Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <div
                  onClick={() => onSelectProject(project)}
                  className={`cursor-pointer group bg-[#161822] border border-white/10 rounded-2xl hover:border-[#38bdf8]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg h-full ${project.variant === 'showcase' ? 'lg:col-span-2' : ''}`}
                >
                  {/* Screenshot & Category */}
                  <div className={`relative overflow-hidden ${project.variant === 'showcase' ? 'h-72' : 'h-52'} bg-[#090a0f]`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#090a0f]/80 backdrop-blur-md text-[#38bdf8] border border-white/10 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-[#090a0f]/80 hover:bg-[#38bdf8] hover:text-black backdrop-blur-md text-slate-200 border border-white/10 rounded-full transition-colors flex items-center gap-1 shadow-md"
                        title="Open live website in new tab"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${project.variant === 'showcase' ? 'text-[#D4A017]' : 'text-white'} group-hover:text-[#38bdf8] transition-colors`}>
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        View Case Study <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <Eye className="h-4 w-4 text-slate-400 group-hover:text-[#38bdf8]" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

      {/* CTA */}
      <ScrollReveal scale={0.96} distance={30}>
        <div className="p-8 sm:p-12 text-center bg-[#12141c] border border-white/10 rounded-3xl text-white shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Ready to Be Our Next Project?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Let's create something amazing together. Your vision, our expertise.
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
