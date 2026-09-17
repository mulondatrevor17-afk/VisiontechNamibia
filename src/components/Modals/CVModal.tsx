import React from 'react';
import { Modal } from '../ui/Modal';
import { X, Printer, Mail, MapPin, Phone, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { COMPANY_INFO, EXPERIENCE_DATA, SKILLS_DATA } from '../../data/mockData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="VisionTech Namibia CV" size="xl">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-[#E94E33]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E94E33]">System Audit / Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-[#E94E33]" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-[#FAF9F6] border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#E94E33] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CV Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif-artistic text-[#1A1A1A]">{COMPANY_INFO.founder}</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E94E33] mt-1">{COMPANY_INFO.role}</p>
            <p className="text-xs text-gray-600 mt-2 max-w-lg leading-relaxed">{COMPANY_INFO.aboutShort}</p>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-gray-800 bg-[#FAF9F6] p-4 border border-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#E94E33]" />
              <span>{COMPANY_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#E94E33]" />
              <span>{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#E94E33]" />
              <span>{COMPANY_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
            <Briefcase className="h-4 w-4 text-[#E94E33]" /> Professional Audit Matrix
          </h2>
          <div className="space-y-4">
            {EXPERIENCE_DATA.map((exp) => (
              <div key={exp.id} className="p-4 bg-white border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">{exp.role}</h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#E94E33] px-2 py-0.5">{exp.period}</span>
                </div>
                <p className="text-xs font-bold text-[#E94E33] mb-2">{exp.company} • {exp.location}</p>
                <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside mb-3">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F6] text-[#1A1A1A] border border-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="mb-8">
          <h2 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
            <Award className="h-4 w-4 text-[#E94E33]" /> Core Technical Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SKILLS_DATA.map((skill) => (
              <div key={skill.name} className="p-3 bg-[#FAF9F6] border border-gray-300 flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1A1A]">{skill.name}</span>
                <span className="text-xs font-bold text-[#E94E33]">{skill.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.25em] flex items-center gap-2 mb-3">
              <GraduationCap className="h-4 w-4 text-[#E94E33]" /> Academic Blueprint
            </h2>
            <div className="p-4 bg-[#FAF9F6] border border-gray-300 text-xs space-y-1">
              <h3 className="font-bold text-[#1A1A1A]">B.Sc. Computer Science & Software Engineering</h3>
              <p className="text-[#E94E33] font-bold">Namibia University of Science & Technology (NUST)</p>
              <p className="text-gray-500">Graduated with Distinction • 2018</p>
            </div>
          </div>

          <div>
            <h2 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.25em] flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-[#E94E33]" /> Credentials & Verification
            </h2>
            <div className="p-4 bg-[#FAF9F6] border border-gray-300 text-xs space-y-2">
              <div>
                <span className="font-bold text-[#1A1A1A]">AWS Certified Solutions Architect</span>
                <p className="text-gray-500 text-[11px]">Amazon Web Services • 2024</p>
              </div>
              <div>
                <span className="font-bold text-[#1A1A1A]">Meta Frontend Developer Professional</span>
                <p className="text-gray-500 text-[11px]">Coursera • 2023</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
  );
};
