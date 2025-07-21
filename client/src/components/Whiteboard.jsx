import React from 'react';
import { useParams } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';

const Whiteboard = () => {
  const { roomId } = useParams();

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Room: {roomId}</h3>
      <Toolbar />
      <DrawingCanvas roomId={roomId} />
    </div>
  );
};

export default Whiteboard;
