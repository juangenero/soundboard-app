import axios from 'axios';

// Test
export async function simulateCall({ resolvePromise = true, time = 1000 }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolvePromise) resolve('Promesa resuelta con éxito');
      else reject('Promesa rechazada');
    }, time);
  });
}

// Login

export async function login() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/login`);
}

// Sonidos

export async function addSound(formData) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/audio/upload`, formData);
}

export async function getAudios() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/audio`);
}

export async function playSonido(id) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/audio/play/${id}`);
}
