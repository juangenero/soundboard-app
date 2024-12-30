import React from 'react';
import { playSonido } from '../../services/api.service.js';

const PlaySound = (props) => {
  async function handlePlayClick() {
    try {
      const response = await playSonido(props.id);
      // if (!response.ok) {
      //   throw new Error('Error en la llamada al endpoint');
      // }
      // const data = await response.json();
      console.log('Respuesta reproducir sonido: ', response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return <button onClick={handlePlayClick}>▶️ Play</button>;
};

export default PlaySound;
