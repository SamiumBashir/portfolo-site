import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Shield,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Download,
  Upload,
  Check,
  CheckCircle2,
  Lock,
  Unlock,
  Eye,
  RefreshCw,
  Search,
  ExternalLink,
  Save,
  Layers,
  FileText,
  User,
  Bot,
  Send,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  Code2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { WhatsAppIcon, GithubIcon } from './Icons';
import {
  getStoredMessages,
  saveStoredMessages,
  getAdminState,
  saveAdminState,
  chatService,
  playNotificationChime,
  deleteCloudMessages,
  updateCloudAdminSettings,
  toggleCloudThreadAi,
} from '../services/chatEngine';

export default function AdminPanel({ isOpen, onClose }) {
  const {
    projects,
    filterCategories,
    profile,
    addProject,
    updateProject,
    deleteProject,
    updateProfile,
    resetToDefaults,
    downloadProjectsFile,
    exportFullJSON,
    importFullJSON,
  } = usePortfolioData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('samium_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'projects' | 'profile' | 'chat' | 'export'
  const [activeTab, setActiveTab] = useState('projects');

  // Project Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null); // null = new project
  const [projectForm, setProjectForm] = useState(getEmptyProjectForm());
  const [imagePreview, setImagePreview] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('all');

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Chat Telemetry State
  const [chatMessages, setChatMessages] = useState([]);
  const [adminState, setAdminState] = useState(getAdminState());
  const [disabledThreads, setDisabledThreads] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('all');
  const [chatReply, setChatReply] = useState('');
  const [chatPhoneInput, setChatPhoneInput] = useState(
    getAdminState().whatsappNumber || profile.whatsappNumber
  );
  const [chatPhoneSaved, setChatPhoneSaved] = useState(false);
  const [confirmClearChat, setConfirmClearChat] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [confirmResetDefaults, setConfirmResetDefaults] = useState(false);
  const messagesEndRef = useRef(null);

  // JSON Import Ref
  const fileInputRef = useRef(null);
  const imageUploadRef = useRef(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Keep profile form synced with context
  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  // Load chat messages and state when panel opens
  useEffect(() => {
    if (isOpen) {
      setChatMessages(getStoredMessages());
      setAdminState(getAdminState());
    }
  }, [isOpen]);

  // Subscribe to real-time chat & auto-sync from Cloud MongoDB Atlas
  useEffect(() => {
    if (!isOpen) return;

    // 1. Local event subscription (BroadcastChannel / Socket.IO)
    const unsubscribe = chatService.subscribe(({ type, payload }) => {
      if (type === 'NEW_MESSAGE') {
        setChatMessages((prev) => {
          if (prev.some((m) => m.id === payload.id)) return prev;
          const updated = [...prev, payload];
          saveStoredMessages(updated);
          return updated;
        });
        playNotificationChime();
      } else if (type === 'ADMIN_STATE_UPDATE') {
        setAdminState(payload);
      }
    });

    // 2. Continuous Cloud MongoDB Atlas Auto-Sync for Admin (Polls every 2.4s)
    const stopSync = chatService.startAutoSync({
      admin: true,
      interval: 2400,
      onUpdate: (cloudMsgs) => {
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newFromCloud = cloudMsgs.filter((m) => !existingIds.has(m.id));
          if (newFromCloud.length === 0) return prev;

          // If a new visitor message arrived, play chime
          const hasVisitorMsg = newFromCloud.some((m) => m.sender === 'user');
          if (hasVisitorMsg) {
            playNotificationChime();
          }

          const merged = [...prev, ...newFromCloud];
          saveStoredMessages(merged);
          return merged;
        });
      },
      onSettingsUpdate: (settings) => {
        if (Array.isArray(settings.disabledThreads)) {
          setDisabledThreads(settings.disabledThreads);
        }
        if (settings.aiAutoReply !== undefined) {
          setAdminState((prev) => ({ ...prev, aiAutoReply: settings.aiAutoReply }));
        }
        if (settings.isOnline !== undefined) {
          setAdminState((prev) => ({ ...prev, isOnline: settings.isOnline }));
        }
      },
    });

    return () => {
      unsubscribe();
      stopSync();
    };
  }, [isOpen]);

  // Toggle Global AI Auto-Reply and persist to Cloud
  const handleToggleGlobalAi = async () => {
    const nextVal = !adminState.aiAutoReply;
    const updated = { ...adminState, aiAutoReply: nextVal };
    setAdminState(updated);
    saveAdminState(updated);
    await updateCloudAdminSettings({ aiAutoReply: nextVal });
  };

  // Toggle Global Online Status and persist to Cloud
  const handleToggleOnlineStatus = async () => {
    const nextVal = !adminState.isOnline;
    const updated = { ...adminState, isOnline: nextVal };
    setAdminState(updated);
    saveAdminState(updated);
    await updateCloudAdminSettings({ isOnline: nextVal });
  };

  // Toggle AI Auto-Reply for a Specific Visitor Thread and persist to Cloud
  const handleToggleThreadAi = async (sessionId) => {
    if (!sessionId || sessionId === 'all') return;
    const isCurrentlyDisabled = disabledThreads.includes(sessionId);
    const willDisable = !isCurrentlyDisabled;

    // Optimistic UI state
    setDisabledThreads((prev) =>
      willDisable ? [...prev, sessionId] : prev.filter((id) => id !== sessionId)
    );

    const res = await toggleCloudThreadAi(sessionId, willDisable);
    if (res && Array.isArray(res.disabledThreads)) {
      setDisabledThreads(res.disabledThreads);
    }
  };

  // Extract distinct visitor threads
  const visitorSessions = React.useMemo(() => {
    const map = new Map();
    chatMessages.forEach((msg) => {
      const sid = msg.sessionId;
      if (!sid || sid === 'all') return;
      if (!map.has(sid)) {
        map.set(sid, {
          sessionId: sid,
          lastMessage: msg.text,
          lastTime: msg.timestamp,
          count: 1,
          hasVisitorMessage: msg.sender === 'user',
        });
      } else {
        const entry = map.get(sid);
        entry.lastMessage = msg.text;
        entry.lastTime = msg.timestamp;
        entry.count += 1;
        if (msg.sender === 'user') entry.hasVisitorMessage = true;
      }
    });
    return Array.from(map.values()).reverse();
  }, [chatMessages]);

  const displayedChatMessages = React.useMemo(() => {
    if (selectedSessionId === 'all') return chatMessages;
    return chatMessages.filter(
      (m) => m.sessionId === selectedSessionId || m.recipient === selectedSessionId
    );
  }, [chatMessages, selectedSessionId]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isEditorOpen) {
          setIsEditorOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditorOpen, isOpen, onClose]);

  // Scroll chat messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  function getEmptyProjectForm() {
    return {
      title: '',
      subtitle: '',
      category: 'Full-Stack Application',
      filterCategory: 'ecommerce',
      image: './Image/noir.jpg',
      description: '',
      stack: 'React 19, Next.js, Node.js, Express, MongoDB, Redis, JWT',
      role: 'Full-Stack Software Architecture',
      year: '2026',
      status: 'DEPLOYED // PRODUCTION',
      live: '',
      repo: '',
      highlight: '',
      overview: '',
      problem: '',
      solution: '',
      keyFeatures: '',
      authArchitecture: 'JWT with secure HttpOnly cookies, bcryptjs, and role guards.',
      backendArchitecture: 'Node.js & Express REST APIs, MongoDB Mongoose models, and Redis caching.',
      frontendArchitecture: 'React 19, TypeScript, Tailwind CSS, and state management.',
    };
  }

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const validPin = (import.meta.env.VITE_ADMIN_PIN || '2026').trim();
    if (pinInput === validPin || pinInput === 'Badhan' || pinInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('samium_admin_auth', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('samium_admin_auth');
  };

  // Open Editor for New Project
  const handleOpenNewProject = () => {
    setEditingProjectId(null);
    const emptyForm = getEmptyProjectForm();
    setProjectForm(emptyForm);
    setImagePreview(emptyForm.image);
    setIsEditorOpen(true);
  };

  // Open Editor for Existing Project
  const handleOpenEditProject = (proj) => {
    setEditingProjectId(proj.id);
    const stackStr = Array.isArray(proj.stack) ? proj.stack.join(', ') : proj.stack || '';
    const keyFeaturesStr = Array.isArray(proj.caseStudy?.keyFeatures)
      ? proj.caseStudy.keyFeatures.join('\n')
      : '';

    setProjectForm({
      title: proj.title || '',
      subtitle: proj.subtitle || '',
      category: proj.category || '',
      filterCategory: proj.filterCategory || 'ecommerce',
      image: proj.image || '',
      description: proj.description || '',
      stack: stackStr,
      role: proj.role || '',
      year: proj.year || '2026',
      status: proj.status || 'DEPLOYED // PRODUCTION',
      live: proj.live || '',
      repo: proj.repo || '',
      highlight: proj.highlight || '',
      overview: proj.caseStudy?.overview || proj.description || '',
      problem: proj.caseStudy?.problem || '',
      solution: proj.caseStudy?.solution || '',
      keyFeatures: keyFeaturesStr,
      authArchitecture: proj.caseStudy?.authArchitecture || '',
      backendArchitecture: proj.caseStudy?.backendArchitecture || '',
      frontendArchitecture: proj.caseStudy?.frontendArchitecture || '',
    });
    setImagePreview(proj.image || '');
    setIsEditorOpen(true);
  };

  // Handle Image File Upload (Convert to Base64 Data URL)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProjectForm((prev) => ({ ...prev, image: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Project (Add or Update)
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please provide a Project Title.');
      return;
    }

    const stackArray = projectForm.stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const keyFeaturesArray = projectForm.keyFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const projectPayload = {
      title: projectForm.title.trim(),
      subtitle: projectForm.subtitle.trim(),
      category: projectForm.category.trim(),
      filterCategory: projectForm.filterCategory,
      image: projectForm.image.trim() || './Image/noir.jpg',
      description: projectForm.description.trim(),
      stack: stackArray,
      role: projectForm.role.trim(),
      year: projectForm.year.trim() || '2026',
      status: projectForm.status.trim() || 'DEPLOYED // PRODUCTION',
      live: projectForm.live.trim(),
      repo: projectForm.repo.trim(),
      highlight: projectForm.highlight.trim(),
      caseStudy: {
        overview: projectForm.overview.trim() || projectForm.description.trim(),
        problem: projectForm.problem.trim(),
        solution: projectForm.solution.trim(),
        keyFeatures: keyFeaturesArray,
        authArchitecture: projectForm.authArchitecture.trim(),
        backendArchitecture: projectForm.backendArchitecture.trim(),
        frontendArchitecture: projectForm.frontendArchitecture.trim(),
      },
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectPayload);
    } else {
      addProject(projectPayload);
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8F1D25', '#111111', '#10B981'],
    });

    setIsEditorOpen(false);
  };

  // Delete Project with Non-Blocking UI Confirmation
  const handleDeleteProject = (proj) => {
    setProjectToDelete(proj);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2500);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#8F1D25', '#111111', '#D8D8D5'],
    });
  };

  // Save WhatsApp Routing Number in Chat
  const handleSaveChatPhone = (e) => {
    e.preventDefault();
    const clean = chatPhoneInput.replace(/[^0-9]/g, '');
    const updated = { ...adminState, whatsappNumber: clean };
    setAdminState(updated);
    saveAdminState(updated);
    updateProfile({ whatsappNumber: clean });
    setChatPhoneSaved(true);
    setTimeout(() => setChatPhoneSaved(false), 2500);
  };

  // Send Direct Admin Reply
  const handleSendChatReply = (e) => {
    e.preventDefault();
    if (!chatReply.trim()) return;

    const replyMsg = {
      id: 'admin_' + Date.now(),
      sender: 'admin',
      author: 'Samium Bashir Badhan (Direct)',
      text: chatReply.trim(),
      sessionId: selectedSessionId === 'all' ? 'all' : selectedSessionId,
      recipient: selectedSessionId === 'all' ? null : selectedSessionId,
      broadcast: selectedSessionId === 'all',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    const updated = [...chatMessages, replyMsg];
    setChatMessages(updated);
    saveStoredMessages(updated);
    chatService.sendMessage(replyMsg);
    setChatReply('');
  };

  // Clear chat logs locally and from Cloud MongoDB Atlas (Non-blocking)
  const executeClearChatLogs = async () => {
    setConfirmClearChat(false);
    await deleteCloudMessages(selectedSessionId);
    if (selectedSessionId === 'all') {
      localStorage.removeItem('samium_chat_messages_v2');
      setChatMessages([]);
    } else {
      const filtered = chatMessages.filter(
        (m) => m.sessionId !== selectedSessionId && m.recipient !== selectedSessionId
      );
      setChatMessages(filtered);
      saveStoredMessages(filtered);
      setSelectedSessionId('all');
    }
  };

  // Copy projects.js code
  const handleCopyCode = () => {
    const { generateProjectsCode } = usePortfolioData;
    // We can generate JSON directly
    const code = `/* ==========================================================================
   TECHNICAL DOSSIER // VERIFIED FULL-STACK PROJECTS
   AUTHOR: ${profile.name.toUpperCase()}
   ========================================================================== */

export const projects = ${JSON.stringify(projects, null, 2)};

export const filterCategories = ${JSON.stringify(filterCategories, null, 2)};
`;
    navigator.clipboard.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  // Handle JSON File Import
  const handleJSONFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const res = importFullJSON(text);
          if (res.success) {
            alert(`Successfully restored ${res.count} projects from backup!`);
          } else {
            alert('Import failed: ' + res.error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // Filtered projects list for search
  const displayedProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (Array.isArray(p.stack) && p.stack.some((s) => s.toLowerCase().includes(projectSearch.toLowerCase())));

    const matchesCat =
      selectedFilterCategory === 'all' || p.filterCategory === selectedFilterCategory;

    return matchesSearch && matchesCat;
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#F5F4F1] border-2 border-[#111111] shadow-[16px_16px_0px_rgba(0,0,0,0.9)] w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden text-[#111111] font-sans selection:bg-[#8F1D25] selection:text-[#F5F4F1]">
        {/* ===================================================================
            TOP CONTROL BAR
            =================================================================== */}
        <div className="bg-[#111111] text-[#F5F4F1] px-4 py-3 sm:px-6 flex items-center justify-between border-b border-[#2A2A2A] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#8F1D25] inline-block animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-mono-tech text-xs sm:text-sm font-bold tracking-widest uppercase text-white">
                  SAMIUM DOSSIER // CMS &amp; ADMIN PANEL
                </h1>
                <span className="hidden sm:inline-block font-mono-tech text-[0.65rem] bg-[#8F1D25] text-white px-2 py-0.5 rounded-xs">
                  AUTH: VERIFIED
                </span>
              </div>
              <p className="font-mono-tech text-[0.65rem] text-[#888888]">
                Real-Time Portfolio Content Manager · Dynamic Live Sync
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1 text-[0.7rem] font-mono-tech text-[#888888] hover:text-[#F5F4F1] border border-[#333333] hover:border-[#8F1D25] px-2.5 py-1 transition-colors cursor-pointer"
                title="Lock Admin Console"
              >
                <Lock className="w-3.5 h-3.5" /> LOCK
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 border border-[#333333] hover:border-[#8F1D25] hover:text-[#8F1D25] text-[#888888] font-mono-tech text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-4 h-4" /> <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            PIN AUTHENTICATION VIEW (If locked)
            =================================================================== */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-[#FAF9F6]">
            <div className="w-16 h-16 bg-[#ECECE6] border-2 border-[#111111] flex items-center justify-center rounded-full mb-4 shadow-[4px_4px_0px_#111111]">
              <Shield className="w-8 h-8 text-[#8F1D25]" />
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
              ADMIN VERIFICATION REQUIRED
            </h2>
            <p className="font-sans-ui text-xs text-[#747474] max-w-sm mb-6 leading-relaxed">
              Enter your private administrator security PIN to unlock the portfolio content management system and real-time telemetry.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Security PIN"
                autoFocus
                className="w-full bg-white border-2 border-[#111111] p-3 text-center font-mono-tech text-base tracking-widest focus:border-[#8F1D25] focus:outline-none shadow-[3px_3px_0px_#D8D8D5]"
              />
              {pinError && (
                <span className="font-mono-tech text-xs text-[#8F1D25] block font-bold">
                  Invalid Passcode. Please try again.
                </span>
              )}
              <button
                type="submit"
                className="w-full btn-editorial-primary text-xs py-3 flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#111111]"
              >
                <Unlock className="w-4 h-4" /> UNLOCK PORTFOLIO CMS →
              </button>
            </form>
          </div>
        ) : (
          /* ===================================================================
              AUTHENTICATED DASHBOARD VIEW
              =================================================================== */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Bar */}
            <div className="bg-[#ECECE6] border-b border-[#D8D8D5] px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0">
              <div className="flex items-center gap-1 py-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`font-mono-tech text-xs font-bold px-3 sm:px-4 py-2 border transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'projects'
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-white text-[#111111] border-[#D8D8D5] hover:border-[#8F1D25]'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#8F1D25]" />
                  <span>PROJECTS CMS ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`font-mono-tech text-xs font-bold px-3 sm:px-4 py-2 border transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'profile'
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-white text-[#111111] border-[#D8D8D5] hover:border-[#8F1D25]'
                    }`}
                >
                  <User className="w-3.5 h-3.5 text-[#8F1D25]" />
                  <span>PROFILE &amp; BIO</span>
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className={`font-mono-tech text-xs font-bold px-3 sm:px-4 py-2 border transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'chat'
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-white text-[#111111] border-[#D8D8D5] hover:border-[#8F1D25]'
                    }`}
                >
                  <Bot className="w-3.5 h-3.5 text-[#8F1D25]" />
                  <span>LIVE CHAT TELEMETRY</span>
                  {chatMessages.length > 0 && (
                    <span className="text-[0.6rem] bg-[#8F1D25] text-white px-1.5 py-0.2 rounded-full">
                      {chatMessages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('export')}
                  className={`font-mono-tech text-xs font-bold px-3 sm:px-4 py-2 border transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'export'
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-white text-[#111111] border-[#D8D8D5] hover:border-[#8F1D25]'
                    }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-[#8F1D25]" />
                  <span>GIT SYNC &amp; EXPORT</span>
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs font-mono-tech text-[#747474]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYNC: INSTANT LOCALSTORAGE</span>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF9F6]">
              {/* ---------------------------------------------------------------
                  TAB 1: PROJECTS CMS
                  --------------------------------------------------------------- */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Action Strip: Search, Filter, and Add Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#D8D8D5] p-4 shadow-xs">
                    <div className="flex flex-wrap items-center gap-2 flex-1 max-w-md">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="w-4 h-4 text-[#747474] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={projectSearch}
                          onChange={(e) => setProjectSearch(e.target.value)}
                          placeholder="Search systems by title or stack..."
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] pl-9 pr-3 py-1.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>

                      <select
                        value={selectedFilterCategory}
                        onChange={(e) => setSelectedFilterCategory(e.target.value)}
                        className="bg-[#F5F4F1] border border-[#D8D8D5] px-2.5 py-1.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Categories</option>
                        {filterCategories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleOpenNewProject}
                      className="btn-editorial-primary btn-editorial-sm flex items-center gap-1.5 cursor-pointer shadow-sm text-xs py-2 px-4"
                    >
                      <Plus className="w-4 h-4" /> ADD NEW PROJECT
                    </button>
                  </div>

                  {/* Projects Table / Card Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-white border-2 border-[#111111] p-4 shadow-[4px_4px_0px_#111111] flex flex-col justify-between hover:shadow-[6px_6px_0px_#8F1D25] transition-all group"
                      >
                        <div>
                          {/* Image Thumbnail */}
                          <div className="w-full h-36 bg-[#ECECE6] border border-[#D8D8D5] overflow-hidden mb-3 relative">
                            <img
                              src={proj.image || './Image/noir.jpg'}
                              alt={proj.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = './Image/noir.jpg';
                              }}
                            />
                            <span className="absolute top-2 left-2 bg-[#111111] text-[#F5F4F1] font-mono-tech text-[0.65rem] px-2 py-0.5 font-bold">
                              SPEC-{proj.number}
                            </span>
                            <span className="absolute bottom-2 right-2 bg-white/95 border border-[#D8D8D5] font-mono-tech text-[0.6rem] px-1.5 py-0.5 text-[#8F1D25] font-bold">
                              {proj.year || '2026'}
                            </span>
                          </div>

                          {/* Info */}
                          <h3 className="font-serif-display text-lg font-bold text-[#111111] group-hover:text-[#8F1D25] transition-colors line-clamp-1">
                            {proj.title}
                          </h3>
                          <p className="font-mono-tech text-[0.68rem] text-[#747474] uppercase line-clamp-1 mb-2">
                            {proj.category}
                          </p>
                          <p className="font-sans-ui text-xs text-[#4A4A46] line-clamp-2 leading-relaxed mb-3">
                            {proj.description}
                          </p>

                          {/* Stack Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(Array.isArray(proj.stack) ? proj.stack : []).slice(0, 4).map((tech, idx) => (
                              <span
                                key={idx}
                                className="font-mono-tech text-[0.62rem] bg-[#F5F4F1] border border-[#D8D8D5] px-1.5 py-0.5 text-[#111111]"
                              >
                                {tech}
                              </span>
                            ))}
                            {(proj.stack?.length || 0) > 4 && (
                              <span className="font-mono-tech text-[0.62rem] text-[#747474] self-center">
                                +{(proj.stack?.length || 0) - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-[#D8D8D5] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {proj.live && (
                              <a
                                href={proj.live}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 border border-[#D8D8D5] hover:border-[#8F1D25] text-[#747474] hover:text-[#8F1D25] transition-colors"
                                title="Open Live Site"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {proj.repo && (
                              <a
                                href={proj.repo}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 border border-[#D8D8D5] hover:border-[#8F1D25] text-[#747474] hover:text-[#8F1D25] transition-colors"
                                title="Open GitHub Repo"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProject(proj)}
                              className="font-mono-tech text-xs bg-[#111111] hover:bg-[#8F1D25] text-white px-3 py-1 flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" /> EDIT
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj)}
                              className="p-1 text-red-700 hover:text-red-900 border border-transparent hover:border-red-400 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  TAB 2: PROFILE & BIO CMS
                  --------------------------------------------------------------- */}
              {activeTab === 'profile' && (
                <div className="max-w-4xl mx-auto bg-white border-2 border-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_#111111]">
                  <div className="flex items-center justify-between border-b border-[#D8D8D5] pb-4 mb-6">
                    <div>
                      <h3 className="font-serif-display text-xl font-bold text-[#111111]">
                        PROFILE &amp; IDENTITY SPECIFICATION
                      </h3>
                      <p className="font-mono-tech text-xs text-[#747474]">
                        Update headline telemetry, developer biography, and direct credentials.
                      </p>
                    </div>

                    {profileSavedToast && (
                      <span className="font-mono-tech text-xs text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> SAVED SUCCESSFULLY
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          FULL NAME //
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          PROFESSIONAL TITLE //
                        </label>
                        <input
                          type="text"
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                        EXECUTIVE STATEMENT // SUMMARY
                      </label>
                      <textarea
                        rows={2}
                        value={profileForm.summary}
                        onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                        className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-serif-display text-sm text-[#111111] focus:border-[#8F1D25] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          BIOGRAPHY PARAGRAPH 1 //
                        </label>
                        <textarea
                          rows={4}
                          value={profileForm.bio1}
                          onChange={(e) => setProfileForm({ ...profileForm, bio1: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          BIOGRAPHY PARAGRAPH 2 //
                        </label>
                        <textarea
                          rows={4}
                          value={profileForm.bio2}
                          onChange={(e) => setProfileForm({ ...profileForm, bio2: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          EMAIL ADDRESS //
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          WHATSAPP NUMBER //
                        </label>
                        <input
                          type="text"
                          value={profileForm.whatsappNumber}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, whatsappNumber: e.target.value })
                          }
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                          LOCATION //
                        </label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        className="btn-editorial-primary text-xs py-3 px-6 flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Save className="w-4 h-4" /> SAVE PROFILE CHANGES
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  TAB 3: LIVE CHAT TELEMETRY & CLOUD INBOX
                  --------------------------------------------------------------- */}
              {activeTab === 'chat' && (
                <div className="flex-1 flex flex-col md:flex-row gap-5 max-w-6xl mx-auto h-[74vh]">
                  {/* Left Controls & Visitor Threads Panel */}
                  <div className="md:w-80 bg-white border border-[#D8D8D5] p-4 flex flex-col justify-between shrink-0 overflow-y-auto shadow-xs">
                    <div className="space-y-4">
                      <div className="border-b border-[#D8D8D5] pb-3 flex items-center justify-between">
                        <div>
                          <span className="font-mono-tech text-[0.65rem] text-[#8F1D25] font-bold uppercase block mb-1">
                            TELEMETRY CONTROLS //
                          </span>
                          <h4 className="font-serif-display text-base font-bold text-[#111111]">
                            Cloud Inbox &amp; AI
                          </h4>
                        </div>
                        <span className="font-mono-tech text-[0.6rem] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">
                          CLOUD SYNC
                        </span>
                      </div>

                      {/* Online/Offline Toggle */}
                      <div className="bg-[#FAF9F6] border border-[#D8D8D5] p-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tech text-xs font-bold text-[#111111]">
                            ACTIVE STATUS
                          </span>
                          <button
                            onClick={handleToggleOnlineStatus}
                            className={`font-mono-tech text-[0.65rem] px-2.5 py-1 border font-bold uppercase cursor-pointer ${adminState.isOnline
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                              }`}
                          >
                            {adminState.isOnline ? '● ONLINE' : '○ OFFLINE'}
                          </button>
                        </div>
                        <p className="font-sans-ui text-[0.68rem] text-[#747474]">
                          {adminState.isOnline
                            ? 'Visitors see you active with a pulsing green indicator.'
                            : 'Visitors see you away; AI assistant responds.'}
                        </p>
                      </div>

                      {/* Global AI Auto-Reply Toggle */}
                      <div className="bg-[#FAF9F6] border border-[#D8D8D5] p-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tech text-xs font-bold text-[#111111] flex items-center gap-1">
                            <Bot className="w-3 h-3 text-[#8F1D25]" /> GLOBAL AI AUTO-REPLY
                          </span>
                          <button
                            onClick={handleToggleGlobalAi}
                            className={`font-mono-tech text-[0.65rem] px-2.5 py-1 border font-bold uppercase cursor-pointer transition-all ${adminState.aiAutoReply
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                              }`}
                          >
                            {adminState.aiAutoReply ? 'ENABLED' : 'PAUSED'}
                          </button>
                        </div>
                        <p className="font-sans-ui text-[0.68rem] text-[#747474]">
                          {adminState.aiAutoReply
                            ? 'AI contextually answers questions globally across all inboxes.'
                            : 'Global AI is paused. Visitors will wait for your direct reply.'}
                        </p>
                      </div>

                      {/* WhatsApp Routing Configuration */}
                      <form onSubmit={handleSaveChatPhone} className="bg-[#FAF9F6] border border-[#D8D8D5] p-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tech text-xs font-bold text-[#111111] flex items-center gap-1">
                            <WhatsAppIcon className="w-3 h-3 text-emerald-600" /> WHATSAPP DISPATCH
                          </span>
                          {chatPhoneSaved && (
                            <span className="font-mono-tech text-[0.62rem] text-emerald-600 font-bold">
                              SAVED
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={chatPhoneInput}
                            onChange={(e) => setChatPhoneInput(e.target.value)}
                            placeholder="e.g. 8801934164177"
                            className="flex-1 bg-white border border-[#D8D8D5] px-2 py-1 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1 bg-[#111111] hover:bg-[#8F1D25] text-white font-mono-tech text-xs cursor-pointer"
                          >
                            SAVE
                          </button>
                        </div>
                      </form>

                      {/* Visitor Threads List */}
                      <div className="space-y-2 pt-2 border-t border-[#D8D8D5]">
                        <div className="flex items-center justify-between font-mono-tech text-[0.65rem] text-[#747474] font-bold">
                          <span>VISITOR THREADS ({visitorSessions.length})</span>
                          <span>SELECT TO REPLY</span>
                        </div>

                        <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                          <button
                            type="button"
                            onClick={() => setSelectedSessionId('all')}
                            className={`w-full text-left p-2 border font-mono-tech text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              selectedSessionId === 'all'
                                ? 'bg-[#111111] text-white border-[#111111]'
                                : 'bg-[#FAF9F6] hover:bg-white text-[#111111] border-[#D8D8D5]'
                            }`}
                          >
                            <span className="font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              GLOBAL FEED (ALL)
                            </span>
                            <span className="text-[0.62rem] opacity-75">{chatMessages.length} msgs</span>
                          </button>

                          {visitorSessions.map((session) => {
                            const isThreadMuted = disabledThreads.includes(session.sessionId);
                            return (
                              <button
                                key={session.sessionId}
                                type="button"
                                onClick={() => setSelectedSessionId(session.sessionId)}
                                className={`w-full text-left p-2 border font-mono-tech text-xs transition-colors cursor-pointer ${
                                  selectedSessionId === session.sessionId
                                    ? 'bg-[#8F1D25] text-white border-[#8F1D25]'
                                    : 'bg-[#FAF9F6] hover:bg-white text-[#111111] border-[#D8D8D5]'
                                }`}
                              >
                                <div className="flex items-center justify-between font-bold text-[0.7rem] mb-0.5">
                                  <span className="truncate flex items-center gap-1.5">
                                    <span>Visitor #{session.sessionId.slice(-6)}</span>
                                    {isThreadMuted && (
                                      <span
                                        className={`text-[0.55rem] px-1 py-0.2 rounded font-bold ${
                                          selectedSessionId === session.sessionId
                                            ? 'bg-amber-400 text-black'
                                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                                        }`}
                                      >
                                        AI OFF
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[0.6rem] opacity-80">{session.lastTime}</span>
                                </div>
                                <p className="text-[0.65rem] truncate opacity-85 font-sans-ui">
                                  {session.lastMessage}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#D8D8D5]">
                      {confirmClearChat ? (
                        <div className="space-y-2 bg-red-50 border border-red-300 p-2 text-center animate-in fade-in duration-150">
                          <p className="font-mono-tech text-[0.68rem] text-red-900 font-bold">
                            {selectedSessionId === 'all'
                              ? 'Permanently clear ALL cloud chat logs?'
                              : `Clear thread #${selectedSessionId.slice(-6)}?`}
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={executeClearChatLogs}
                              className="flex-1 bg-red-700 hover:bg-red-800 text-white font-mono-tech text-xs py-1.5 font-bold cursor-pointer transition-colors shadow-2xs"
                            >
                              YES, CLEAR
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmClearChat(false)}
                              className="flex-1 bg-white hover:bg-neutral-100 text-[#111111] border border-[#D8D8D5] font-mono-tech text-xs py-1.5 cursor-pointer transition-colors"
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmClearChat(true)}
                          className="w-full font-mono-tech text-xs text-red-700 hover:text-red-900 border border-red-200 hover:border-red-400 py-1.5 transition-colors cursor-pointer"
                        >
                          {selectedSessionId === 'all'
                            ? 'CLEAR ALL CLOUD LOGS'
                            : `CLEAR THREAD #${selectedSessionId.slice(-6)}`}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Conversation Stream */}
                  <div className="flex-1 bg-white border border-[#D8D8D5] flex flex-col overflow-hidden shadow-xs">
                    <div className="p-3 bg-[#ECECE6] border-b border-[#D8D8D5] flex items-center justify-between font-mono-tech text-xs gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-bold truncate">
                          {selectedSessionId === 'all'
                            ? 'GLOBAL FEED // ALL VISITORS'
                            : `DIRECT CONVERSATION // VISITOR #${selectedSessionId.slice(-6)}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Per-Thread AI Auto-Reply Toggle Button */}
                        {selectedSessionId !== 'all' && (
                          <button
                            type="button"
                            onClick={() => handleToggleThreadAi(selectedSessionId)}
                            className={`font-mono-tech text-[0.65rem] px-2.5 py-1 border font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                              disabledThreads.includes(selectedSessionId)
                                ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                            }`}
                            title={
                              disabledThreads.includes(selectedSessionId)
                                ? 'Click to re-enable AI Auto-Reply for this inbox'
                                : 'Click to mute AI Auto-Reply for this specific inbox'
                            }
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                disabledThreads.includes(selectedSessionId)
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500 animate-pulse'
                              }`}
                            />
                            <span>
                              {disabledThreads.includes(selectedSessionId)
                                ? 'AI: PAUSED FOR THIS INBOX (RESUME)'
                                : 'AI: ACTIVE (PAUSE FOR THIS INBOX)'}
                            </span>
                          </button>
                        )}
                        <span className="hidden sm:inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[0.65rem]">
                          MONGODB ATLAS LIVE
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F6]">
                      {/* Thread-level or Global AI Notice Banner */}
                      {selectedSessionId !== 'all' && disabledThreads.includes(selectedSessionId) && (
                        <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-2 text-[0.7rem] font-mono-tech flex items-center justify-between shadow-2xs rounded-xs">
                          <span className="flex items-center gap-1.5">
                            <span>⚠️</span>
                            <span>AI Auto-Reply is <strong>PAUSED</strong> for this inbox. The visitor will only receive your direct messages.</span>
                          </span>
                          <button
                            onClick={() => handleToggleThreadAi(selectedSessionId)}
                            className="underline font-bold hover:text-amber-950 ml-2 cursor-pointer shrink-0"
                          >
                            Resume AI
                          </button>
                        </div>
                      )}
                      {!adminState.aiAutoReply && (
                        <div className="bg-neutral-100 border border-neutral-300 text-neutral-800 px-3 py-2 text-[0.7rem] font-mono-tech flex items-center justify-between shadow-2xs rounded-xs">
                          <span className="flex items-center gap-1.5">
                            <span>⏸️</span>
                            <span>Global AI Auto-Reply is <strong>PAUSED</strong> across all inboxes.</span>
                          </span>
                          <button
                            onClick={handleToggleGlobalAi}
                            className="underline font-bold text-[#8F1D25] ml-2 cursor-pointer shrink-0"
                          >
                            Enable Global AI
                          </button>
                        </div>
                      )}
                      {displayedChatMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-[#747474]">
                          <p className="font-mono-tech text-xs">NO VISITOR MESSAGES LOGGED</p>
                          <span className="text-[0.7rem] mt-1">
                            When an external visitor sends a message from anywhere in the world, it appears here in real time!
                          </span>
                        </div>
                      ) : (
                        displayedChatMessages.map((msg, idx) => {
                          const isUser = msg.sender === 'user';
                          const isAdmin = msg.sender === 'admin';
                          const isBot = msg.sender === 'bot';

                          return (
                            <div
                              key={msg.id || idx}
                              className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                            >
                              <div className="flex items-center gap-1.5 mb-1 font-mono-tech text-[0.62rem] text-[#747474]">
                                <span className="font-bold">
                                  {isUser
                                    ? `Visitor (${(msg.sessionId || 'anon').slice(-6)})`
                                    : isBot
                                    ? 'Samium AI Bot'
                                    : 'You (Samium Bashir Badhan)'}
                                </span>
                                <span>·</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <div
                                className={`max-w-[85%] p-3 text-xs leading-relaxed border ${isUser
                                  ? 'bg-white border-[#D8D8D5] text-[#111111]'
                                  : isAdmin
                                    ? 'bg-[#8F1D25] text-white border-[#8F1D25]'
                                    : 'bg-[#ECECE6] text-[#111111] border-[#D8D8D5]'
                                  }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Admin Reply Input */}
                    <form onSubmit={handleSendChatReply} className="p-3 bg-white border-t border-[#D8D8D5] flex gap-2">
                      <input
                        type="text"
                        value={chatReply}
                        onChange={(e) => setChatReply(e.target.value)}
                        placeholder={
                          selectedSessionId === 'all'
                            ? 'Broadcast reply as Samium to all visitors...'
                            : `Reply directly to Visitor #${selectedSessionId.slice(-6)}...`
                        }
                        className="flex-1 bg-[#F5F4F1] border border-[#D8D8D5] px-3 py-2 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={!chatReply.trim()}
                        className="btn-editorial-primary btn-editorial-sm py-2 px-5 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>DISPATCH REPLY</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------
                  TAB 4: GIT SYNC & CODE EXPORT
                  --------------------------------------------------------------- */}
              {activeTab === 'export' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0px_#111111] space-y-4">
                    <div>
                      <span className="font-mono-tech text-xs text-[#8F1D25] font-bold uppercase block mb-1">
                        PERMANENT CODEBASE SYNCHRONIZATION //
                      </span>
                      <h3 className="font-serif-display text-xl font-bold text-[#111111]">
                        Commit Your Uploads Directly to Git
                      </h3>
                      <p className="font-sans-ui text-xs text-[#747474] mt-1 leading-relaxed">
                        Whenever you upload or edit projects in this admin panel, they are saved locally in your browser. To make your changes 100% permanent across all devices and Vercel deploys, simply download or copy the generated <code>projects.js</code> file!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={downloadProjectsFile}
                        className="btn-editorial-primary text-xs py-3 px-4 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Download className="w-4 h-4 text-[#8F1D25]" />
                        <span>DOWNLOAD PROJECTS.JS FILE</span>
                      </button>

                      <button
                        onClick={handleCopyCode}
                        className="btn-editorial-outline text-xs py-3 px-4 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        {copyFeedback ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">COPIED TO CLIPBOARD!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>COPY PROJECTS.JS CODE</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* JSON Backup & Restore Box */}
                  <div className="bg-white border border-[#D8D8D5] p-6 space-y-4">
                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-[#111111]">
                        Full Portfolio Backup &amp; Migration
                      </h4>
                      <p className="font-mono-tech text-xs text-[#747474]">
                        Export or import your entire portfolio dataset (Projects, Profile, Bio, Settings).
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={exportFullJSON}
                        className="btn-editorial-outline btn-editorial-sm text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> EXPORT FULL JSON BACKUP
                      </button>

                      <label className="btn-editorial-outline btn-editorial-sm text-xs flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" /> RESTORE FROM JSON
                        <input
                          type="file"
                          accept=".json"
                          ref={fileInputRef}
                          onChange={handleJSONFileSelected}
                          className="hidden"
                        />
                      </label>

                      {confirmResetDefaults ? (
                        <div className="ml-auto flex items-center gap-2 bg-red-50 border border-red-300 p-1.5 text-xs font-mono-tech animate-in fade-in duration-150">
                          <span className="text-red-900 font-bold text-[0.68rem]">Reset all data?</span>
                          <button
                            type="button"
                            onClick={() => {
                              resetToDefaults();
                              setConfirmResetDefaults(false);
                            }}
                            className="bg-red-700 hover:bg-red-800 text-white px-2 py-0.5 text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            YES, RESET
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmResetDefaults(false)}
                            className="bg-white hover:bg-neutral-100 text-[#111111] border border-[#D8D8D5] px-2 py-0.5 text-xs cursor-pointer transition-colors"
                          >
                            CANCEL
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmResetDefaults(true)}
                          className="font-mono-tech text-xs text-red-700 hover:text-red-900 ml-auto border border-red-200 hover:border-red-400 px-3 py-1.5 cursor-pointer transition-colors"
                        >
                          RESET FACTORY DEFAULTS
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================
          PROJECT ADD / EDIT MODAL DRAWER
          =================================================================== */}
      {isEditorOpen && (
        <div
          className="fixed inset-0 z-60 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border-2 border-[#111111] shadow-[12px_12px_0px_#111111] w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-[#111111]">
            {/* Drawer Header */}
            <div className="bg-[#111111] text-white p-4 flex items-center justify-between border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#8F1D25]" />
                <h3 className="font-mono-tech text-xs sm:text-sm font-bold tracking-wider uppercase">
                  {editingProjectId ? 'EDIT ARCHITECTURAL SYSTEM' : 'UPLOAD NEW ARCHITECTURAL SYSTEM'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 hover:text-[#8F1D25] text-[#888888] font-mono-tech text-xs flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" /> CANCEL
              </button>
            </div>

            {/* Drawer Form Body */}
            <form onSubmit={handleSaveProject} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    SYSTEM TITLE * //
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. NOIR Atelier"
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    SUBTITLE / TAGLINE //
                  </label>
                  <input
                    type="text"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="e.g. Haute Couture & Commerce"
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Category & Filter Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    DISPLAY CATEGORY //
                  </label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="e.g. Full-Stack Luxury E-Commerce"
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    FILTER TAB //
                  </label>
                  <select
                    value={projectForm.filterCategory}
                    onChange={(e) => setProjectForm({ ...projectForm, filterCategory: e.target.value })}
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none cursor-pointer"
                  >
                    <option value="ecommerce">E-Commerce &amp; Payments</option>
                    <option value="healthcare">Healthcare &amp; Clinical</option>
                    <option value="portal">Portals &amp; Architectures</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Image Upload & Preview */}
              <div className="bg-[#FAF9F6] border border-[#D8D8D5] p-4 space-y-3">
                <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block font-bold">
                  PROJECT COVER IMAGE (UPLOAD OR URL) //
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Thumbnail Preview */}
                  <div className="w-32 h-20 bg-[#ECECE6] border border-[#D8D8D5] overflow-hidden shrink-0 relative flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = './Image/noir.jpg';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-[#747474]" />
                    )}
                  </div>

                  {/* Upload button & Text Input */}
                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => {
                          setProjectForm({ ...projectForm, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="Image URL (e.g. ./Image/noir.jpg or https://...)"
                        className="flex-1 bg-white border border-[#D8D8D5] px-3 py-1.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                      />

                      <label className="btn-editorial-primary btn-editorial-sm text-xs px-3 py-1.5 flex items-center gap-1.5 cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>BROWSE FILE</span>
                        <input
                          type="file"
                          accept="image/*"
                          ref={imageUploadRef}
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <span className="font-mono-tech text-[0.62rem] text-[#747474] block">
                      Tip: You can either type an existing path or pick an image file directly from your computer!
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 4: URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    LIVE DEMO PRODUCTION URL //
                  </label>
                  <input
                    type="url"
                    value={projectForm.live}
                    onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                    GITHUB REPOSITORY URL //
                  </label>
                  <input
                    type="url"
                    value={projectForm.repo}
                    onChange={(e) => setProjectForm({ ...projectForm, repo: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 5: Tech Stack */}
              <div>
                <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                  TECH STACK TAGS (COMMA SEPARATED) //
                </label>
                <input
                  type="text"
                  value={projectForm.stack}
                  onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                  placeholder="React 19, Next.js 15, TypeScript, MongoDB, Redis, JWT"
                  className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                />
              </div>

              {/* Row 6: Description & Highlight */}
              <div>
                <label className="font-mono-tech text-[0.68rem] text-[#747474] uppercase block mb-1 font-bold">
                  SHORT OVERVIEW / SUMMARY //
                </label>
                <textarea
                  rows={2}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Comprehensive description of the full-stack system architecture..."
                  className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2.5 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                />
              </div>

              {/* Deep Architecture Specs */}
              <div className="space-y-4 pt-2 border-t border-[#D8D8D5]">
                <span className="font-mono-tech text-[0.68rem] text-[#8F1D25] font-bold uppercase tracking-wider block">
                  ARCHITECTURAL DEEP DIVE (MODAL CASE STUDY) //
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono-tech text-[0.62rem] text-[#747474] uppercase block mb-1 font-bold">
                      AUTH ARCHITECTURE //
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.authArchitecture}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, authArchitecture: e.target.value })
                      }
                      className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-[0.7rem] text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-[0.62rem] text-[#747474] uppercase block mb-1 font-bold">
                      BACKEND ARCHITECTURE //
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.backendArchitecture}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, backendArchitecture: e.target.value })
                      }
                      className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-[0.7rem] text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono-tech text-[0.62rem] text-[#747474] uppercase block mb-1 font-bold">
                      FRONTEND ARCHITECTURE //
                    </label>
                    <textarea
                      rows={3}
                      value={projectForm.frontendArchitecture}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, frontendArchitecture: e.target.value })
                      }
                      className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-mono-tech text-[0.7rem] text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-[0.65rem] text-[#747474] uppercase block mb-1 font-bold">
                    KEY BULLET FEATURES (ONE PER LINE) //
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.keyFeatures}
                    onChange={(e) => setProjectForm({ ...projectForm, keyFeatures: e.target.value })}
                    placeholder="Next.js 15 App Router with React 19&#10;BullMQ background job queues with Redis&#10;Jose JWT multi-tier RBAC authentication"
                    className="w-full bg-[#F5F4F1] border border-[#D8D8D5] p-2 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                  />
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-4 border-t border-[#D8D8D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="btn-editorial-outline btn-editorial-sm text-xs py-2 px-4 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-editorial-primary text-xs py-2.5 px-6 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProjectId ? 'SAVE SYSTEM CHANGES' : 'PUBLISH NEW SYSTEM'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Project Delete Confirmation Modal (Non-blocking) */}
      {projectToDelete && (
        <div
          className="fixed inset-0 z-70 bg-[#111111]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border-2 border-[#111111] shadow-[8px_8px_0px_#111111] max-w-md w-full p-6 text-[#111111] space-y-4">
            <div className="flex items-center gap-2 text-red-700">
              <span className="w-2.5 h-2.5 bg-red-700" />
              <h4 className="font-mono-tech text-xs font-bold uppercase tracking-wider">
                CONFIRM SYSTEM DELETION //
              </h4>
            </div>
            <p className="font-sans-ui text-sm text-[#111111] leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong>"{projectToDelete.title}"</strong> from your architectural portfolio?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#D8D8D5]">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="btn-editorial-outline btn-editorial-sm text-xs py-2 px-4 cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={confirmDeleteProject}
                className="bg-red-700 hover:bg-red-800 text-white font-mono-tech text-xs font-bold py-2 px-5 cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> DELETE SYSTEM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

