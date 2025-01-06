import { FileUpload } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid2,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

function AddAudios({ handleAddAudio }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const maxLengthNombre = 24;
  const maxFileSize = 1048576;

  // MODAL
  const openModalFn = () => {
    setOpenModal(true);
  };

  const closeModalFn = () => {
    cleanValuesForm();
    cleanErrorsForm();
    setOpenModal(false);
    setLoading(false);
  };

  // Botón Guardar
  async function handleSubmit(event) {
    event.preventDefault();

    const formValid = validateForm();
    if (!formValid) return;

    // Lógica para añadir el audio
    const formData = new FormData();
    formData.append('nombre', formValues.nombre);
    formData.append('audio', formValues.audioFile);

    setLoading(true);

    // Enviar formdata al backend
    try {
      await handleAddAudio(formData);
      setLoading(false);
      closeModalFn();
    } catch (err) {
      setLoading(false);
      closeModalFn();
    }
  }

  // VALIDACIONES
  function validateForm() {
    const audioValido = validateFile(formValues.audioFile);
    const nombreValido = validateNombre(formValues.nombre);
    setFormErrors({ ...formErrors, audioFile: !audioValido, nombre: !nombreValido });
    return audioValido && nombreValido;
  }

  const validateFile = (file) => {
    let fileExists = file && file.name.length > 0;
    let fileSize = file && file.size < maxFileSize;

    return fileExists && fileSize;
  };

  const validateNombre = (nombre) => {
    let cleanedNombre = nombre.trim();
    let minNombre = cleanedNombre.length >= minLengthNombre;
    let maxNombre = cleanedNombre.length <= maxLengthNombre;

    return minNombre && maxNombre;
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

    setFormErrors(cleanErrors);
  }

  // https://www.npmjs.com/package/emoji-picker-react

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Fab color="primary" aria-label="add" onClick={openModalFn}>
          <AddIcon />
        </Fab>
      </Box>
      <Dialog open={openModal} onClose={closeModalFn}>
        <DialogTitle>Subir un audio</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={1}>
            {/* 1 - Input / button archivo de audio */}
            <Grid2 size={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                margin="normal"
                placeholder="Elige un audio *"
                error={formErrors.audioFile}
                helperText={formErrors.audioFile && `Elige un audio (1 MB máximo)`}
                value={formValues.audioName}
                fullWidth
                variant="outlined"
                slotProps={{ input: { readOnly: true } }}
                onClick={() => fileInputRef.current?.click()}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                component="label"
                startIcon={<FileUpload />}
                sx={{ ml: 1 }}
              >
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

            {/* 2 - Nombre del audio */}
            <Grid2 size={12}>
              <TextField
                margin="dense"
                label="Nombre del audio"
                error={formErrors.nombre}
                helperText={
                  formErrors.nombre && `El nombre debe tener al menos ${minLengthNombre} carácteres`
                }
                fullWidth
                value={formValues.nombre}
                required
                slotProps={{ htmlInput: { maxLength: maxLengthNombre } }}
                onChange={(e) => {
                  setFormValues({ ...formValues, nombre: e.target.value });
                }}
              />
            </Grid2>

            {/* 3 - Icono */}
            <Grid2 size={0}></Grid2>

            {/* 4 - Volumen del audio */}
            <Grid2 size={0}></Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeModalFn}
            color="danger"
            sx={{
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Cancelar
          </Button>

          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAudios;
