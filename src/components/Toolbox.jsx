import React, { useState } from 'react';
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  Container,
  Cpu,
} from 'lucide-react';

const SKILL_DOMAINS = [
  {
    id: 'client',
    number: '01',
    title: 'CLIENT & REACT 19 ARCHITECTURE',
    icon: Code2,
    description: 'Declarative component hierarchies, React 19 concurrent features, and sub-second paint times.',
    skills: [
      { name: 'React 19', level: 'ADVANCED' },
      { name: 'Next.js 15/16 (App Router)', level: 'ADVANCED' },
      { name: 'TypeScript', level: 'ADVANCED' },
      { name: 'Tailwind CSS (v3 / v4)', level: 'EXPERT' },
      { name: 'Vite & Bundlers', level: 'ADVANCED' },
      { name: 'React Hook Form', level: 'ADVANCED' },
      { name: 'Radix UI Primitives', level: 'PROFICIENT' },
    ],
  },
  {
    id: 'backend',
    number: '02',
    title: 'BACKEND & SERVICES',
    icon: Server,
    description: 'Resilient API routing, background queue workers, and server actions.',
    skills: [
      { name: 'Node.js & Express.js', level: 'ADVANCED' },
      { name: 'Next.js Server Actions', level: 'ADVANCED' },
      { name: 'REST API Design', level: 'ADVANCED' },
      { name: 'BullMQ Job Queues', level: 'PROFICIENT' },
      { name: 'Nodemailer Dispatchers', level: 'PROFICIENT' },
      { name: 'Microservices & Routing', level: 'PROFICIENT' },
    ],
  },
  {
    id: 'database',
    number: '03',
    title: 'DATABASE & IN-MEMORY CACHE',
    icon: Database,
    description: 'High-throughput document stores, distributed caching, and zero-config in-memory fallbacks.',
    skills: [
      { name: 'MongoDB & Atlas', level: 'ADVANCED' },
      { name: 'Mongoose ODM', level: 'ADVANCED' },
      { name: 'Redis (ioredis) Cache', level: 'ADVANCED' },
      { name: 'In-Memory DB Fallback', level: 'PROFICIENT' },
      { name: 'Aggregation Pipelines', level: 'PROFICIENT' },
      { name: 'Index Optimization', level: 'PROFICIENT' },
    ],
  },
  {
    id: 'security',
    number: '04',
    title: 'AUTH & PROTOCOL SECURITY',
    icon: ShieldCheck,
    description: 'Multi-tiered access control, cryptographic verification, and hardened cookie storage.',
    skills: [
      { name: 'JWT & Jose Tokenization', level: 'EXPERT' },
      { name: 'Better-Auth Framework', level: 'ADVANCED' },
      { name: 'Multi-Role RBAC', level: 'EXPERT' },
      { name: 'BcryptJS Salt Hashing', level: 'EXPERT' },
      { name: 'HttpOnly Secure Cookies', level: 'EXPERT' },
      { name: 'OWASP Security Standards', level: 'ADVANCED' },
    ],
  },
  {
    id: 'motion',
    number: '05',
    title: 'MOTION & INTERACTION',
    icon: Sparkles,
    description: 'Scroll-linked choreography, physical inertia, and silky-smooth micro-interactions.',
    skills: [
      { name: 'GSAP & ScrollTrigger', level: 'ADVANCED' },
      { name: 'Framer Motion', level: 'ADVANCED' },
      { name: 'Lenis Smooth Scroll', level: 'PROFICIENT' },
      { name: 'Canvas Confetti', level: 'PROFICIENT' },
      { name: 'CSS Keyframe Engineering', level: 'EXPERT' },
    ],
  },
  {
    id: 'validation',
    number: '06',
    title: 'VALIDATION & INTEGRITY',
    icon: CheckCircle,
    description: 'Runtime type validation, automated schema parsing, and strict input boundaries.',
    skills: [
      { name: 'Zod Schema Validation', level: 'EXPERT' },
      { name: 'TypeScript Static Types', level: 'ADVANCED' },
      { name: 'Input Sanitization', level: 'ADVANCED' },
      { name: 'ESLint & Prettier Rules', level: 'ADVANCED' },
    ],
  },
  {
    id: 'devops',
    number: '07',
    title: 'DEVOPS & DEPLOYMENT',
    icon: Container,
    description: 'Reproducible containerization, zero-downtime edge deployments, and CI/CD automation.',
    skills: [
      { name: 'Docker & Dockerfile', level: 'ADVANCED' },
      { name: 'Docker Compose', level: 'ADVANCED' },
      { name: 'Nginx Reverse Proxy', level: 'PROFICIENT' },
      { name: 'Vercel Edge Platform', level: 'EXPERT' },
      { name: 'Git & GitHub Workflows', level: 'ADVANCED' },
    ],
  },
  {
    id: 'integrations',
    number: '08',
    title: 'INTEGRATIONS & ENGINES',
    icon: Cpu,
    description: 'Payment gateways, signed media CDNs, vector PDF synthesis, and OCR parsing engines.',
    skills: [
      { name: 'SSLCOMMERZ Gateway', level: 'ADVANCED' },
      { name: 'Cloudinary Signed CDN', level: 'ADVANCED' },
      { name: 'jsPDF & html2canvas', level: 'ADVANCED' },
      { name: 'Tesseract.js OCR', level: 'PROFICIENT' },
      { name: 'Dynamic QR Generation', level: 'ADVANCED' },
    ],
  },
];

