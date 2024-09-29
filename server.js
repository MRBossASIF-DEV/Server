const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

// Use the port assigned by Vercel or 3000 as fallback
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Signaling server is running on ws://localhost:${PORT}`);
});