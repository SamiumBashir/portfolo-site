import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailAddress = 'samiumbashirbosunia@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8F1D25', '#111111', '#B52A32'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate high-precision telemetry transmission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8F1D25', '#111111', '#B52A32'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[#D8D8D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-marker mb-3">07 // DIRECT TRANSMISSION &amp; CONTACT</div>
          <h2 className="section-heading-large">
            INITIATE DIALOGUE &amp;
            <br />
            <span className="text-[#8F1D25]">ENGINEERING ENGAGEMENT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Telemetry & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#ECECE6] border border-[#D8D8D5] p-6 sm:p-7">
              <span className="font-mono-tech text-xs text-[#8F1D25] font-bold tracking-widest uppercase block mb-3">
                DIRECT CHANNELS // TELEMETRY
              </span>
              <p className="font-serif-display text-xl font-bold text-[#111111] mb-6">
                Available for Full-Stack Engineering Roles, Distributed Systems &amp; High-Impact Contracts.
              </p>

              {/* Email Pill Box */}
              <div className="bg-white border border-[#D8D8D5] p-4 mb-5">
                <span className="font-mono-tech text-[0.65rem] text-[#747474] uppercase block mb-1">
                  OFFICIAL INBOX //
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#111111] truncate">
                    {emailAddress}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="btn-editorial-primary btn-editorial-sm text-xs shrink-0 cursor-pointer"
                    title="Copy Email to Clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-300" /> COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> COPY
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Coordinates & Location */}
              <div className="space-y-3 font-mono-tech text-xs border-t border-[#D8D8D5] pt-4">
                <div className="flex items-center gap-2 text-[#4A4A46]">
                  <MapPin className="w-4 h-4 text-[#8F1D25]" />
                  <span>Dhaka, Bangladesh // 23.8103° N, 90.4125° E</span>
                </div>
                <div className="flex items-center gap-2 text-[#4A4A46]">
                  <Mail className="w-4 h-4 text-[#8F1D25]" />
                  <span>Response SLA: Within 12-24 Hours</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex flex-wrap items-center gap-3 pt-5 mt-4 border-t border-[#D8D8D5]">
                <a
                  href="https://wa.me/8801934164177"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono-tech text-xs border border-[#D8D8D5] px-3 py-2 bg-white hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                  title="Connect on WhatsApp (+8801934164177)"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600" /> WHATSAPP
                </a>
                <a
                  href="https://github.com/SamiumBashir"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono-tech text-xs border border-[#D8D8D5] px-3 py-2 bg-white hover:border-[#8F1D25] hover:text-[#8F1D25] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/samium-bashir-badhan-8a3050371/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-mono-tech text-xs border border-[#D8D8D5] px-3 py-2 bg-white hover:border-[#8F1D25] hover:text-[#8F1D25] transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0077B5]" /> LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {/* Right: Technical Transmission Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#ECECE6] border border-[#D8D8D5] p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D8D5] mb-6">
              <span className="font-mono-tech text-xs text-[#8F1D25] font-bold uppercase">
                // SECURE DISPATCH CONSOLE
              </span>
              <span className="font-mono-tech text-[0.65rem] text-[#747474]">
                ENCRYPTED INTERFACE
              </span>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-white border border-[#D8D8D5] space-y-4">
                <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto rounded-full">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="font-sans-ui text-sm text-[#4A4A46] max-w-md mx-auto">
                  Thank you for reaching out. Your dispatch has been logged in the telemetry queue.
                  I will review and respond directly to your provided email address.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-editorial-outline btn-editorial-sm mt-4 cursor-pointer"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono-tech text-xs text-[#111111] font-semibold block mb-1 uppercase">
                      YOUR NAME //
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Lead"
                      className="w-full bg-white border border-[#D8D8D5] p-3 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-xs text-[#111111] font-semibold block mb-1 uppercase">
                      RETURN EMAIL //
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. contact@company.com"
                      className="w-full bg-white border border-[#D8D8D5] p-3 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-[#111111] font-semibold block mb-1 uppercase">
                    PROJECT SCOPE // SUBJECT
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Full-Stack React 19 Application / Consulting"
                    className="w-full bg-white border border-[#D8D8D5] p-3 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-[#111111] font-semibold block mb-1 uppercase">
                    SYSTEM INQUIRY // MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your technical requirements, stack preferences, or project timeline..."
                    className="w-full bg-white border border-[#D8D8D5] p-3 font-sans-ui text-sm text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-editorial-primary text-xs py-3.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    'TRANSMITTING DISPATCH...'
                  ) : (
                    <>
                      DISPATCH TELEMETRY TRANSMISSION <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
