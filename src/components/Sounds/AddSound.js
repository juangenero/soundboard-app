import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { addSound } from '../../services/api.service.js';

function AddSound() {
  const [open, setOpen] = useState(false); // Estado para el modal
  const [nombre, setNombre] = useState('');
  const [sonido, setSonido] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Nombre del sonido: ${nombre}`);
    console.log(`Sonido seleccionado: `, sonido);

    // Lógica para añadir el sonido
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('sonido', sonido);

    // Enviar formdata al backend
    addSound(formData)
      .then((data) => {
        console.log(`Data: ${data}`);
        handleClose();
      })
      .catch((err) => {
        console.log(`Ocurrió un error: ${err}`);
        handleClose();
      });
  };

  return (
    <>
      <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
        Añadir
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir Sonido</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre del sonido"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input type="file" onChange={(e) => setSonido(e.target.files[0])} accept="audio/*" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="danger">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSound;
