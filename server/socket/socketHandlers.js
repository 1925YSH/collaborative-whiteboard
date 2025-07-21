const Room = require('../models/Room');

module.exports = function handleSocket(io, socket) {
  console.log('New client connected:', socket.id);

  socket.on('join-room', async ({ roomId }) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);

    const room = await Room.findOne({ roomId });
    if (room) {
      socket.emit('load-canvas', room.drawingData);
    }

    // Notify about presence
    const userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    io.to(roomId).emit('user-count', userCount);
  });

  socket.on('draw-move', async ({ roomId, command }) => {
    await Room.updateOne(
      { roomId },
      { $push: { drawingData: command }, $set: { lastActivity: new Date() } }

      
    );

    socket.to(roomId).emit('draw-move', command);
  });

  socket.on('clear-canvas', async ({ roomId }) => {
    await Room.updateOne({ roomId }, { $set: { drawingData: [] } });

    io.to(roomId).emit('clear-canvas');
  });

  socket.on('cursor-move', ({ roomId, cursor }) => {
    socket.to(roomId).emit('cursor-move', { id: socket.id, cursor });
  });

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const userCount = (io.sockets.adapter.rooms.get(roomId)?.size || 1) - 1;
        io.to(roomId).emit('user-count', userCount);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
};
