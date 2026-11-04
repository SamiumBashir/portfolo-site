/* ==========================================================================
   REAL-TIME CHAT & AI DISPATCH ENGINE
   AUTHOR: SAMIUM BASHIR BADHAN
   ARCHITECTURE: SOCKET.IO + BROADCASTCHANNEL REACTIVE BUS + LOCALSTORAGE
   ========================================================================== */

import { io } from 'socket.io-client';
import { CONTACT_CONFIG } from '../data/config';

// Storage keys
const STORAGE_KEY_MESSAGES = 'samium_chat_messages_v2';
const STORAGE_KEY_SESSION = 'samium_chat_session_id';
const STORAGE_KEY_ADMIN_STATE = 'samium_chat_admin_state';

// Web Audio API Synthesizer Chime (Zero external mp3 dependencies)
export function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle two-tone notification chord
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  } catch (err) {
    // Audio context may be restricted before user interaction
  }
}

// Generate or retrieve persistent visitor session ID
export function getVisitorSessionId() {
  let sessionId = localStorage.getItem(STORAGE_KEY_SESSION);
  if (!sessionId) {
    sessionId = 'visitor_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(STORAGE_KEY_SESSION, sessionId);
  }
  return sessionId;
}

// Initial Admin State
const DEFAULT_ADMIN_STATE = {
  isOnline: true,
  aiAutoReply: true,
  statusMessage: 'Typically replies in a few minutes',
  whatsappNumber: CONTACT_CONFIG.whatsappNumber,
};

export function getAdminState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_STATE);
    return raw ? { ...DEFAULT_ADMIN_STATE, ...JSON.parse(raw) } : DEFAULT_ADMIN_STATE;
  } catch {
    return DEFAULT_ADMIN_STATE;
  }
}

export function saveAdminState(state) {
  localStorage.setItem(STORAGE_KEY_ADMIN_STATE, JSON.stringify(state));
  notifyChannel({ type: 'ADMIN_STATE_UPDATE', payload: state });
}

// Default initial welcome messages
export function getDefaultMessages() {
  return [
    {
      id: 'welcome_1',
      sender: 'bot',
      author: 'Samium AI Assistant',
      text: "Hi there! 👋 I'm Samium's AI Assistant. How can I assist you with your project or full-stack software needs today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    },
  ];
}

export function getStoredMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (!raw) return getDefaultMessages();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getDefaultMessages();
  } catch {
    return getDefaultMessages();
  }
}

export function saveStoredMessages(messages) {
  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  } catch (err) {
    console.error('Failed to save messages to localStorage', err);
  }
}

// Cross-tab broadcast channel for instant real-time sync
let broadcastChannel = null;
try {
  if (typeof window !== 'undefined' && window.BroadcastChannel) {
    broadcastChannel = new BroadcastChannel('samium_chat_realtime_bus');
  }
} catch (e) {
  broadcastChannel = null;
}

function notifyChannel(event) {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(event);
    } catch (e) {}
  }
}

// Smart AI Auto-Reply Generator
export function generateAiResponse(userText) {
  const text = (userText || '').toLowerCase().trim();

  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('salam')) {
    return "Hello! Great to connect with you. Are you looking to discuss a new full-stack project, explore technical architecture, or hire for a role?";
  }

  if (text.includes('project') || text.includes('work') || text.includes('portfolio') || text.includes('noir') || text.includes('phulkini') || text.includes('apex')) {
    return "Samium has architected 7+ production full-stack systems with authentication, backend databases (MongoDB, Redis), and React 19. Check out NOIR Atelier (E-commerce + BullMQ), Apex Diagnostics (4-Tier RBAC), and ReadNest!";
  }

  if (text.includes('stack') || text.includes('tech') || text.includes('skill') || text.includes('react') || text.includes('node') || text.includes('mongodb')) {
    return "Samium's primary stack includes React 19, Next.js (App Router), TypeScript, Node.js, Express, MongoDB Atlas, Redis (ioredis), BullMQ, and Docker containerization.";
  }

  if (text.includes('hire') || text.includes('available') || text.includes('contract') || text.includes('salary') || text.includes('job') || text.includes('remote')) {
    return "Yes! Samium is currently OPEN for Full-Stack Developer roles and engineering contracts. He is based in Dhaka, Bangladesh (BST / UTC+6) and available for remote or on-site engagements.";
  }

  if (text.includes('cv') || text.includes('resume') || text.includes('download')) {
    return "You can download Samium's official 2-page verified CV directly from the header, hero section, or at: /Samium_Bashir_Badhan_CV.pdf.";
  }

  if (text.includes('whatsapp') || text.includes('call') || text.includes('phone') || text.includes('number')) {
    const activeNumber = getAdminState().whatsappNumber || CONTACT_CONFIG.whatsappNumber;
    return `You can connect directly on WhatsApp at: https://wa.me/${activeNumber} or email: ${CONTACT_CONFIG.email}.`;
  }

  return "Thank you for reaching out! Your message has been logged in the real-time telemetry console. Samium will review it shortly. You can also connect directly via WhatsApp anytime!";
}

// Real-Time Socket.IO Client Manager (With graceful fallback)
class ChatService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
    this.initSocket();
    this.initBroadcastChannel();
  }

  initSocket() {
    // Only connect if a socket server URL is provided
    const socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
    if (socketUrl) {
      try {
        this.socket = io(socketUrl, {
          transports: ['websocket', 'polling'],
          reconnectionAttempts: 5,
          timeout: 4000,
        });

        this.socket.on('message', (msg) => {
          this.emit('NEW_MESSAGE', msg);
        });

        this.socket.on('status_change', (status) => {
          this.emit('ADMIN_STATUS', status);
        });
      } catch (err) {
        console.warn('Socket.IO connection deferred, utilizing reactive local bus');
      }
    }
  }

  initBroadcastChannel() {
    if (broadcastChannel) {
      broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'NEW_MESSAGE') {
          this.emit('NEW_MESSAGE', payload);
        } else if (type === 'ADMIN_STATE_UPDATE') {
          this.emit('ADMIN_STATE_UPDATE', payload);
        } else if (type === 'TYPING_STATUS') {
          this.emit('TYPING_STATUS', payload);
        }
      };
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  emit(type, payload) {
    this.listeners.forEach((cb) => {
      try {
        cb({ type, payload });
      } catch (e) {}
    });
  }

  sendMessage(message) {
    // Broadcast across tabs
    notifyChannel({ type: 'NEW_MESSAGE', payload: message });

    // Send through Socket.IO if connected
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', message);
    }
  }

  sendTypingStatus(isTyping, sender) {
    notifyChannel({ type: 'TYPING_STATUS', payload: { isTyping, sender } });
    if (this.socket && this.socket.connected) {
      this.socket.emit('typing', { isTyping, sender });
    }
  }
}

export const chatService = new ChatService();
