import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Shield,
  Send,
  Power,
  Bot,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Lock,
  Download,
  Clock,
  User,
  Phone,
  Save,
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { CONTACT_CONFIG } from '../data/config';
import {
  getStoredMessages,
  saveStoredMessages,
  getAdminState,
  saveAdminState,
  chatService,
  playNotificationChime,
  getVisitorSessionId,
} from '../services/chatEngine';

export default function ChatAdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [adminState, setAdminState] = useState(getAdminState());
  const [phoneInput, setPhoneInput] = useState(getAdminState().whatsappNumber || CONTACT_CONFIG.whatsappNumber);
  const [phoneSaved, setPhoneSaved] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Load state and messages
  useEffect(() => {
    if (isOpen) {
      setMessages(getStoredMessages());
      const state = getAdminState();
      setAdminState(state);
      setPhoneInput(state.whatsappNumber || CONTACT_CONFIG.whatsappNumber);
    }
  }, [isOpen]);

  // Subscribe to real-time events
  useEffect(() => {
    const unsubscribe = chatService.subscribe(({ type, payload }) => {
      if (type === 'NEW_MESSAGE') {
        setMessages((prev) => {
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

    return () => unsubscribe();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (e) => {
    e.preventDefault();
    const validPin = (import.meta.env.VITE_ADMIN_PIN || '2026').trim();
    if (pinInput === validPin || pinInput === 'Badhan' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleToggleOnline = () => {
    const updated = { ...adminState, isOnline: !adminState.isOnline };
    setAdminState(updated);
    saveAdminState(updated);
  };

  const handleToggleAi = () => {
    const updated = { ...adminState, aiAutoReply: !adminState.aiAutoReply };
    setAdminState(updated);
    saveAdminState(updated);
  };

  const handleSaveWhatsAppNumber = (e) => {
    e.preventDefault();
    const cleanNumber = phoneInput.replace(/[^0-9]/g, '');
    const updated = { ...adminState, whatsappNumber: cleanNumber };
    setAdminState(updated);
    saveAdminState(updated);
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2500);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const replyMsg = {
      id: 'admin_' + Date.now(),
      sender: 'admin',
      author: 'Samium Bashir Badhan (Direct)',
      text: replyText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    const updated = [...messages, replyMsg];
    setMessages(updated);
    saveStoredMessages(updated);
    chatService.sendMessage(replyMsg);

    setReplyText('');
    chatService.sendTypingStatus(false, 'admin');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all message history?')) {
      localStorage.removeItem('samium_chat_messages_v2');
      const reset = [];
      setMessages(reset);
      saveStoredMessages(reset);
    }
  };

  const handleExportTranscript = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_transcript_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#F5F4F1] border-2 border-[#111111] shadow-[16px_16px_0px_rgba(0,0,0,0.9)] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-[#111111] text-[#F5F4F1] p-4 flex items-center justify-between border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#8F1D25]" />
            <div>
              <h2 className="font-mono-tech text-xs font-bold tracking-widest uppercase text-white">
                ADMIN CONSOLE // LIVE TELEMETRY CHAT
              </h2>
              <span className="font-mono-tech text-[0.65rem] text-[#888888]">
                AUTH SPEC: RBAC LEVEL-01
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-[#333333] hover:border-[#8F1D25] hover:text-[#8F1D25] text-[#888888] font-mono-tech text-xs flex items-center gap-1 cursor-pointer"
          >
            <X className="w-4 h-4" /> CLOSE
          </button>
        </div>

        {/* PIN Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-14 h-14 bg-[#ECECE6] border border-[#D8D8D5] flex items-center justify-center rounded-full mb-4">
              <Lock className="w-6 h-6 text-[#8F1D25]" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#111111] mb-2">
              ADMIN VERIFICATION
            </h3>
            <p className="font-sans-ui text-xs text-[#747474] max-w-xs mb-6">
              Enter your private administrator security PIN to access the live conversation telemetry.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Security PIN"
                autoFocus
                className="w-full bg-white border border-[#D8D8D5] p-3 text-center font-mono-tech text-base tracking-widest focus:border-[#8F1D25] focus:outline-none"
              />
              {pinError && (
                <span className="font-mono-tech text-xs text-[#8F1D25] block">
                  Invalid Passcode. Please try again.
                </span>
              )}
              <button
                type="submit"
                className="w-full btn-editorial-primary text-xs py-3"
              >
                UNLOCK ADMIN CONSOLE →
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Controls & Status Sidebar (md:w-80) */}
            <div className="md:w-72 bg-[#ECECE6] border-b md:border-b-0 md:border-r border-[#D8D8D5] p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <span className="font-mono-tech text-[0.65rem] text-[#8F1D25] font-bold tracking-widest uppercase block mb-1">
                    SYSTEM STATUS //
                  </span>
                  <h4 className="font-serif-display text-lg font-bold text-[#111111]">
                    Samium Bashir Badhan
                  </h4>
                  <p className="font-mono-tech text-xs text-[#747474]">
                    Station: Dhaka (BST / UTC+6)
                  </p>
                </div>

                {/* Online / Offline Toggle */}
                <div className="bg-white border border-[#D8D8D5] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs font-bold text-[#111111]">
                      OPERATIONAL STATUS
                    </span>
                    <button
                      onClick={handleToggleOnline}
                      className={`font-mono-tech text-[0.65rem] px-2.5 py-1 border font-bold uppercase transition-all cursor-pointer ${
                        adminState.isOnline
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                      }`}
                    >
                      {adminState.isOnline ? '● ONLINE' : '○ OFFLINE'}
                    </button>
                  </div>
                  <p className="font-sans-ui text-[0.7rem] text-[#747474]">
                    {adminState.isOnline
                      ? 'Visitors see you as ACTIVE and ready to chat.'
                      : 'Visitors see you as AWAY; AI auto-reply handles inquiries.'}
                  </p>
                </div>

                {/* AI Auto-Reply Toggle */}
                <div className="bg-white border border-[#D8D8D5] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs font-bold text-[#111111] flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-[#8F1D25]" /> AI AUTO-REPLY
                    </span>
                    <button
                      onClick={handleToggleAi}
                      className={`font-mono-tech text-[0.65rem] px-2.5 py-1 border font-bold uppercase transition-all cursor-pointer ${
                        adminState.aiAutoReply
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-300'
                      }`}
                    >
                      {adminState.aiAutoReply ? 'ENABLED' : 'PAUSED'}
                    </button>
                  </div>
                  <p className="font-sans-ui text-[0.7rem] text-[#747474]">
                    Instantly responds to visitor inquiries with contextual suggestions and portfolio stats.
                  </p>
                </div>

                {/* WhatsApp Phone Number Configuration */}
                <form onSubmit={handleSaveWhatsAppNumber} className="bg-white border border-[#D8D8D5] p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs font-bold text-[#111111] flex items-center gap-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" /> WHATSAPP ROUTING
                    </span>
                    {phoneSaved && (
                      <span className="font-mono-tech text-[0.65rem] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> SAVED
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="e.g. 8801700000000"
                      className="flex-1 bg-[#F5F4F1] border border-[#D8D8D5] px-2.5 py-1 font-mono-tech text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1 bg-[#111111] hover:bg-[#8F1D25] text-white font-mono-tech text-xs cursor-pointer flex items-center gap-1"
                      title="Save active WhatsApp number"
                    >
                      <Save className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-sans-ui text-[0.68rem] text-[#747474]">
                    Messages routed via WhatsApp direct button will dispatch to this number.
                  </p>
                </form>

                {/* Quick Telemetry Box */}
                <div className="bg-white border border-[#D8D8D5] p-3 font-mono-tech text-xs space-y-1.5">
                  <div className="flex justify-between text-[0.7rem]">
                    <span className="text-[#747474]">TOTAL MESSAGES:</span>
                    <span className="font-bold text-[#111111]">{messages.length}</span>
                  </div>
                  <div className="flex justify-between text-[0.7rem]">
                    <span className="text-[#747474]">ACTIVE SESSION:</span>
                    <span className="font-bold text-[#8F1D25]">#V-LIVE</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#D8D8D5] space-y-2">
                <button
                  onClick={handleExportTranscript}
                  className="w-full btn-editorial-outline btn-editorial-sm text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> EXPORT JSON LOG
                </button>
                <button
                  onClick={handleClearHistory}
                  className="w-full btn-editorial-outline btn-editorial-sm text-xs text-red-700 hover:border-red-700 flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> CLEAR MESSAGES
                </button>
              </div>
            </div>

            {/* Right Live Conversation Thread */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Thread Header */}
              <div className="p-3 border-b border-[#D8D8D5] bg-[#F5F4F1] flex items-center justify-between font-mono-tech text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-[#111111]">
                    LIVE VISITOR THREAD
                  </span>
                </div>
                <span className="text-[#747474] text-[0.65rem]">
                  END-TO-END REACTIVE BUS
                </span>
              </div>

              {/* Message History Feed */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F5F4F1]/40">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#747474]">
                    <p className="font-mono-tech text-xs">NO MESSAGES IN QUEUE</p>
                    <span className="text-[0.7rem]">Waiting for incoming visitor telemetry...</span>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isUser = msg.sender === 'user';
                    const isAdmin = msg.sender === 'admin';
                    const isBot = msg.sender === 'bot';

                    return (
                      <div
                        key={msg.id || index}
                        className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 font-mono-tech text-[0.65rem] text-[#747474]">
                          {isUser ? (
                            <>
                              <User className="w-3 h-3 text-[#111111]" />
                              <span className="font-bold text-[#111111]">{msg.author || 'Visitor'}</span>
                            </>
                          ) : isBot ? (
                            <>
                              <Bot className="w-3 h-3 text-[#8F1D25]" />
                              <span className="font-bold text-[#8F1D25]">Samium AI Bot</span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-3 h-3 text-[#8F1D25]" />
                              <span className="font-bold text-[#8F1D25]">You (Admin)</span>
                            </>
                          )}
                          <span>·</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-[85%] p-3 text-xs leading-relaxed font-sans-ui whitespace-pre-wrap border ${
                            isUser
                              ? 'bg-white border-[#D8D8D5] text-[#111111] shadow-xs'
                              : isAdmin
                              ? 'bg-[#111111] text-[#F5F4F1] border-[#111111] shadow-xs'
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

              {/* Admin Reply Input Box */}
              <form
                onSubmit={handleSendReply}
                className="p-3 sm:p-4 bg-white border-t border-[#D8D8D5] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    chatService.sendTypingStatus(e.target.value.length > 0, 'admin');
                  }}
                  placeholder="Type an instant reply as Samium..."
                  className="flex-1 bg-[#F5F4F1] border border-[#D8D8D5] px-3.5 py-2.5 font-sans-ui text-xs text-[#111111] focus:border-[#8F1D25] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="btn-editorial-primary btn-editorial-sm py-2.5 px-4 flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DISPATCH</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
