import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Download } from 'lucide-react';

const TIMELINE_DATA = [
  {
    year: 'FEB 2026 — PRESENT',
    role: 'Full-Stack Developer',
    company: 'Bangladesh Software Solution',
    location: 'Dhaka, Bangladesh',
    type: 'PROFESSIONAL EXPERIENCE',
    description:
      'Architecting and developing responsive, production-ready web platforms with React, Node.js, Express, JavaScript, and Tailwind CSS. Implementing end-to-end features, REST API data synchronization, and clean component architectures.',
    achievements: [
      'Convert complex UI/UX requirements and Figma design systems into clean, maintainable full-stack architectures and reusable components.',
      'Implement interactive client-side functionality using JavaScript & React, integrating backend REST APIs for dynamic data synchronization.',
      'Troubleshoot and resolve UI, responsiveness, and rendering edge cases across desktop, tablet, and mobile viewports.',
      'Utilize Git and GitHub for agile team collaboration, code reviews, and interface performance optimization.',
    ],
  },
  {
    year: '2025 — 2026',
    role: 'Full-Stack & Systems Architecture Lead',
    company: 'Specialized Healthcare & E-Commerce Platforms (PhulKini, DocPresc, Apex)',
    location: 'Dhaka, Bangladesh',
    type: 'PRODUCTION DEPLOYMENTS',
    description:
      'Engineered mission-critical web applications spanning floral e-commerce with SSLCOMMERZ payments, clinical prescription generators with jsPDF and QR code authenticity stamps, and school management systems with Docker.',
    achievements: [
      'Constructed dual-mode Express/MongoDB architectures with automated in-memory database fallback for zero-configuration clinical boots.',
      'Integrated SSLCOMMERZ payment gateways, Redis caching, and Jose JWT cryptographic session management.',
      'Implemented BullMQ background queues for asynchronous transactional email notifications via Nodemailer.',
    ],
  },
  {
    year: '2024 — 2025',
    role: 'Full-Stack & Systems Developer',
    company: 'Independent Open Source & Web Engineering',
    location: 'Remote',
    type: 'UTILITY & PLATFORMS',
    description:
      'Engineered lightweight browser productivity extensions built with Chrome Manifest V3, featuring background service workers, local storage synchronization, and DOM content script controllers.',
    achievements: [
      'Developed Chrome Manifest V3 extensions with asynchronous local storage management and popup UI controllers.',
      'Architected 20+ JavaScript & React utility applications adhering strictly to WCAG accessibility and modern Web APIs.',
      'Maintained 100% Lighthouse audit benchmarks across Core Web Vitals, SEO, and layout shifts.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="section-marker mb-3">02 // OPERATIONAL CHRONICLE &amp; ROLES</div>
            <h2 className="section-heading-large">
              PROFESSIONAL JOURNEY &amp;
              <br />
              <span className="text-[#8F1D25]">PRODUCTION MILESTONES</span>
            </h2>
          </div>

          <a
            href="./Samium_Bashir_Badhan_CV.pdf"
            download="Samium_Bashir_Badhan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-editorial-primary btn-editorial-sm flex items-center gap-1.5"
            title="Download Full Verified CV (PDF)"
          >
            <Download className="w-3.5 h-3.5" /> DOWNLOAD OFFICIAL CV
          </a>
        </div>

        {/* Timeline Container */}
        <div className="space-y-10 max-w-4xl">
          {TIMELINE_DATA.map((item, index) => (
            <div key={index} className="timeline-item group">
              <div className="bg-[#ECECE6] border border-[#D8D8D5] p-6 transition-all group-hover:border-[#111111] group-hover:shadow-md">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="dossier-tag text-[0.65rem]">{item.year}</span>
                    <span className="dossier-tag-neutral text-[0.65rem]">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono-tech text-xs text-[#747474]">
                    <MapPin className="w-3.5 h-3.5 text-[#8F1D25]" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Role and Company */}
                <h3 className="font-serif-display text-2xl font-bold text-[#111111] mb-1">
                  {item.role}
                </h3>
                <p className="font-mono-tech text-xs text-[#8F1D25] font-semibold mb-4">
                  // {item.company}
                </p>

                {/* Description */}
                <p className="font-sans-ui text-sm text-[#4A4A46] leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Achievements Bullet list */}
                <div className="space-y-2 border-t border-[#D8D8D5] pt-3">
                  {item.achievements.map((ach, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-2 text-xs font-sans-ui text-[#333330]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#8F1D25] mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
