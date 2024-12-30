import axios from 'axios';

// Login

export async function login() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/login`);
}

// Sonidos

export async function addSound(formData) {
  return await axios.post(`${process.env.REACT_APP_API_URL}/sonido/upload`, formData);
}

export async function getSonidos() {
  return await axios.get(`${process.env.REACT_APP_API_URL}/sonido`);
}

export async function playSonido(id) {
  return await axios.get(`${process.env.REACT_APP_API_URL}/sonido/play/${id}`);
}
