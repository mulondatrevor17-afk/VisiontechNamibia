import React from 'react';
import { Project } from '../../types';
import { Modal } from '../ui/Modal';
import Drawer from '../ui/Drawer';
import useMediaQuery from '../../hooks/useMediaQuery';
import { X, ExternalLink, Github, CheckCircle2, Calendar, User, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;
  const isMobile = useMediaQuery('(max-width: 640px)');

  const content = (
    <div className="relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-[#FAF9F6] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E94E33] hover:text-white transition-colors"
        aria-label="Close Project Details"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Badge & Title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider bg-[#E94E33] text-white uppercase">
          {project.status}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">• {project.category}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-serif-artistic text-[#1A1A1A] mb-2">{project.title}</h2>
      <p className="text-xs text-[#E94E33] font-bold uppercase tracking-widest mb-6">{project.subtitle}</p>

      {/* Image */}
      <div className="relative border border-gray-200 mb-6 group">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-56 sm:h-72 object-cover"
        />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 bg-[#FAF9F6] border border-gray-200 text-xs">
        <div>
          <span className="text-gray-500 flex items-center gap-1 uppercase text-[9px] tracking-wider font-bold"><Calendar className="h-3 w-3 text-[#E94E33]" /> Year</span>
          <span className="font-bold text-[#1A1A1A]">{project.year}</span>
        </div>
        <div>
          <span className="text-gray-500 flex items-center gap-1 uppercase text-[9px] tracking-wider font-bold"><User className="h-3 w-3 text-[#E94E33]" /> Client</span>
          <span className="font-bold text-[#1A1A1A]">{project.client || 'VisionTech Project'}</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-gray-500 flex items-center gap-1 uppercase text-[9px] tracking-wider font-bold"><Code2 className="h-3 w-3 text-[#E94E33]" /> Category</span>
          <span className="font-bold text-[#E94E33]">{project.category}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2">Project Overview</h3>
        <p className="text-xs text-gray-700 leading-relaxed">{project.description}</p>
      </div>

      {/* Features */}
      <div className="mb-6">
        <h3 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-3">Key Features & Architecture</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {project.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-800 p-2.5 bg-white border border-gray-200">
              <CheckCircle2 className="h-4 w-4 text-[#E94E33] shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <h3 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.frameworks.map((tech, idx) => (
            <span key={idx} className="px-3 py-1 bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider border border-[#1A1A1A]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-200">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Github className="h-4 w-4" />
            View Source Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-[#E94E33] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d03d23] transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            Launch Live Node
          </a>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer isOpen={Boolean(project)} onClose={onClose}>
        {content}
      </Drawer>
    );
  }

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose} title={project.title} size="lg">
      {content}
    </Modal>
  );
};
