const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const roomRoutes = require('./routes/roomRoutes');
const handleSocket = require('./socket/socketHandlers');
import { Drawing } from './models/Drawing.js';

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/rooms', roomRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// WebSocket handling
io.on('connection', (socket) => {
  handleSocket(io, socket);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
