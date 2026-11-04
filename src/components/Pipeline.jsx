import React from 'react';
import { PenTool, Box, Shield, Terminal, Globe, ArrowRight } from 'lucide-react';

const PHASES = [
  {
    phase: '01',
    name: 'SPECIFICATION & DESIGN TOKENS',
    icon: PenTool,
    description:
      'Translating Figma high-fidelity artboards into atomic design tokens: exact rem spacing, editorial serif curves, and WCAG AAA color contrast ratios.',
  },
  {
    phase: '02',
    name: 'REACT 19 COMPONENT ASSEMBLY',
    icon: Box,
    description:
      'Composing declarative, type-safe React 19 components with zero hydration mismatch, atomic modularity, and accessible keyboard semantics.',
  },
  {
    phase: '03',
    name: 'AUTH GUARDS & API ENGINES',
    icon: Shield,
    description:
      'Constructing secure JWT/Jose middleware, Better-Auth workflows, Zod validation pipelines, and MongoDB database models.',
  },
  {
    phase: '04',
    name: 'DOCKER ARCHITECTURE & ISOLATION',
    icon: Terminal,
    description:
      'Packaging multi-service containers with Redis caching, Nginx reverse proxy routing, and isolated development environments.',
  },
  {
    phase: '05',
    name: 'VERCEL EDGE RELEASE & TELEMETRY',
    icon: Globe,
    description:
      'Zero-downtime deployment on Vercel Edge networks with sub-100ms global response times and continuous Core Web Vitals monitoring.',
  },
];

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-marker mb-3">06 // PIPELINE &amp; ENGINEERING LIFECYCLE</div>
          <h2 className="section-heading-large">
            DESIGN TO PRODUCTION
            <br />
            <span className="text-[#8F1D25]">5-PHASE LIFECYCLE</span>
          </h2>
        </div>

        {/* 5-Phase Horizontal Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {PHASES.map((phase, idx) => (
            <div
              key={idx}
              className="bg-[#ECECE6] border border-[#D8D8D5] p-5 flex flex-col justify-between hover:border-[#8F1D25] hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D8D5] mb-4">
                  <span className="font-mono-tech text-xs text-[#8F1D25] font-bold">
                    PHASE // {phase.phase}
                  </span>
                  <phase.icon className="w-4 h-4 text-[#747474] group-hover:text-[#8F1D25] transition-colors" />
                </div>
                <h3 className="font-mono-tech text-xs font-bold text-[#111111] uppercase mb-2">
                  {phase.name}
                </h3>
                <p className="font-sans-ui text-xs text-[#4A4A46] leading-relaxed">
                  {phase.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D8D8D5] font-mono-tech text-[0.65rem] text-[#747474] flex items-center justify-between">
                <span>GATE {idx + 1} VERIFIED</span>
                <span className="text-[#8F1D25]">✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

