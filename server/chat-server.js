/* ==========================================================================
   REAL-TIME SOCKET.IO CHAT SERVER
   AUTHOR: SAMIUM BASHIR BADHAN
   USAGE: node server/chat-server.js
   ========================================================================== */

import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK', service: 'Samium Live Chat Socket.IO Server', time: new Date().toISOString() }));
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`[Socket] New connection established: ${socket.id}`);

  socket.on('message', (msg) => {
    console.log(`[Message] From ${msg.sender}: ${msg.text}`);
    socket.broadcast.emit('message', msg);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Live Chat Socket.IO Server listening on http://localhost:${PORT}`);
});
