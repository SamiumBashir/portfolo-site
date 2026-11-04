import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  ChevronDown,
  MoreVertical,
  Volume2,
  VolumeX,
  Shield,
  Bot,
  User,
  CheckCheck,
  Maximize2,
  Minimize2,
  Paperclip,
  Smile,
  FileText,
  Briefcase,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { CONTACT_CONFIG } from '../data/config';
import {
  getStoredMessages,
  saveStoredMessages,
  getAdminState,
  chatService,
  generateAiResponse,
  playNotificationChime,
  getVisitorSessionId,
} from '../services/chatEngine';

export default function FloatingChatWidget({ onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1); // Initial unread prompt
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAuthor, setTypingAuthor] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminState, setAdminState] = useState(getAdminState());

  const messagesEndRef = useRef(null);

  // Initialize messages on mount
  useEffect(() => {
    const stored = getStoredMessages();
    setMessages(stored);
    setAdminState(getAdminState());
  }, []);

  // Subscribe to real-time events (BroadcastChannel / Socket.IO) & Cloud Sync
  useEffect(() => {
    const sessionId = getVisitorSessionId();

    // 1. Local event subscription (BroadcastChannel / Socket.IO)
    const unsubscribe = chatService.subscribe(({ type, payload }) => {
      if (type === 'NEW_MESSAGE') {
        setMessages((prev) => {
          if (prev.some((m) => m.id === payload.id)) return prev;
          const updated = [...prev, payload];
          saveStoredMessages(updated);
          return updated;
        });

        // If widget is closed and message is from admin or bot, increment unread count & play chime
        if (!isOpen && (payload.sender === 'admin' || payload.sender === 'bot')) {
          setUnreadCount((c) => c + 1);
          if (!isSoundMuted) playNotificationChime();
        } else if (!isSoundMuted) {
          playNotificationChime();
        }
      } else if (type === 'ADMIN_STATE_UPDATE') {
        setAdminState(payload);
      } else if (type === 'TYPING_STATUS') {
        if (payload.sender === 'admin') {
          setIsTyping(payload.isTyping);
          setTypingAuthor('Samium (Admin)');
        }
      }
    });

    // 2. Continuous Cloud Auto-Sync with MongoDB Atlas
    const stopSync = chatService.startAutoSync({
      sessionId,
      admin: false,
      interval: 2600,
      onUpdate: (cloudMsgs) => {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const newFromCloud = cloudMsgs.filter((m) => !existingIds.has(m.id));

          if (newFromCloud.length === 0) return prev;

          // Check if an admin message arrived
          const adminReplies = newFromCloud.filter((m) => m.sender === 'admin');
          if (adminReplies.length > 0) {
            if (!isOpen) {
              setUnreadCount((c) => c + adminReplies.length);
            }
            if (!isSoundMuted) playNotificationChime();
          }

          const merged = [...prev, ...newFromCloud];
          saveStoredMessages(merged);
          return merged;
        });
      },
    });

    return () => {
      unsubscribe();
      stopSync();
    };
  }, [isOpen, isSoundMuted]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // When opening chat, clear unread count
  const handleToggleOpen = () => {
    if (!isOpen) {
      setUnreadCount(0);
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (textToSend) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    const sessionId = getVisitorSessionId();
    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      author: 'You',
      text: content,
      sessionId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveStoredMessages(updated);
    chatService.sendMessage(userMsg);
    setInputText('');

    // Trigger AI Auto-Reply if enabled
    if (adminState.aiAutoReply) {
      setIsTyping(true);
      setTypingAuthor('Samium AI');

      setTimeout(() => {
        setIsTyping(false);
        const replyText = generateAiResponse(content);
        const botMsg = {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          author: 'Samium AI',
          text: replyText,
          sessionId,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true,
        };

        setMessages((prev) => {
          const withBot = [...prev, botMsg];
          saveStoredMessages(withBot);
          return withBot;
        });

        chatService.sendMessage(botMsg);
        if (!isSoundMuted) playNotificationChime();
      }, 1100);
    }
  };

  const handleQuickOption = (optionText) => {
    handleSendMessage(optionText);
  };

  const rawNumber = adminState.whatsappNumber || CONTACT_CONFIG.whatsappNumber || '8801934164177';
  const activeWhatsAppNumber = (rawNumber === '8801700000000' ? '8801934164177' : rawNumber).replace(/[^0-9]/g, '');

  const handleOpenWhatsApp = (customText) => {
    const text = (customText || inputText || "Hi Samium, I'm reaching out from your portfolio live chat!").trim();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${activeWhatsAppNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 font-sans selection:bg-[#8F1D25] selection:text-[#F5F4F1]">
      {/* -------------------------------------------------------------------
          FLOATING CHAT LAUNCHER BUTTON (Editorial Dossier Palette)
          ------------------------------------------------------------------- */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={handleToggleOpen}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#111111] via-[#1A1A1A] to-[#8F1D25] text-[#F5F4F1] flex items-center justify-center shadow-[0_10px_30px_rgba(17,17,17,0.6)] hover:shadow-[0_10px_30px_rgba(143,29,37,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#8F1D25] cursor-pointer"
            aria-label="Open Live Chat"
          >
            {/* Smooth Speech Bubble Icon */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5F4F1] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 3C6.477 3 2 6.92 2 11.75c0 2.651 1.34 5.034 3.484 6.643-.16 1.258-.696 2.64-1.614 3.518a.5.5 0 0 0 .343.839c2.379 0 4.372-.942 5.568-1.782.715.19 1.467.282 2.219.282 5.523 0 10-3.92 10-8.75S17.523 3 12 3z" />
            </svg>
          </button>

          {/* Unread Message Notification Badge (Burgundy #8F1D25) */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#8F1D25] text-white font-mono-tech text-xs font-bold flex items-center justify-center border-2 border-[#F5F4F1] shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          {/* Online beacon pulse ring */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#111111]" />
        </div>
      )}

      {/* -------------------------------------------------------------------
          EXPANDABLE CHAT WINDOW (Matched to Portfolio Editorial Dossier)
          ------------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`bg-[#F5F4F1] rounded-[24px] shadow-[0_20px_60px_-15px_rgba(17,17,17,0.6)] border-2 border-[#111111] flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[94vw] h-[88vh] max-w-2xl sm:w-[540px]'
              : 'w-[92vw] h-[590px] sm:w-[390px] md:w-[410px]'
          }`}
          role="dialog"
          aria-label="Live Chat with Samium"
        >
          {/* Header Bar with Editorial Technical Dossier Style */}
          <div className="bg-[#111111] text-[#F5F4F1] pt-4 px-4 pb-3 flex flex-col justify-between shrink-0 relative border-b border-[#2A2A2A] rounded-t-[22px]">
            <div className="flex items-center justify-between">
              {/* Profile Avatar & Title */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="./Image/image-hero.png"
                    alt="Samium Bashir Badhan"
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#8F1D25] shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = './Image/image.png';
                    }}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#111111] ${
                      adminState.isOnline ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-display font-bold text-[#F5F4F1] text-[1.05rem] leading-tight tracking-wide">
                      Chat with Samium!
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono-tech text-[0.68rem] text-[#888888] mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        adminState.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span>{adminState.isOnline ? 'Active Now · Full-Stack' : 'Away (AI Active)'}</span>
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1 text-[#888888]">
                {/* Sound Toggle */}
                <button
                  onClick={() => setIsSoundMuted(!isSoundMuted)}
                  className="p-1.5 hover:text-[#F5F4F1] hover:bg-[#222222] rounded-full transition-colors cursor-pointer"
                  title={isSoundMuted ? 'Unmute chime' : 'Mute chime'}
                >
                  {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Expand Toggle (Desktop) */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:text-[#F5F4F1] hover:bg-[#222222] rounded-full transition-colors hidden sm:block cursor-pointer"
                  title={isExpanded ? 'Restore window size' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* 3-Dots Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 hover:text-[#F5F4F1] hover:bg-[#222222] rounded-full transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-9 bg-[#111111] border border-[#333333] shadow-2xl rounded-xl py-1.5 w-48 z-50 font-mono-tech text-xs text-[#F5F4F1]">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          if (onOpenAdmin) onOpenAdmin();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-[#222222] flex items-center gap-2 cursor-pointer font-medium text-[#F5F4F1]"
                      >
                        <Shield className="w-4 h-4 text-[#8F1D25]" /> Admin Console
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleOpenWhatsApp();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-[#222222] flex items-center gap-2 cursor-pointer font-medium text-emerald-400"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-emerald-400" /> WhatsApp Direct
                      </button>
                    </div>
                  )}
                </div>

                {/* Close Dropdown Chevron */}
                <button
                  onClick={handleToggleOpen}
                  className="p-1.5 hover:text-[#8F1D25] hover:bg-[#222222] rounded-full transition-colors ml-0.5 cursor-pointer"
                  title="Minimize chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-banner: "We typically reply in few minutes." */}
            <div className="mt-2.5 pt-2 border-t border-[#2A2A2A] font-mono-tech text-[0.68rem] text-[#888888] flex items-center justify-between">
              <span>{adminState.statusMessage || 'We typically reply in few minutes.'}</span>
              <span className="text-[0.65rem] bg-[#1A1A1A] border border-[#333333] text-[#8F1D25] px-2 py-0.5 rounded font-mono font-bold">
                COMM // LIVE
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              MESSAGES FEED & HISTORY
              ------------------------------------------------------------------- */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAF9F6]">
            {/* Initial Bot Welcome Card Matching Portfolio Editorial Theme */}
            <div className="bg-white rounded-2xl p-4 border border-[#D8D8D5] shadow-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#8F1D25] text-[#F5F4F1] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#111111] leading-relaxed font-sans-ui">
                  Hi there! I'm Samium AI 🤖 assisting <strong>Samium Bashir Badhan</strong> (Full-Stack Software Engineer). How can I help you today?
                </div>
              </div>

              {/* Action Buttons Inside Card */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => handleQuickOption('Just exploring the technical dossier')}
                  className="w-full text-left py-2 px-3.5 bg-[#F5F4F1] hover:bg-white border border-[#D8D8D5] hover:border-[#8F1D25] rounded-xl text-xs font-mono-tech text-[#111111] hover:text-[#8F1D25] transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>Just exploring the dossier</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#8F1D25]" />
                </button>

                <button
                  onClick={() => handleQuickOption('I would like to discuss a Full-Stack Project / Hire')}
                  className="w-full text-left py-2 px-3.5 bg-[#F5F4F1] hover:bg-white border border-[#D8D8D5] hover:border-[#8F1D25] rounded-xl text-xs font-mono-tech text-[#111111] hover:text-[#8F1D25] transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>💼 Discuss Full-Stack Project / Hire</span>
                  <Briefcase className="w-3.5 h-3.5 text-[#747474]" />
                </button>

                <button
                  onClick={() => handleOpenWhatsApp('Hi Samium, I would like to chat with you directly on WhatsApp!')}
                  className="w-full text-left py-2 px-3.5 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300 rounded-xl text-xs font-mono-tech text-emerald-900 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5 font-bold">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" /> Direct WhatsApp (+8801934164177)
                  </span>
                  <span className="text-[0.62rem] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono font-bold">
                    ONLINE
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleQuickOption('Can I download your verified CV / Resume?');
                    window.open('./Samium_Bashir_Badhan_CV.pdf', '_blank');
                  }}
                  className="w-full text-left py-2 px-3.5 bg-[#F5F4F1] hover:bg-white border border-[#D8D8D5] hover:border-[#8F1D25] rounded-xl text-xs font-mono-tech text-[#111111] hover:text-[#8F1D25] transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>📄 Download Verified CV (PDF)</span>
                  <FileText className="w-3.5 h-3.5 text-[#747474]" />
                </button>
              </div>
            </div>

            {/* Instruction line */}
            <div className="text-center font-mono-tech text-[0.65rem] text-[#747474] uppercase tracking-wider my-1">
              // Hit the buttons or type a message below //
            </div>

            {/* Dynamic Conversation Bubbles */}
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              const isBot = msg.sender === 'bot';
              const isAdmin = msg.sender === 'admin';

              // Skip repeating default welcome if displayed in card
              if (msg.id === 'welcome_1') return null;

              return (
                <div
                  key={msg.id || index}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 text-xs sm:text-[0.8125rem] leading-relaxed shadow-xs whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#111111] text-[#F5F4F1] rounded-2xl rounded-tr-xs border border-[#111111]'
                        : isAdmin
                        ? 'bg-[#8F1D25] text-white rounded-2xl rounded-tl-xs border border-[#8F1D25]'
                        : 'bg-white text-[#111111] border border-[#D8D8D5] rounded-2xl rounded-tl-xs'
                    }`}
                  >
                    {!isUser && (
                      <span className="font-mono-tech text-[0.65rem] font-bold uppercase block mb-1 text-[#8F1D25]">
                        {msg.author || (isAdmin ? 'Samium Bashir (Direct)' : 'Samium AI Bot')}
                      </span>
                    )}
                    {msg.text}
                  </div>

                  {/* Metadata (Time & Read Ticks & WhatsApp direct handoff) */}
                  <div className="flex items-center justify-between gap-3 mt-1 font-mono-tech text-[0.625rem] text-[#747474] px-1 w-full max-w-[85%]">
                    <div className="flex items-center gap-1">
                      <span>{msg.timestamp}</span>
                      {isUser && (
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600 inline-block ml-0.5" />
                      )}
                    </div>
                    {isUser && (
                      <button
                        type="button"
                        onClick={() => handleOpenWhatsApp(msg.text)}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        title="Forward this message to Samium's WhatsApp (+8801934164177)"
                      >
                        <WhatsAppIcon className="w-3 h-3 text-emerald-600" />
                        <span>Send to WhatsApp ↗</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2.5 bg-white border border-[#D8D8D5] rounded-2xl w-fit text-xs text-[#747474] shadow-2xs font-mono-tech">
                <span className="flex gap-1 items-center px-1">
                  <span className="w-1.5 h-1.5 bg-[#8F1D25] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#8F1D25] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#8F1D25] rounded-full animate-bounce" />
                </span>
                <span className="text-[0.68rem] font-bold">{typingAuthor} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* -------------------------------------------------------------------
              BOTTOM INPUT AREA (Editorial Palette)
              ------------------------------------------------------------------- */}
          <div className="p-3 bg-white border-t border-[#D8D8D5] shrink-0">
            {/* Input & WhatsApp Action Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="w-full bg-[#F5F4F1] border border-[#D8D8D5] rounded-xl pl-3.5 pr-20 py-2.5 text-xs text-[#111111] placeholder-[#747474] focus:outline-none focus:border-[#8F1D25] focus:bg-white transition-all shadow-inner font-sans-ui"
              />

              {/* Right Input Tools: WhatsApp direct send + Floating Send Button */}
              <div className="absolute right-1.5 flex items-center gap-1">
                {/* Direct WhatsApp Send */}
                <button
                  type="button"
                  onClick={() => handleOpenWhatsApp()}
                  className="p-1.5 text-[#747474] hover:text-emerald-600 transition-colors cursor-pointer"
                  title="Send directly to Samium's WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </button>

                {/* Circular Send Button (Burgundy / Charcoal) */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#8F1D25] active:scale-95 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </form>

            {/* Utility Row (Bot, Paperclip, Smiley, SAMIUM DOSSIER TELEMETRY) */}
            <div className="flex items-center justify-between pt-2.5 px-1 text-[0.68rem] text-[#747474] font-mono-tech">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="hover:text-[#8F1D25] transition-colors cursor-pointer flex items-center gap-1"
                  title="AI Auto-Reply Active"
                >
                  <Bot className="w-3.5 h-3.5 text-[#8F1D25]" />
                  <span className="text-[0.62rem]">AI ACTIVE</span>
                </button>
                <button
                  type="button"
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                  title="Attachment"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="hover:text-[#111111] transition-colors cursor-pointer"
                  title="Emoji"
                >
                  <Smile className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 text-[0.65rem] text-[#747474] font-bold tracking-wider">
                <span>SB-2026 //</span>
                <span className="text-[#8F1D25]">DOSSIER</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
