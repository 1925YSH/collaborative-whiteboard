import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Toolbar from './Toolbar';

const DrawingCanvas = ({ roomId }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const socketRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  const [stroke, setStroke] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 150;
    canvas.style.border = '1px solid #ccc';

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctxRef.current = ctx;

    // Connect to Socket.IO
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join-room', { roomId });

    // Receive drawing data
    socketRef.current.on('draw-move', (command) => {
      const { x0, y0, x1, y1, color, stroke } = command.data;
      drawLine(x0, y0, x1, y1, color, stroke);
    });

    // Receive clear canvas command
    socketRef.current.on('clear-canvas', () => {
      clearCanvasLocal();
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const drawLine = (x0, y0, x1, y1, color, stroke) => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = color;
    ctx.lineWidth = stroke;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const x1 = e.nativeEvent.offsetX;
    const y1 = e.nativeEvent.offsetY;
    const x0 = ctxRef.current.lastX ?? x1;
    const y0 = ctxRef.current.lastY ?? y1;

    drawLine(x0, y0, x1, y1, color, stroke);

    socketRef.current.emit('draw-move', {
      roomId,
      command: {
        type: 'stroke',
        data: { x0, y0, x1, y1, color, stroke },
        timestamp: new Date(),
      },
    });

    ctxRef.current.lastX = x1;
    ctxRef.current.lastY = y1;
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    ctxRef.current.lastX = null;
    ctxRef.current.lastY = null;
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    ctxRef.current.lastX = null;
    ctxRef.current.lastY = null;
  };

  const clearCanvasLocal = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleClear = () => {
    clearCanvasLocal();
    socketRef.current.emit('clear-canvas', { roomId });
  };

  return (
    <div>
      <Toolbar
        color={color}
        setColor={setColor}
        stroke={stroke}
        setStroke={setStroke}
        clearCanvas={handleClear}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default DrawingCanvas;
