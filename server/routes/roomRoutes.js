const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// POST /api/rooms/join
router.post('/join', async (req, res) => {
  const { roomId } = req.body;

  if (!roomId) return res.status(400).json({ error: 'Room ID is required' });

  let room = await Room.findOne({ roomId });

  if (!room) {
    room = new Room({ roomId });
    await room.save();
  }

  res.status(200).json(room);
});

// GET /api/rooms/:roomId
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
