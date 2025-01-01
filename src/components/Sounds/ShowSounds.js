import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { React, useEffect, useState } from 'react';
import { getAudios } from '../../services/api.service.js';
import PlaySound from './PlaySound.js';

const ShowSounds = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const response = await getAudios();
        setAudios(response.data);
      } catch (error) {
        console.error('Error al recuperar los audios:', error);
      }
    };

    fetchSounds();
  }, []);

  return (
    <>
      {audios.length === 0 && <h2>No hay sonidos para mostrar</h2>}
      {audios.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Audio</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audios.map((audio) => (
                <TableRow key={audio.id}>
                  <TableCell>{audio.nombre}</TableCell>
                  <TableCell>{audio.sonido}</TableCell>
                  <TableCell>
                    <PlaySound id={audio.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ShowSounds;
