// AlertContext.js
import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, severity = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, severity }]);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert, removeAlert, alerts }}>
      {children}
    </AlertContext.Provider>
  );
};
