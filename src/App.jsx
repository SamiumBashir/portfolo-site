import React, { useState, useEffect } from 'react';
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
import AdminPanel from './components/AdminPanel';
import { PortfolioDataProvider } from './context/PortfolioDataContext';

function PortfolioApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash for #admin or ?admin=true
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };

    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  // Keyboard shortcut: Alt+A or Ctrl+Shift+A opens Admin Panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, null, ' ');
    }
  };

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
        <Hero />
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

      {/* Full-Featured Admin Panel & Portfolio CMS (Upload, Edit, Delete, Telemetry) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
      />

      {/* Telemetry Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioDataProvider>
      <PortfolioApp />
    </PortfolioDataProvider>
  );
}
