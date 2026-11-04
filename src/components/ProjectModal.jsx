import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Shield,
  Server,
  Code2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div
      className="modal-backdrop-editorial"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="modal-content-dossier"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#D8D8D5] bg-[#ECECE6]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#8F1D25]" />
            <span className="font-mono-tech text-xs font-bold tracking-widest text-[#111111] uppercase">
              DOSSIER INSPECTION // SPEC-{project.number}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[#D8D8D5] hover:border-[#8F1D25] hover:text-[#8F1D25] transition-colors font-mono-tech text-xs flex items-center gap-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Title & Action Strip */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#D8D8D5]">
            <div className="max-w-xl">
              <span className="dossier-tag text-[0.65rem] mb-2">
                {project.category}
              </span>
              <h2
                id="modal-project-title"
                className="font-serif-display text-3xl sm:text-4xl font-black text-[#111111] uppercase"
              >
                {project.title}
              </h2>
              <p className="font-mono-tech text-sm text-[#747474] mt-1 font-medium">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial-primary btn-editorial-sm"
                >
                  LIVE PRODUCTION <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial-outline btn-editorial-sm"
                >
                  GITHUB ARCHIVE <GithubIcon className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>
          </div>

          {/* Project Media Banner */}
          <div className="relative border border-[#D8D8D5] overflow-hidden bg-[#E0E0D9] max-h-80">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover max-h-80"
              onError={(e) => {
                e.currentTarget.src = './Image/image.png';
              }}
            />
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-5">
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs font-bold text-[#8F1D25] uppercase">
                <AlertCircle className="w-4 h-4" /> PROBLEM DOMAIN
              </div>
              <p className="font-sans-ui text-sm text-[#4A4A46] leading-relaxed">
                {caseStudy?.problem || project.description}
              </p>
            </div>

            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-5">
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs font-bold text-emerald-700 uppercase">
                <CheckCircle2 className="w-4 h-4" /> ENGINEERING SOLUTION
              </div>
              <p className="font-sans-ui text-sm text-[#4A4A46] leading-relaxed">
                {caseStudy?.solution || project.highlight}
              </p>
            </div>
          </div>

          {/* 3 Pillars Architecture Breakdown: Auth, Backend, Frontend */}
          <div className="space-y-4">
            <div className="section-marker">FULL-STACK TRIAD SPECIFICATION</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Auth Spec */}
              <div className="bg-white border border-[#D8D8D5] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#8F1D25]" />
                  <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase">
                    AUTHENTICATION SPEC
                  </span>
                </div>
                <p className="font-sans-ui text-xs text-[#4A4A46] leading-relaxed">
                  {caseStudy?.authArchitecture ||
                    'Cryptographic tokenization, role-based protection, and secure cookies.'}
                </p>
              </div>

              {/* Backend Spec */}
              <div className="bg-white border border-[#D8D8D5] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-[#8F1D25]" />
                  <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase">
                    BACKEND ARCHITECTURE
                  </span>
                </div>
                <p className="font-sans-ui text-xs text-[#4A4A46] leading-relaxed">
                  {caseStudy?.backendArchitecture ||
                    'REST APIs, MongoDB document persistence, and Redis caching.'}
                </p>
              </div>

              {/* Frontend Spec */}
              <div className="bg-white border border-[#D8D8D5] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-[#8F1D25]" />
                  <span className="font-mono-tech text-xs font-bold text-[#111111] uppercase">
                    CLIENT &amp; UI ARCHITECTURE
                  </span>
                </div>
                <p className="font-sans-ui text-xs text-[#4A4A46] leading-relaxed">
                  {caseStudy?.frontendArchitecture ||
                    'React 19 client components, Tailwind styling, and TypeScript typing.'}
                </p>
              </div>
            </div>
          </div>

          {/* Key Capabilities */}
          {caseStudy?.keyFeatures && caseStudy.keyFeatures.length > 0 && (
            <div>
              <div className="section-marker mb-4">SYSTEM CAPABILITIES &amp; INTEGRATIONS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {caseStudy.keyFeatures.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 bg-[#ECECE6] border border-[#D8D8D5] flex items-start gap-2.5 text-xs font-sans-ui text-[#111111]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8F1D25] rounded-full mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Tech Stack Pills */}
          <div>
            <div className="section-marker mb-3">DEPLOYED TECHNICAL ARTIFACTS</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="font-mono-tech text-xs px-2.5 py-1 bg-white border border-[#D8D8D5] text-[#111111] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-[#D8D8D5] flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs">
            <span className="text-[#747474]">
              SPECIFICATION ARCHIVE: {project.id.toUpperCase()}-2026 // DHAKA
            </span>
            <button
              onClick={onClose}
              className="btn-editorial-primary btn-editorial-sm"
            >
              EXIT DOSSIER (ESC)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