export default function Toolbox() {
  const [selectedDomain, setSelectedDomain] = useState('client');

  const activeData =
    SKILL_DOMAINS.find((d) => d.id === selectedDomain) || SKILL_DOMAINS[0];

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-marker mb-3">03 // TECHNICAL ARSENAL &amp; MATRIX</div>
          <h2 className="section-heading-large">
            8-DOMAIN TOOLBOX &amp;
            <br />
            <span className="text-[#8F1D25]">TECHNICAL COMPETENCIES</span>
          </h2>
        </div>

        {/* Domain Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {SKILL_DOMAINS.map((domain) => {
            const isActive = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`p-3 text-left border transition-all ${
                  isActive
                    ? 'bg-[#111111] text-[#F5F4F1] border-[#111111] shadow-md'
                    : 'bg-[#ECECE6] text-[#747474] border-[#D8D8D5] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                <span className="font-mono-tech text-[0.65rem] text-[#8F1D25] font-bold block">
                  {domain.number}
                </span>
                <span className="font-mono-tech text-[0.7rem] font-bold uppercase truncate block mt-0.5">
                  {domain.id}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Showcase Box */}
        <div className="bg-[#ECECE6] border border-[#D8D8D5] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8D8D5] mb-6">
            <div className="flex items-center gap-3">
              <activeData.icon className="w-6 h-6 text-[#8F1D25]" />
              <div>
                <span className="font-mono-tech text-xs text-[#8F1D25] font-bold tracking-widest uppercase block">
                  DOMAIN {activeData.number} // SPECIFICATION
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                  {activeData.title}
                </h3>
              </div>
            </div>
            <p className="font-sans-ui text-xs text-[#4A4A46] max-w-md">
              {activeData.description}
            </p>
          </div>

          {/* Skill Pills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeData.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-[#D8D8D5] p-4 flex items-center justify-between hover:border-[#8F1D25] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#8F1D25]" />
                  <span className="font-mono-tech text-sm font-bold text-[#111111]">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono-tech text-[0.65rem] text-[#747474] border border-[#D8D8D5] px-2 py-0.5 uppercase">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary Grid of all 8 Domains below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {SKILL_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className="bg-[#ECECE6] border border-[#D8D8D5] p-4 cursor-pointer hover:border-[#8F1D25] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-tech text-[0.65rem] text-[#8F1D25] font-bold">
                  {domain.number} //
                </span>
                <domain.icon className="w-4 h-4 text-[#747474]" />
              </div>
              <h4 className="font-mono-tech text-xs font-bold text-[#111111] uppercase mb-1">
                {domain.title}
              </h4>
              <p className="font-sans-ui text-[0.7rem] text-[#747474] line-clamp-2">
                {domain.skills.map((s) => s.name).join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

