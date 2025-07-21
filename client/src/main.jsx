import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import RoomJoin from './components/RoomJoin.jsx';
import Whiteboard from './components/Whiteboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RoomJoin />} />
      <Route path="/room/:roomId" element={<Whiteboard />} />
    </Routes>
  </BrowserRouter>
);
