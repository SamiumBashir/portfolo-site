import React from 'react';
import { Download, ExternalLink, Shield, Layers, Sparkles, GraduationCap } from 'lucide-react';

export default function Profile() {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-marker mb-3">01 // PROFILE &amp; IDENTITY SPECIFICATION</div>
          <h2 className="section-heading-large">
            ENGINEER IDENTITY &amp;
            <br />
            <span className="text-[#8F1D25]">FULL-STACK CRAFT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#ECECE6] p-6 border border-[#D8D8D5] border-l-4 border-l-[#8F1D25]">
              <span className="font-mono-tech text-xs text-[#8F1D25] font-bold tracking-wider block mb-2 uppercase">
                EXECUTIVE SUMMARY // CORE STATEMENT
              </span>
              <p className="font-serif-display text-xl sm:text-2xl text-[#111111] leading-relaxed">
                "Full-Stack Developer and CSIT student specializing in architecting resilient backend systems, secure authentication pipelines, and high-precision React 19 web applications."
              </p>
            </div>

            <div className="font-sans-ui text-base text-[#4A4A46] leading-relaxed space-y-4">
              <p>
                Based in Dhaka, Bangladesh, I engineer end-to-end full-stack software applications
                through disciplined system architecture, type-safe API design, distributed database schemas,
                REST API integration, and performance optimization. My experience spans full-stack e-commerce
                ecosystems, institutional management platforms, clinical diagnostic applications, and asynchronous
                task processing pipelines.
              </p>
              <p>
                I maintain a strong focus on full-stack architecture: bulletproof authentication
                (Better-Auth, Jose JWT, HttpOnly sessions), backend data integrity (MongoDB Atlas, Redis caching,
                Zod validation, Docker containerization), and an uncompromising client standard leveraging
                React 19, TypeScript, and modern Tailwind CSS.
              </p>
            </div>

            {/* Academic Credentials Box */}
            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-5">
              <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-[#8F1D25] font-bold uppercase">
                <GraduationCap className="w-4 h-4" /> FORMAL ACADEMIC CREDENTIALS
              </div>
              <h3 className="font-serif-display text-lg font-bold text-[#111111]">
                Bachelor's Degree in Computer Science &amp; Information Technology (CSIT)
              </h3>
              <p className="font-mono-tech text-xs text-[#747474] mt-0.5">
                Royal University of Dhaka — Dhaka, Bangladesh
              </p>
              <p className="font-sans-ui text-xs text-[#4A4A46] mt-2">
                <strong>Focus Areas:</strong> Data Structures &amp; Algorithms, JavaScript Programming, Web Development, Software Engineering, TypeScript, Full-Stack Architecture, and System Design.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#ECECE6] border border-[#D8D8D5] p-4">
                <Shield className="w-5 h-5 text-[#8F1D25] mb-2" />
                <h3 className="font-mono-tech font-bold text-xs uppercase mb-1 text-[#111111]">
                  AUTH &amp; SECURITY
                </h3>
                <p className="font-sans-ui text-xs text-[#747474]">
                  Cryptographic JWT, Jose, Better-Auth, BcryptJS, RBAC &amp; HttpOnly token security.
                </p>
              </div>

              <div className="bg-[#ECECE6] border border-[#D8D8D5] p-4">
                <Layers className="w-5 h-5 text-[#8F1D25] mb-2" />
                <h3 className="font-mono-tech font-bold text-xs uppercase mb-1 text-[#111111]">
                  BACKEND INTEGRITY
                </h3>
                <p className="font-sans-ui text-xs text-[#747474]">
                  MongoDB, Redis caching, BullMQ async queues, Docker orchestration &amp; REST APIs.
                </p>
              </div>

              <div className="bg-[#ECECE6] border border-[#D8D8D5] p-4">
                <Sparkles className="w-5 h-5 text-[#8F1D25] mb-2" />
                <h3 className="font-mono-tech font-bold text-xs uppercase mb-1 text-[#111111]">
                  REACT 19 FIDELITY
                </h3>
                <p className="font-sans-ui text-xs text-[#747474]">
                  Sub-millisecond state updates, micro-animations, GSAP ScrollTrigger &amp; accessible UI.
                </p>
              </div>
            </div>
          </div>

          {/* Right Parameters & Telemetry (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111] text-[#F5F4F1] p-6 border border-[#2A2A2A] shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A] mb-4">
                <span className="font-mono-tech text-xs text-[#8F1D25] font-bold tracking-widest uppercase">
                  DOSSIER SPECS // TELEMETRY
                </span>
                <span className="font-mono-tech text-[0.65rem] text-[#747474]">SYS-08933</span>
              </div>

              <div className="space-y-3.5 font-mono-tech text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">FULL NAME //</span>
                  <span className="font-bold text-white">Samium Bashir Badhan</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">PRIMARY ROLE //</span>
                  <span className="font-bold text-[#8F1D25]">Full-Stack Software Engineer</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">EDUCATION //</span>
                  <span className="font-bold text-white">B.Sc in CSIT</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">BASE COORDINATES //</span>
                  <span className="font-bold text-white">Dhaka, Bangladesh</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">CORE ENVIRONMENT //</span>
                  <span className="font-bold text-white">React 19 / Next.js / Node.js</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">DATA LAYER //</span>
                  <span className="font-bold text-white">MongoDB, Mongoose, Redis</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#222222]">
                  <span className="text-[#888888]">AUTH PROTOCOLS //</span>
                  <span className="font-bold text-white">Jose, JWT, Better-Auth, RBAC</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#888888]">AVAILABILITY //</span>
                  <span className="font-bold text-emerald-400">READY FOR CONTRACT / FULL-TIME</span>
                </div>
              </div>

              {/* CV Download / Preview Actions */}
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] space-y-2.5">
                <a
                  href="./Samium_Bashir_Badhan_CV.pdf"
                  download="Samium_Bashir_Badhan_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-editorial-primary text-center flex items-center justify-center gap-2 py-3 text-xs"
                >
                  <Download className="w-4 h-4" /> DOWNLOAD OFFICIAL CV (PDF)
                </a>

                <a
                  href="./Samium_Bashir_Badhan_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-editorial-outline text-center flex items-center justify-center gap-2 py-2.5 text-xs text-white border-[#333333] hover:border-[#8F1D25]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> PREVIEW CV IN NEW TAB
                </a>
              </div>
            </div>

            {/* Quick Badges Box */}
            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-5">
              <span className="font-mono-tech text-[0.6875rem] text-[#747474] uppercase block mb-3 font-semibold">
                CORE STRENGTHS &amp; LANGUAGES
              </span>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="dossier-tag">PIXEL-PERFECT UI</span>
                <span className="dossier-tag-neutral">CLEAN CODE</span>
                <span className="dossier-tag-neutral">CORE WEB VITALS</span>
                <span className="dossier-tag">REST APIS</span>
                <span className="dossier-tag-neutral">A11Y COMPLIANT</span>
              </div>
              <div className="font-mono-tech text-xs text-[#4A4A46] pt-2 border-t border-[#D8D8D5] flex justify-between">
                <span>LANGUAGES //</span>
                <span className="font-semibold text-[#111111]">Bangla (Native) · English (Working)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
