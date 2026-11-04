import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, Database, Cloud, ArrowDown, ChevronRight } from 'lucide-react';

const TIERS = [
  {
    step: 'TIER 01',
    name: 'CLIENT UI & DESIGN SYSTEM',
    icon: Layers,
    tech: 'React 19 · Next.js · Tailwind CSS · Radix UI · GSAP',
    summary: 'Editorial layout engines, accessible primitive compositions, zero-CLS image loading, and micro-animations.',
    details: [
      'Declarative React 19 component trees with atomic design patterns',
      'Tailwind CSS design token system guaranteeing unified spacing and typography',
      'GSAP ScrollTrigger and Framer Motion orchestrating hardware-accelerated transforms',
      'Radix UI primitives ensuring strict WAI-ARIA compliant accessibility',
    ],
  },
  {
    step: 'TIER 02',
    name: 'STATE & RUNTIME INTEGRITY',
    icon: Cpu,
    tech: 'React 19 Hooks · Zod Schemas · React Hook Form',
    summary: 'Strict input sanitization, automated client-side validation schemas, and optimistic UI transitions.',
    details: [
      'React 19 optimistic updates and useTransition managing responsive feedback',
      'Zod schemas shared between client forms and backend API handlers',
      'React Hook Form providing lightweight, uncontrolled inputs with zero re-render waste',
      'Client-side error boundaries preventing cascading application failure',
    ],
  },
  {
    step: 'TIER 03',
    name: 'EDGE ROUTING & AUTH SHIELD',
    icon: ShieldCheck,
    tech: 'Next.js Middleware · Jose JWT · Better-Auth · RBAC',
    summary: 'Cryptographic session validation, multi-role access gates, and HttpOnly secure cookie issuance.',
    details: [
      'Next.js Edge Middleware intercepting requests before reaching application logic',
      'Jose and JWT signature verification with cryptographic salt rotations',
      'Better-Auth session revocation and secure credential hashing with BcryptJS',
      'Multi-tenant RBAC segregating Admin, Doctor, Staff, and Client privileges',
    ],
  },
  {
    step: 'TIER 04',
    name: 'API SERVICES & ASYNC WORKERS',
    icon: Cloud,
    tech: 'Node.js · Express.js · BullMQ · Nodemailer · Cloudinary',
    summary: 'High-concurrency API controllers, background job queues for transactional emails, and media pipelines.',
    details: [
      'Express.js and Next.js Server Actions delivering sub-50ms REST query responses',
      'BullMQ and Redis managing distributed asynchronous queues for order receipts and alerts',
      'Nodemailer dispatchers transmitting secure HTML receipts and verification links',
      'Cloudinary signed upload APIs with automatic image compression and CDN routing',
    ],
  },
  {
    step: 'TIER 05',
    name: 'PERSISTENCE & CACHING LAYER',
    icon: Database,
    tech: 'MongoDB Atlas · Mongoose ODM · Redis (ioredis) · In-Memory DB',
    summary: 'Indexed document persistence, in-memory caching for real-time reads, and zero-config in-memory fallback.',
    details: [
      'MongoDB Atlas clusters with indexed queries and aggregation pipelines',
      'Mongoose schemas enforcing strict database-level validation',
      'Redis (ioredis) cache layer reducing database load on high-traffic notice queries',
      'Dual-mode database architecture with automated in-memory MongoDB fallback for offline execution',
    ],
  },
];

export default function Blueprint() {
  const [selectedTier, setSelectedTier] = useState(0);

  const active = TIERS[selectedTier];

  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-[#D8D8D5] relative bg-[#111111] text-[#F5F4F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono-tech text-xs text-[#8F1D25] tracking-widest font-bold mb-3 flex items-center gap-2">
            <span>05 // ARCHITECTURAL BLUEPRINT</span>
            <span className="w-12 h-[1px] bg-[#333333]" />
            <span className="text-[#747474]">SPEC: FULL-STACK PIPELINE</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            END-TO-END DATA FLOW &amp;
            <br />
            <span className="text-[#8F1D25]">5-TIER SYSTEM ARCHITECTURE</span>
          </h2>
          <p className="font-mono-tech text-xs text-[#888888] mt-3 max-w-2xl">
            Interactive visualization of how user interactions travel from client interfaces,
            through security gateways and async queue workers, to persistent distributed data stores.
          </p>
        </div>

        {/* Blueprint Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 5 Tiers Clickable Diagram (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {TIERS.map((tier, idx) => {
              const isSelected = selectedTier === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedTier(idx)}
                  className={`p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#1D1D1D] border-[#8F1D25] shadow-lg translate-x-2'
                      : 'bg-[#181818] border-[#2A2A2A] hover:border-[#444444]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <tier.icon className={`w-5 h-5 ${isSelected ? 'text-[#8F1D25]' : 'text-[#747474]'}`} />
                      <span className="font-mono-tech text-xs font-bold text-[#8F1D25]">
                        {tier.step} //
                      </span>
                      <h3 className="font-mono-tech text-sm font-bold text-white tracking-wider">
                        {tier.name}
                      </h3>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#8F1D25]' : 'text-[#555555]'}`} />
                  </div>

                  <p className="font-mono-tech text-xs text-[#8F1D25]/90 mb-2">
                    STACK: {tier.tech}
                  </p>
                  <p className="font-sans-ui text-xs text-[#AAAAAA]">
                    {tier.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Tier Specification Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#181818] border border-[#2A2A2A] p-6 sm:p-7 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-5">
              <span className="font-mono-tech text-xs text-[#8F1D25] font-bold">
                {active.step} DEEP INSPECTION
              </span>
              <span className="font-mono-tech text-[0.65rem] text-[#666666]">
                SECURITY LEVEL: HIGH
              </span>
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-white mb-2">
              {active.name}
            </h3>

            <div className="bg-[#111111] p-3 border border-[#2A2A2A] mb-5 font-mono-tech text-xs text-white">
              <span className="text-[#8F1D25] block mb-1 font-bold">// DEPLOYED TECHNOLOGIES</span>
              {active.tech}
            </div>

            <div className="space-y-3 mb-6">
              <span className="font-mono-tech text-xs text-[#747474] uppercase block">
                ARCHITECTURAL SPECIFICATIONS:
              </span>
              {active.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs font-sans-ui text-[#DDDDDD]">
                  <span className="w-1.5 h-1.5 bg-[#8F1D25] rounded-full mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between font-mono-tech text-xs text-[#747474]">
              <span>TIER STATUS: FULLY INTEGRATED</span>
              <span className="text-[#8F1D25]">0{selectedTier + 1} / 05</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

