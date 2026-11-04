import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Toolbox from './components/Toolbox';
import Works from './components/Works';
import Blueprint from './components/Blueprint';
import Pipeline from './components/Pipeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingChatWidget from './components/FloatingChatWidget';
import ChatAdminDashboard from './components/ChatAdminDashboard';
import { projects } from './data/projects';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="blueprint-grid-bg text-[#111111] antialiased selection:bg-[#8F1D25] selection:text-[#F5F4F1] min-h-screen relative">
      {/* Noise Texture Overlay */}
      <div className="noise-layer" aria-hidden="true" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Top Scroll Reading Progress */}
      <ScrollProgress />

      {/* Editorial Navigation */}
      <Header onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero projectCount={projects.length} />
        <Profile />
        <Experience />
        <Toolbox />
        <Works />
        <Blueprint />
        <Pipeline />
        <Contact />
      </main>

      {/* Real-Time Floating Chat Widget (Socket.IO + AI Auto-Reply + Unread Notification) */}
      <FloatingChatWidget onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Real-Time Admin Telemetry Console */}
      <ChatAdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Telemetry Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}
