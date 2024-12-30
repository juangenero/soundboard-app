import React from 'react';
import { login } from '../../services/api.service.js';

export const ButtonLogin = () => {
  const handleLogin = async () => {
    try {
      const { data } = await login();
      if (data.redirectUri) {
        window.location.href = data.redirectUri;
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
};
