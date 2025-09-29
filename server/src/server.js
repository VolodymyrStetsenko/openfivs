import express from 'express';
import http from 'http';
import crypto from 'crypto';
import { WebSocketServer } from 'ws';

// Simple in-memory store of connected clients
const clients = new Map();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve a health endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// Broadcast a message to all connected clients
function broadcast(message, senderId) {
  for (const [id, ws] of clients.entries()) {
    if (id !== senderId && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }
}

wss.on('connection', (ws) => {
  const id = crypto.randomUUID();
  clients.set(id, ws);
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      switch (msg.type) {
        case 'join':
          // broadcast join event
          broadcast({ type: 'join', id, name: msg.name }, id);
          break;
        case 'move':
          broadcast({ type: 'move', id, x: msg.x, y: msg.y, z: msg.z }, id);
          break;
        default:
          console.warn('Unknown message type', msg.type);
      }
    } catch (err) {
      console.error('Invalid message', err);
    }
  });
  ws.on('close', () => {
    clients.delete(id);
    broadcast({ type: 'leave', id }, id);
  });
  // Send a welcome message with assigned ID
  ws.send(JSON.stringify({ type: 'welcome', id }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`OpenFIVS server listening on port ${PORT}`);
});
