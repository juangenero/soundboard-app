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

// Audios

export async function addAudio(formData) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/audio/create`, formData);
}

export async function getAudios() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/audio`);
}

export async function playAudio(id) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/audio/play/${id}`);
}

export async function deleteAudio(id) {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/audio/delete/${id}`);
}
