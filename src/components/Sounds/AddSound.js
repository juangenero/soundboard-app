import { Add, FileUpload } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { addSound } from '../../services/api.service';

function AddSound() {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    audioName: '',
    audioFile: null,
    nombre: '',
  });
  const [formErrors, setFormErrors] = useState({
    audioFile: false,
    nombre: false,
  });

  const fileInputRef = React.useRef(null); // Referencia input archivo
  const minLengthNombre = 3; // Validaciones

  // MODAL
  const openModalFn = () => {
    setOpenModal(true);
  };

  const closeModalFn = () => {
    cleanValuesForm();
    cleanErrorsForm();
    setOpenModal(false);
  };

  // Botón Guardar
  function handleSubmit(event) {
    event.preventDefault();

    const formValid = validateForm();
    if (!formValid) return;

    console.log('Enviando audio -> ', formValues.audioFile?.name);

    // Lógica para añadir el audio
    const formData = new FormData();
    formData.append('nombre', formValues.nombre);
    formData.append('sonido', formValues.audioFile);

    // Enviar formdata al backend
    addSound(formData)
      .then((data) => {
        closeModalFn();
      })
      .catch((err) => {
        console.error(`Ocurrió un error: ${err}`);
        closeModalFn();
      });
  }

  // VALIDACIONES
  function validateForm() {
    const audioValido = validateFile(formValues.audioName);
    const nombreValido = validateNombre(formValues.nombre);
    setFormErrors({ ...formErrors, audioFile: !audioValido, nombre: !nombreValido });
    return nombreValido;
  }

  const validateNombre = (nombre) => {
    return nombre.trim().length >= minLengthNombre;
  };

  const validateFile = (fileName) => {
    return fileName && fileName.length > 0;
  };

  // Botón explorar
  function handleFileSelec(event) {
    if (event.target.files.length > 0) {
      setFormValues({
        ...formValues,
        audioFile: event.target.files[0],
        audioName: event.target.files[0]?.name || '',
      });
    }
  }

  // Limpiar valores form
  function cleanValuesForm() {
    setFormValues({
      audioName: '',
      audioFile: null,
      nombre: '',
    });
  }

  // Limpiar errores form
  function cleanErrorsForm() {
    const cleanErrors = Object.keys(formErrors).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    console.log(cleanErrors);
    setFormErrors(cleanErrors);
  }

  return (
    <>
      <Button variant="contained" startIcon={<Add />} onClick={openModalFn}>
        Añadir
      </Button>
      <Dialog open={openModal} onClose={closeModalFn}>
        <DialogTitle>Subir un audio</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={1}>
            {/* 1 - Input archivo de audio */}
            <Grid2 size={9}>
              <TextField
                margin="normal"
                placeholder="Elige un audio"
                error={formErrors.audioFile}
                helperText={formErrors.audioFile && `Elige un audio`}
                value={formValues.audioName}
                fullWidth
                variant="outlined"
                inputProps={{ readOnly: true }}
                onClick={() => fileInputRef.current?.click()}
              />
            </Grid2>

            {/* 2 - Botón explorar */}
            <Grid2
              size={3}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Button variant="contained" component="label" startIcon={<FileUpload />}>
                Explorar
                <input
                  type="file"
                  accept="audio/*"
                  ref={fileInputRef}
                  onChange={(e) => handleFileSelec(e)}
                  hidden
                />
              </Button>
            </Grid2>

            {/* 3 - Nombre del audio */}
            <Grid2 size={12}>
              <TextField
                margin="dense"
                label="Nombre del audio"
                error={formErrors.nombre}
                helperText={formErrors.nombre && `Mínimo de ${minLengthNombre} caracteres`}
                fullWidth
                value={formValues.nombre}
                required
                onChange={(e) => {
                  setFormValues({ ...formValues, nombre: e.target.value });
                }}
              />
            </Grid2>

            {/* 4 - Icono */}
            <Grid2 size={0}></Grid2>

            {/* 5 - Volumen del audio */}
            <Grid2 size={0}></Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalFn} color="danger">
            Cancelar
          </Button>

          <Button onClick={handleSubmit} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSound;
