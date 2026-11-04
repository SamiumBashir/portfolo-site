import React from 'react';
import { ExternalLink, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, onSelect }) {
  return (
    <article className="project-poster-card flex flex-col justify-between group">
      <div>
        {/* Card Header Bar */}
        <div className="flex items-center justify-between p-3.5 border-b border-[#D8D8D5] font-mono-tech text-xs bg-[#F5F4F1]">
          <div className="flex items-center gap-2">
            <span className="text-[#8F1D25] font-bold">
              PROJ // {project.number}
            </span>
            <span className="text-[#D8D8D5]">|</span>
            <span className="text-[#747474] text-[0.65rem] truncate max-w-[150px] sm:max-w-none">
              {project.category}
            </span>
          </div>
          <span className="dossier-tag-neutral text-[0.6rem] uppercase tracking-wider">
            {project.status.includes('PRODUCTION') || project.status.includes('DEPLOYED')
              ? 'PRODUCTION'
              : 'ACTIVE'}
          </span>
        </div>

        {/* Thumbnail Frame */}
        <div className="project-thumb-frame relative">
          <img
            src={project.image}
            alt={project.title}
            className="project-thumb"
            onError={(e) => {
              e.currentTarget.src = './Image/image.png';
            }}
          />
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            <span className="bg-[#111111]/85 backdrop-blur-sm text-[#F5F4F1] font-mono-tech text-[0.65rem] px-2 py-0.5 border border-[#444444] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#8F1D25]" /> AUTH READY
            </span>
            <span className="bg-[#111111]/85 backdrop-blur-sm text-[#F5F4F1] font-mono-tech text-[0.65rem] px-2 py-0.5 border border-[#444444] flex items-center gap-1">
              <Database className="w-3 h-3 text-[#8F1D25]" /> BACKEND READY
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6">
          <div className="mb-3">
            <h3 className="font-serif-display text-2xl font-bold text-[#111111] group-hover:text-[#8F1D25] transition-colors">
              {project.title}
            </h3>
            <p className="font-mono-tech text-xs text-[#747474] font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <p className="font-sans-ui text-sm text-[#4A4A46] leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Highlight Callout */}
          <div className="bg-[#F5F4F1] border-l-2 border-[#8F1D25] p-2.5 mb-4 font-mono-tech text-xs text-[#333330]">
            <span className="text-[#8F1D25] font-bold block mb-0.5 text-[0.65rem]">
              ARCHITECTURE HIGHLIGHT //
            </span>
            {project.highlight}
          </div>

          {/* Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="font-mono-tech text-[0.65rem] px-2 py-0.5 bg-white border border-[#D8D8D5] text-[#111111]"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 6 && (
              <span className="font-mono-tech text-[0.65rem] px-1.5 py-0.5 text-[#747474]">
                +{project.stack.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 border-t border-[#D8D8D5] bg-[#F5F4F1] flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onSelect(project)}
          className="btn-editorial-primary btn-editorial-sm text-xs flex items-center gap-1 cursor-pointer"
        >
          INSPECT CASE STUDY <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-[#D8D8D5] hover:border-[#111111] hover:text-[#8F1D25] transition-colors"
              title="Open Live Deployment"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 border border-[#D8D8D5] hover:border-[#111111] hover:text-[#8F1D25] transition-colors"
              title="Inspect GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
