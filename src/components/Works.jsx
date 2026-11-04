import React, { useState, useMemo } from 'react';
import { projects, filterCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Filter } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Works() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    return projects.filter((p) => p.filterCategory === selectedFilter);
  }, [selectedFilter]);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="section-marker mb-3">04 // SELECTED ARCHITECTURAL WORKS</div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-heading-large">
                FEATURED FULL-STACK
                <br />
                <span className="text-[#8F1D25]">SYSTEM PLATFORMS</span>
              </h2>
              <p className="font-mono-tech text-xs text-[#747474] mt-2 max-w-xl">
                Curated portfolio of production applications engineered with comprehensive
                <strong> production-grade Authentication, robust Backend APIs, and high-precision React 19 client architectures</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono-tech text-xs text-[#747474]">
                SHOWING {filteredProjects.length} OF {projects.length} SYSTEMS
              </span>
            </div>
          </div>
        </div>

        {/* Filter Matrix Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#D8D8D5]">
          <div className="flex items-center gap-1.5 font-mono-tech text-xs text-[#747474] mr-2">
            <Filter className="w-3.5 h-3.5 text-[#8F1D25]" />
            <span>FILTER MATRIX:</span>
          </div>

          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`filter-tab-editorial ${isActive ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </div>

        {/* Bottom Callout & GitHub Explorer */}
        <div className="mt-12 p-6 bg-[#ECECE6] border border-[#D8D8D5] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-serif-display text-xl font-bold text-[#111111]">
              Seeking specific architectural implementations?
            </h4>
            <p className="font-sans-ui text-xs text-[#747474] mt-1">
              Explore 60+ repositories across React 19, Next.js App Router, Docker, Chrome Extensions, and utility microservices.
            </p>
          </div>

          <a
            href="https://github.com/SamiumBashir?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-primary btn-editorial-sm"
          >
            VIEW FULL REPOSITORY ARCHIVE <GithubIcon className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
