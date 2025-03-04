const express = require('express');
const puppeteer = require('puppeteer');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;

// Servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket.');
    
    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

// Rota de teste do servidor HTTP
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Inicia o servidor Express
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
