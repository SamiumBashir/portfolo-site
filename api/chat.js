import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

function getMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^MONGODB_URI=(.*)$/m);
      if (match && match[1]) {
        const parsed = match[1].trim().replace(/^["']|["']$/g, '');
        process.env.MONGODB_URI = parsed;
        return parsed;
      }
    }
  } catch (err) {
    // ignore
  }
  return null;
}

let cachedClient = null;

async function getClient() {
  if (!cachedClient) {
    const uri = getMongoUri();
    if (!uri) {
      throw new Error(
        'MONGODB_URI is not defined. Please set it in .env.local or your environment variables.'
      );
    }
    cachedClient = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await cachedClient.connect();
  }
  return cachedClient;
}

async function parseBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch (e) {
        return {};
      }
    }
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

const defaultSettings = {
  isOnline: true,
  aiAutoReply: true,
  statusMessage: 'Typically replies in a few minutes',
  disabledThreads: [],
};

async function getChatSettings(db) {
  const settingsCol = db.collection('chat_settings');
  const doc = await settingsCol.findOne({ _id: 'global_settings' });
  if (!doc) {
    await settingsCol.updateOne(
      { _id: 'global_settings' },
      { $setOnInsert: defaultSettings },
      { upsert: true }
    );
    return defaultSettings;
  }
  return {
    isOnline: doc.isOnline ?? true,
    aiAutoReply: doc.aiAutoReply ?? true,
    statusMessage: doc.statusMessage || 'Typically replies in a few minutes',
    disabledThreads: Array.isArray(doc.disabledThreads) ? doc.disabledThreads : [],
  };
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }

  const sendJson = (statusCode, data) => {
    if (typeof res.status === 'function' && typeof res.json === 'function') {
      return res.status(statusCode).json(data);
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(data));
  };

  try {
    const client = await getClient();
    const db = client.db('portfolio_chat');
    const collection = db.collection('chat_messages');
    const settingsCol = db.collection('chat_settings');

    const url = new URL(req.url, 'http://localhost');
    const query = req.query || Object.fromEntries(url.searchParams);

    // Fetch live settings
    const settings = await getChatSettings(db);

    // GET: Fetch messages & settings
    if (req.method === 'GET') {
      const { sessionId, admin } = query;

      let filter = {};
      if (admin === 'true') {
        // Admin gets all messages across all visitors
        filter = {};
      } else if (sessionId) {
        // Visitor gets their own conversation thread + admin replies addressed to them or all
        filter = {
          $or: [
            { sessionId: sessionId },
            { recipient: sessionId },
            { sessionId: 'all' },
            { broadcast: true },
          ],
        };
      }

      const docs = await collection
        .find(filter)
        .sort({ createdAt: 1 })
        .limit(200)
        .toArray();

      const messages = docs.map((d) => ({
        id: d.messageId || d._id.toString(),
        sender: d.sender,
        author: d.author,
        text: d.text,
        timestamp: d.timestamp,
        sessionId: d.sessionId,
        recipient: d.recipient,
        read: d.read ?? true,
      }));

      // Deliver thread-specific or admin-level settings
      if (admin === 'true') {
        return sendJson(200, {
          success: true,
          messages,
          settings: {
            isOnline: settings.isOnline,
            aiAutoReply: settings.aiAutoReply,
            statusMessage: settings.statusMessage,
            disabledThreads: settings.disabledThreads,
          },
        });
      } else {
        const isThreadAiDisabled = sessionId ? settings.disabledThreads.includes(sessionId) : false;
        return sendJson(200, {
          success: true,
          messages,
          settings: {
            isOnline: settings.isOnline,
            aiAutoReply: settings.aiAutoReply,
            statusMessage: settings.statusMessage,
            isThreadAiDisabled,
          },
        });
      }
    }

    // POST: Send new message OR update settings
    if (req.method === 'POST') {
      const body = await parseBody(req);

      // Action 1: Update Global Settings
      if (body.action === 'update_settings') {
        const updateFields = {};
        if (body.aiAutoReply !== undefined) updateFields.aiAutoReply = Boolean(body.aiAutoReply);
        if (body.isOnline !== undefined) updateFields.isOnline = Boolean(body.isOnline);
        if (body.statusMessage !== undefined) updateFields.statusMessage = String(body.statusMessage);

        await settingsCol.updateOne(
          { _id: 'global_settings' },
          { $set: updateFields },
          { upsert: true }
        );
        const updated = await getChatSettings(db);
        return sendJson(200, { success: true, settings: updated });
      }

      // Action 2: Toggle AI Auto-Reply for a Specific Visitor Thread
      if (body.action === 'toggle_thread_ai') {
        const { sessionId, disableAi } = body;
        if (!sessionId) {
          return sendJson(400, { success: false, error: 'sessionId is required to toggle thread AI' });
        }

        if (disableAi) {
          await settingsCol.updateOne(
            { _id: 'global_settings' },
            { $addToSet: { disabledThreads: sessionId } },
            { upsert: true }
          );
        } else {
          await settingsCol.updateOne(
            { _id: 'global_settings' },
            { $pull: { disabledThreads: sessionId } },
            { upsert: true }
          );
        }

        const updated = await getChatSettings(db);
        return sendJson(200, {
          success: true,
          sessionId,
          isThreadAiDisabled: Boolean(disableAi),
          disabledThreads: updated.disabledThreads,
        });
      }

      // Normal Message Posting
      const { id, sender, author, text, sessionId, timestamp, recipient, broadcast } = body;

      if (!text || typeof text !== 'string' || !text.trim()) {
        return sendJson(400, { success: false, error: 'Message text is required' });
      }

      const doc = {
        messageId: id || 'msg_' + Date.now(),
        sender: sender || 'user',
        author: author || (sender === 'admin' ? 'Samium Bashir Badhan' : 'Visitor'),
        text: text.trim(),
        sessionId: sessionId || 'visitor_default',
        recipient: recipient || null,
        broadcast: Boolean(broadcast),
        timestamp:
          timestamp ||
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        createdAt: new Date(),
      };

      await collection.insertOne(doc);

      return sendJson(201, {
        success: true,
        message: {
          id: doc.messageId,
          sender: doc.sender,
          author: doc.author,
          text: doc.text,
          timestamp: doc.timestamp,
          sessionId: doc.sessionId,
          recipient: doc.recipient,
          read: doc.read,
        },
      });
    }

    // DELETE: Clear messages (Admin action)
    if (req.method === 'DELETE') {
      const { sessionId } = query;
      if (sessionId && sessionId !== 'all') {
        await collection.deleteMany({
          $or: [{ sessionId }, { recipient: sessionId }],
        });
      } else {
        await collection.deleteMany({});
      }
      return sendJson(200, { success: true, message: 'Messages cleared' });
    }

    return sendJson(405, { success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Chat API Error:', error);
    return sendJson(500, { success: false, error: error.message });
  }
}
