import React, { useState, useEffect } from 'react';
import { ArrowUp, Download } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const [dhakaTime, setDhakaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Dhaka
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setDhakaTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#F5F4F1] border-t border-[#2A2A2A] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-[#2A2A2A]">
          {/* Identity & Classification */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#8F1D25]" />
              <span className="font-mono-tech text-xs font-bold tracking-widest uppercase text-white">
                SAMIUM BASHIR BADHAN // DOSSIER 2026
              </span>
            </div>
            <p className="font-sans-ui text-xs text-[#888888] max-w-md">
              Full-Stack Software Engineer. Building robust backends, secure authentication layers, and disciplined, high-precision web architectures.
            </p>
          </div>

          {/* Dhaka Time & Telemetry */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-3 font-mono-tech text-xs">
            <div className="text-[#8F1D25] font-bold text-[0.65rem] mb-0.5">
              DHAKA STATION TELEMETRY //
            </div>
            <div className="text-white font-bold">{dhakaTime || '16:00:00 PM'} (BST / UTC+6)</div>
            <div className="text-[#747474] text-[0.65rem] mt-0.5">
              LAT: 23.8103° N · LON: 90.4125° E
            </div>
          </div>

          {/* Actions: Download CV & Scroll to Top */}
          <div className="flex items-center gap-3">
            <a
              href="./Samium_Bashir_Badhan_CV.pdf"
              download="Samium_Bashir_Badhan_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-primary btn-editorial-sm text-xs flex items-center gap-1.5"
              title="Download Samium Bashir Badhan's Official CV"
            >
              <Download className="w-3.5 h-3.5" /> DOWNLOAD CV
            </a>

            <button
              onClick={scrollToTop}
              className="btn-editorial-outline btn-editorial-sm text-xs text-white border-[#333333] hover:border-[#8F1D25] flex items-center gap-1 cursor-pointer"
            >
              TOP <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Footnotes */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs text-[#747474]">
          <div>
            <span>© 2026 SAMIUM BASHIR BADHAN. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              VERCEL EDGE DEPLOYED
            </span>
            <span>·</span>
            <span>SPEC: REACT 19 + VITE + TAILWIND</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
