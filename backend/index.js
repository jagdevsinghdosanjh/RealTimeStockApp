const express = require('express');
const axios = require('axios');
const WebSocket = require('ws');

const app = express();
const port = 3000;

let stockData = [];

// Replace with your stock API key and endpoint
const stockApiKey = 'YOUR_API_KEY';
const stockApiUrl = 'https://api.example.com/stocks';

// Fetch stock data from the API
const fetchStockData = async () => {
try {
    const response = await axios.get(stockApiUrl, {
    headers: { 'Authorization': `Bearer ${stockApiKey}` }
    });
    stockData = response.data;
} catch (error) {
    console.error('Error fetching stock data:', error);
}
};

// Periodically fetch stock data
setInterval(fetchStockData, 10000);

app.get('/stocks', (req, res) => {
res.json(stockData);
});

const server = app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
console.log('Client connected');
ws.send(JSON.stringify(stockData));

  // Send updates every 10 seconds
const interval = setInterval(() => {
    ws.send(JSON.stringify(stockData));
}, 10000);

ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
});
});
