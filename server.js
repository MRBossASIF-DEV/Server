const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Handle root URL
app.get('/', (req, res) => {
    res.send('WebSocket server is running. Connect using ws://<your-server-url>');
});

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

server.listen(process.env.PORT || 3000, () => {
    console.log('Signaling server is running');
});