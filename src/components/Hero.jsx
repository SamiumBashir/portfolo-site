import React from 'react';
import { ArrowDown, ExternalLink, ShieldCheck, Download, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Hero({ projectCount = 7 }) {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] border-b border-[#D8D8D5] relative flex flex-col justify-between py-10 lg:py-14"
    >
      {/* Top Coordinate / File ID Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D8D8D5] text-xs font-mono-tech text-[#747474]">
          <div className="flex items-center gap-3">
            <span className="text-[#8F1D25] font-bold">DOSSIER SPEC:</span>
            <span>SB-REF-08933</span>
            <span className="text-[#D8D8D5]">|</span>
            <span>EST. 2024</span>
          </div>
          <div className="flex items-center gap-4">
            <span>COORDS // 23°48'N 90°24'E</span>
            <span className="text-[#D8D8D5]">|</span>
            <span>DHAKA, BANGLADESH</span>
          </div>
        </div>
      </div>

      {/* Main Hero Composition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          {/* Left Editorial Identity Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Dossier Tag */}
            <div className="mb-4">
              <span className="dossier-tag">
                PROFILE / 001 // FULL-STACK ARCHITECTURE
              </span>
            </div>

            {/* Massive Identity Typography */}
            <h1 className="font-serif-display font-black text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight text-[#111111] uppercase mb-4">
              SAMIUM BASHIR
              <br />
              <span className="text-[#8F1D25]">BADHAN</span>
            </h1>

            {/* Sub-Identity Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#8F1D25]" />
              <span className="font-mono-tech text-sm sm:text-base font-bold tracking-wider text-[#111111] uppercase">
                FULL-STACK DEVELOPER // SYSTEM ARCHITECT
              </span>
            </div>

            {/* Technical Metadata Table Box */}
            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-5 mb-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-tech text-xs">
                <div>
                  <span className="text-[#747474] block mb-0.5">LOCATION //</span>
                  <span className="font-bold text-[#111111]">Dhaka, Bangladesh</span>
                </div>
                <div>
                  <span className="text-[#747474] block mb-0.5">EDUCATION //</span>
                  <span className="font-bold text-[#111111]">
                    B.Sc in CSIT (Royal University of Dhaka)
                  </span>
                </div>
                <div>
                  <span className="text-[#747474] block mb-0.5">PRIMARY STACK //</span>
                  <span className="font-bold text-[#8F1D25]">
                    React 19 · Next.js · Node · MongoDB · Redis
                  </span>
                </div>
                <div>
                  <span className="text-[#747474] block mb-0.5">DISCIPLINE STATUS //</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
                    Open for Full-Stack Roles &amp; Contracts
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Statement / Quote */}
            <div className="pl-4 border-l-2 border-[#8F1D25] mb-8">
              <p className="font-serif-display italic text-lg sm:text-xl text-[#333330] leading-relaxed">
                "Architecting end-to-end full-stack applications with bulletproof authentication, clean database pipelines, and high-precision React 19 interfaces."
              </p>
            </div>

            {/* CTAs and Barcode Element */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary CV Download Button */}
              <a
                href="./Samium_Bashir_Badhan_CV.pdf"
                download="Samium_Bashir_Badhan_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-primary"
                title="Download Samium Bashir Badhan's Complete 2-Page CV"
              >
                DOWNLOAD CV / RESUME <Download className="w-4 h-4 ml-1" />
              </a>

              <a href="#projects" className="btn-editorial-outline">
                EXPLORE WORKS <ArrowDown className="w-4 h-4 ml-1" />
              </a>

              <a
                href="https://github.com/SamiumBashir"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-outline"
                title="Inspect GitHub Profile"
              >
                GITHUB <GithubIcon className="w-4 h-4 ml-1" />
              </a>

              {/* Barcode Graphic */}
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-[#D8D8D5]">
                <div className="barcode-element" aria-hidden="true">
                  <div className="barcode-bar w-[2px]" />
                  <div className="barcode-bar w-[1px]" />
                  <div className="barcode-bar w-[3px]" />
                  <div className="barcode-bar w-[1px]" />
                  <div className="barcode-bar w-[2px]" />
                  <div className="barcode-bar w-[4px]" />
                  <div className="barcode-bar w-[1px]" />
                  <div className="barcode-bar w-[3px]" />
                  <div className="barcode-bar w-[2px]" />
                </div>
                <span className="font-mono-tech text-[0.65rem] text-[#747474] tracking-tighter">
                  SPEC: SB-FS-2026
                </span>
              </div>
            </div>
          </div>

          {/* Right Architectural Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="portrait-container">
              {/* Vertical Edge Text Along Frame */}
              <div className="hidden xl:block absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono-tech text-[0.6rem] text-[#747474] tracking-widest uppercase">
                SAMIUM BASHIR // ARCHIVE 001
              </div>

              <div className="portrait-frame">
                {/* Red Corner Markings */}
                <div className="corner-bracket corner-tl" />
                <div className="corner-bracket corner-tr" />
                <div className="corner-bracket corner-bl" />
                <div className="corner-bracket corner-br" />

                {/* Frame Header Bar */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D8D8D5] font-mono-tech text-[0.65rem]">
                  <span className="text-[#8F1D25] font-bold">PORTRAIT // SPEC-01</span>
                  <span className="text-[#747474]">LAT 23.8103° N</span>
                </div>

                {/* Portrait Image */}
                <div className="portrait-img-wrap">
                  <img
                    src="./Image/image-hero.png"
                    alt="Samium Bashir Badhan - Full-Stack Developer"
                    className="portrait-img"
                    onError={(e) => {
                      e.currentTarget.src = './Image/image.png';
                    }}
                  />
                </div>

                {/* Frame Footer Annotations */}
                <div className="pt-3 mt-2 border-t border-[#D8D8D5] flex items-center justify-between font-mono-tech text-xs">
                  <div>
                    <p className="font-bold text-[#111111]">SAMIUM BASHIR BADHAN</p>
                    <p className="text-[0.65rem] text-[#747474]">FULL-STACK SOFTWARE ENGINEER</p>
                  </div>
                  <div className="text-right">
                    <span className="dossier-tag-neutral flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#8F1D25]" /> VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#ECECE6] border border-[#D8D8D5]">
          <div className="border-r border-[#D8D8D5] last:border-r-0 pr-4">
            <span className="font-mono-tech text-2xl md:text-3xl font-bold text-[#8F1D25] block">
              {String(projectCount).padStart(2, '0')}+
            </span>
            <span className="font-mono-tech text-[0.65rem] text-[#747474] tracking-wider uppercase block">
              FULL-STACK SYSTEMS
            </span>
          </div>
          <div className="border-r border-[#D8D8D5] last:border-r-0 pr-4">
            <span className="font-mono-tech text-2xl md:text-3xl font-bold text-[#111111] block">
              REACT 19
            </span>
            <span className="font-mono-tech text-[0.65rem] text-[#747474] tracking-wider uppercase block">
              CLIENT ECOSYSTEM
            </span>
          </div>
          <div className="border-r border-[#D8D8D5] last:border-r-0 pr-4">
            <span className="font-mono-tech text-2xl md:text-3xl font-bold text-[#111111] block">
              JWT &amp; RBAC
            </span>
            <span className="font-mono-tech text-[0.65rem] text-[#747474] tracking-wider uppercase block">
              SECURE AUTH LAYER
            </span>
          </div>
          <div>
            <span className="font-mono-tech text-2xl md:text-3xl font-bold text-[#8F1D25] block">
              100%
            </span>
            <span className="font-mono-tech text-[0.65rem] text-[#747474] tracking-wider uppercase block">
              VERIFIED ARCHITECTURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
