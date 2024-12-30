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
import { getSonidos } from '../../services/api.service.js';
import PlaySound from './PlaySound.js';

const ShowSounds = () => {
  const [sonidos, setSonidos] = useState([]);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const response = await getSonidos();
        setSonidos(response.data);
      } catch (error) {
        console.error('Error al recuperar los sonidos:', error);
      }
    };

    fetchSounds();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Sonido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sonidos.map((sonido) => (
              <TableRow key={sonido.id}>
                <TableCell>{sonido.nombre}</TableCell>
                <TableCell>{sonido.sonido}</TableCell>
                <TableCell>
                  <PlaySound id={sonido.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowSounds;
