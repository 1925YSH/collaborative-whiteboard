import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomJoin = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const joinRoom = async () => {
    if (!roomId || roomId.length < 6) {
      alert('Room code must be at least 6 characters');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/rooms/join', { roomId });
      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      alert('Could not join or create room');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h1>Join a Whiteboard Room</h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{ padding: '10px', width: '200px' }}
      />
      <br /><br />
      <button onClick={joinRoom} style={{ padding: '10px 20px' }}>
        Join Room
      </button>
    </div>
  );
};

export default RoomJoin;
