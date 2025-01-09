import React from 'react';
import './App.css';
import { DashboardProvider } from './context/DashboardContext.js';
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
