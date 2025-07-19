const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors()); // agar frontend bisa akses

const server = http.createServer(app);

// setup socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend React
    methods: ["GET", "POST"]
  }
});

// saat client terhubung
io.on('connection', (socket) => {
  console.log('🔌 New client connected: ' + socket.id);

  // handle pesan dari client
  socket.on('send_message', (data) => {
    console.log('📨 Message received: ', data);
    // broadcast ke semua client
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected: ' + socket.id);
  });
});

// default route
app.get('/', (req, res) => {
  res.send('WebSocket server running!');
});

const PORT = 3001;
server.listen(PORT, () => console.log(`✅ Server listening at http://localhost:${PORT}`));
