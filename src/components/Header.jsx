import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Shield } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'HOME' },
  { href: '#about', num: '01', label: 'PROFILE' },
  { href: '#experience', num: '02', label: 'EXPERIENCE' },
  { href: '#skills', num: '03', label: 'TOOLBOX' },
  { href: '#projects', num: '04', label: 'WORKS' },
  { href: '#architecture', num: '05', label: 'SYSTEMS' },
  { href: '#pipeline', num: '06', label: 'PIPELINE' },
  { href: '#contact', num: '07', label: 'CONTACT' },
];

export default function Header({ onOpenAdmin }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const link of NAV_LINKS) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="dossier-header"
        className="sticky top-0 z-50 bg-[#F5F4F1]/95 backdrop-blur-md border-b border-[#D8D8D5] transition-all"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Left: Dossier Classification & Identity Tag */}
          <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <a href="#home" className="flex items-center gap-2 group text-decoration-none shrink-0 whitespace-nowrap">
              <span className="w-2.5 h-2.5 bg-[#8F1D25] inline-block transition-transform group-hover:rotate-45 shrink-0" />
              <span className="font-mono-tech text-xs font-bold tracking-widest text-[#111111] uppercase group-hover:text-[#8F1D25] transition-colors whitespace-nowrap">
                SAMIUM // SB-2026
              </span>
            </a>
            <span className="hidden 2xl:inline-block font-mono-tech text-[0.65rem] text-[#747474] border-l border-[#D8D8D5] pl-3 whitespace-nowrap shrink-0">
              [ CLASSIFIED: LEVEL-01 ]
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 whitespace-nowrap shrink-0" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`editorial-nav-link whitespace-nowrap px-1.5 xl:px-2.5 py-1 text-[0.72rem] xl:text-xs font-semibold ${isActive ? 'active' : ''}`}
                >
                  {link.num && (
                    <span className="text-[#8F1D25] mr-1 opacity-90 text-[0.68rem]">
                      {link.num}
                    </span>
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Status Pill, CV Download & Quick Action */}
          <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">

            {/* Direct CV Download Button */}
            <a
              href="./Samium_Bashir_Badhan_CV.pdf"
              download="Samium_Bashir_Badhan_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-outline btn-editorial-sm hidden sm:inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              title="Download Samium Bashir Badhan's Official CV (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-[#8F1D25] shrink-0" />
              <span className="whitespace-nowrap">CV / RESUME</span>
            </a>

            {/* Admin Panel Trigger */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="btn-editorial-primary btn-editorial-sm hidden md:inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer text-xs"
                title="Open Portfolio CMS & Admin Panel (PIN: 2026)"
              >
                <Shield className="w-3.5 h-3.5 text-[#F5F4F1] shrink-0" />
                <span className="whitespace-nowrap">ADMIN</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 border border-[#D8D8D5] bg-[#ECECE6] text-[#111111] hover:border-[#8F1D25] focus:outline-none shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#111111]/95 backdrop-blur-lg z-50 flex flex-col justify-between p-8 text-[#F5F4F1]">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
            <span className="font-mono-tech text-xs text-[#8F1D25] tracking-widest font-bold">
              // DOSSIER INDEX
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F5F4F1] hover:text-[#8F1D25] font-mono-tech text-sm flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" /> CLOSE
            </button>
          </div>

          <nav className="flex flex-col gap-4 my-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif-display text-2xl font-bold hover:text-[#8F1D25] transition-colors flex items-center gap-3"
              >
                {link.num && (
                  <span className="font-mono-tech text-xs text-[#8F1D25]">
                    {link.num} //
                  </span>
                )}
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-[#2A2A2A] pt-4 space-y-3">
            <a
              href="./Samium_Bashir_Badhan_CV.pdf"
              download="Samium_Bashir_Badhan_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full btn-editorial-primary text-center flex items-center justify-center gap-2 py-3"
            >
              <Download className="w-4 h-4" /> DOWNLOAD CV / RESUME (PDF)
            </a>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full btn-editorial-outline text-center flex items-center justify-center gap-2 py-2.5 text-xs text-[#F5F4F1] border-[#333333] cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#8F1D25]" /> ADMIN PANEL // CMS
              </button>
            )}

            <div className="flex flex-col gap-1 font-mono-tech text-[0.65rem] text-[#747474]">
              <span>SAMIUM BASHIR BADHAN // DHAKA, BANGLADESH</span>
              <span>LAT: 23.8103° N // LON: 90.4125° E</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
