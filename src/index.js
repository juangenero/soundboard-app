import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomAlert from './components/common/CustomAlert.js';
import { AlertProvider } from './context/Alert.context.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
      <CustomAlert />
    </AlertProvider>
  </React.StrictMode>
);
