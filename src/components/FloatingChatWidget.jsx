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
} from '../services/chatEngine';

export default function FloatingChatWidget({ onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1); // Initial unread prompt matching reference
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

  // Subscribe to real-time events (BroadcastChannel / Socket.IO)
  useEffect(() => {
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
          setTypingAuthor('Samium');
        }
      }
    });

    return () => unsubscribe();
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

    const userMsg = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      author: 'You',
      text: content,
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

  const activeWhatsAppNumber = adminState.whatsappNumber || CONTACT_CONFIG.whatsappNumber;

  const handleOpenWhatsApp = (customText) => {
    const text = customText || inputText || "Hi Samium, I'm reaching out from your portfolio live chat!";
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${activeWhatsAppNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 font-sans selection:bg-blue-600 selection:text-white">
      {/* -------------------------------------------------------------------
          FLOATING CHAT LAUNCHER BUTTON (Matches Tidio Reference)
          ------------------------------------------------------------------- */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={handleToggleOpen}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0062FF] via-[#0077FF] to-[#00C6FF] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,102,255,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/40 cursor-pointer"
            aria-label="Open Live Chat"
          >
            {/* Smooth Speech Bubble Icon Matching Reference */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 3C6.477 3 2 6.92 2 11.75c0 2.651 1.34 5.034 3.484 6.643-.16 1.258-.696 2.64-1.614 3.518a.5.5 0 0 0 .343.839c2.379 0 4.372-.942 5.568-1.782.715.19 1.467.282 2.219.282 5.523 0 10-3.92 10-8.75S17.523 3 12 3z" />
            </svg>
          </button>

          {/* Unread Message Notification Badge (Red '1' like in image) */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF3B30] text-white font-sans text-xs font-bold flex items-center justify-center border-2 border-white shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          {/* Online beacon pulse ring */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
        </div>
      )}

      {/* -------------------------------------------------------------------
          EXPANDABLE CHAT WINDOW (Matches Tidio Reference)
          ------------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`bg-white rounded-[26px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'w-[94vw] h-[88vh] max-w-2xl sm:w-[540px]'
              : 'w-[92vw] h-[590px] sm:w-[390px] md:w-[410px]'
          }`}
          role="dialog"
          aria-label="Live Chat with Samium"
        >
          {/* Header Bar with Blue Gradient */}
          <div className="bg-gradient-to-r from-[#0055FF] via-[#0066FF] to-[#00C6FF] text-white pt-4 px-4 pb-3 flex flex-col justify-between shrink-0 relative rounded-t-[26px]">
            <div className="flex items-center justify-between">
              {/* Profile Avatar & Title */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="./Image/image-hero.png"
                    alt="Samium Bashir Badhan"
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/90 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = './Image/image.png';
                    }}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      adminState.isOnline ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <h3 className="font-bold text-white text-[1.05rem] leading-tight tracking-tight">
                    Chat with us!
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        adminState.isOnline ? 'bg-emerald-300 animate-pulse' : 'bg-amber-300'
                      }`}
                    />
                    <span>{adminState.isOnline ? 'Samium is Active' : 'Away (AI Active)'}</span>
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1 text-white/90">
                {/* Sound Toggle */}
                <button
                  onClick={() => setIsSoundMuted(!isSoundMuted)}
                  className="p-1.5 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  title={isSoundMuted ? 'Unmute chime' : 'Mute chime'}
                >
                  {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Expand Toggle (Desktop) */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 hover:text-white hover:bg-white/15 rounded-full transition-colors hidden sm:block cursor-pointer"
                  title={isExpanded ? 'Restore window size' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* 3-Dots Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1.5 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-9 bg-white border border-slate-200 shadow-xl rounded-xl py-1.5 w-48 z-50 text-xs font-sans text-slate-800">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          if (onOpenAdmin) onOpenAdmin();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <Shield className="w-4 h-4 text-blue-600" /> Admin Console
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleOpenWhatsApp();
                        }}
                        className="w-full px-3.5 py-2 text-left hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-medium text-emerald-600"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-emerald-500" /> WhatsApp Direct
                      </button>
                    </div>
                  )}
                </div>

                {/* Close Dropdown Chevron */}
                <button
                  onClick={handleToggleOpen}
                  className="p-1.5 hover:text-white hover:bg-white/15 rounded-full transition-colors ml-0.5 cursor-pointer"
                  title="Minimize chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-banner: "We typically reply in few minutes." */}
            <div className="mt-2.5 pt-2 border-t border-white/20 text-xs text-white/90 flex items-center justify-between font-normal">
              <span>{adminState.statusMessage || 'We typically reply in few minutes.'}</span>
              <span className="text-[0.68rem] bg-white/20 px-2 py-0.5 rounded-full font-mono font-semibold">
                BST UTC+6
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              MESSAGES FEED & HISTORY
              ------------------------------------------------------------------- */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
            {/* Initial Bot Welcome Card Matching Reference Screenshot */}
            <div className="bg-[#EEF3F8] rounded-2xl p-4 border border-slate-200/70 shadow-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-800 leading-relaxed font-normal">
                  Hi there! I'm Samium AI 🤖👋 assisting <strong>Samium Bashir Badhan</strong>. How can I help you today?
                </div>
              </div>

              {/* Action Buttons Inside Card */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => handleQuickOption('Just playing around')}
                  className="w-full text-left py-2 px-3.5 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-medium text-blue-600 hover:text-blue-700 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>Just playing around</span>
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                </button>

                <button
                  onClick={() => handleQuickOption('I need Support / Hire for Full-Stack Role')}
                  className="w-full text-left py-2 px-3.5 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-medium text-slate-800 hover:text-blue-700 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>💼 Hire for Full-Stack / Project Inquiry</span>
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => handleOpenWhatsApp('Hi Samium, I would like to chat with you directly on WhatsApp!')}
                  className="w-full text-left py-2 px-3.5 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 hover:border-emerald-300 rounded-xl text-xs font-medium text-emerald-800 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" /> Direct WhatsApp Message
                  </span>
                  <span className="text-[0.65rem] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono">
                    DIRECT
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleQuickOption('Can I download your verified CV / Resume?');
                    window.open('./Samium_Bashir_Badhan_CV.pdf', '_blank');
                  }}
                  className="w-full text-left py-2 px-3.5 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-medium text-slate-700 hover:text-blue-700 transition-all shadow-2xs cursor-pointer flex items-center justify-between"
                >
                  <span>📄 Download Verified CV (PDF)</span>
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Instruction line */}
            <div className="text-center font-medium text-xs text-slate-400 my-1">
              Hit the buttons to respond
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
                        ? 'bg-gradient-to-tr from-[#0055FF] to-[#0070F3] text-white rounded-2xl rounded-tr-xs'
                        : isAdmin
                        ? 'bg-[#111111] text-[#F5F4F1] rounded-2xl rounded-tl-xs border border-slate-700'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-2xl rounded-tl-xs'
                    }`}
                  >
                    {!isUser && (
                      <span className="font-mono text-[0.65rem] font-bold uppercase block mb-1 text-blue-600">
                        {msg.author || (isAdmin ? 'Samium (Admin)' : 'Samium AI')}
                      </span>
                    )}
                    {msg.text}
                  </div>

                  {/* Metadata (Time & Read Ticks) */}
                  <div className="flex items-center gap-1 mt-1 font-mono text-[0.625rem] text-slate-400 px-1">
                    <span>{msg.timestamp}</span>
                    {isUser && (
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500 inline-block ml-0.5" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Live Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200/80 rounded-2xl w-fit text-xs text-slate-500 shadow-2xs">
                <span className="flex gap-1 items-center px-1">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                </span>
                <span className="text-[0.7rem] font-medium">{typingAuthor} is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* -------------------------------------------------------------------
              BOTTOM INPUT AREA (Matches Tidio Reference)
              ------------------------------------------------------------------- */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
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
                placeholder="Hit the buttons or type a message..."
                className="w-full bg-[#F5F7FA] border border-slate-200 rounded-2xl pl-3.5 pr-20 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              />

              {/* Right Input Tools: WhatsApp direct send + Floating Send Button */}
              <div className="absolute right-1.5 flex items-center gap-1">
                {/* Direct WhatsApp Send */}
                <button
                  type="button"
                  onClick={() => handleOpenWhatsApp()}
                  className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  title="Send directly to Samium's WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </button>

                {/* Floating Circular Blue Send Button (Matches Reference) */}
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0062FF] to-[#00C6FF] hover:scale-105 active:scale-95 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </form>

            {/* Utility Row (Bot, Paperclip, Smiley, POWERED BY SAMIUM) */}
            <div className="flex items-center justify-between pt-2.5 px-1 text-[0.68rem] text-slate-400">
              <div className="flex items-center gap-2.5 text-slate-400">
                <button
                  type="button"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                  title="AI Assistant Enabled"
                >
                  <Bot className="w-3.5 h-3.5 text-blue-500" />
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                  title="Attachment"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                  title="Emoji"
                >
                  <Smile className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 font-sans text-[0.65rem] text-slate-400 font-semibold tracking-wider">
                <span>POWERED BY</span>
                <span className="text-blue-600 font-bold">SAMIUM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
