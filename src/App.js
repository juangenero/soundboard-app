import React from 'react';
import './App.css';
import { AudioProvider } from './context/AudioContext.js';
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <AudioProvider>
      <Dashboard />
    </AudioProvider>
  );
}

export default App;
