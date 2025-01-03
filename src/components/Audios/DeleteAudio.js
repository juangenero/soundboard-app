import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const DeleteAudio = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, nombre, handleDeleteAudio } = props;

  // MODAL
  const openModalFn = () => {
    setOpenModal(true);
  };

  const closeModalFn = () => {
    setOpenModal(false);
    setLoading(false);
  };

  async function handleClick() {
    setLoading(true);

    try {
      handleDeleteAudio(id);
      closeModalFn();
    } catch (err) {
      closeModalFn();
    }
  }

  return (
    <>
      {/* Botón de eliminar */}
      <IconButton
        onClick={openModalFn}
        disabled={loading}
        style={{ backgroundColor: 'lightgray', color: 'red' }}
      >
        <Delete fontSize="medium" />
      </IconButton>

      {/* Modal */}
      <Dialog open={openModal} onClose={closeModalFn}>
        <DialogTitle>Eliminar {`"${nombre}"`}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que quieres eliminar{' '}
            <Box component="span" fontWeight="fontWeightBold">
              {' '}
              {nombre}
            </Box>
            ? Esta acción es irreversible.
          </Typography>
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

          <Button onClick={handleClick} variant="contained" color="error" disabled={loading}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAudio;
