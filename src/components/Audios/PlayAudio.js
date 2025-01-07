import { PlayArrow } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { playAudio } from '../../services/api.service.js';

const secondsModalSpam = 5;

const PlayAudio = (props) => {
  const [loading, setLoading] = useState(false);
  const [maxPlayersOnUse, setMaxPlayersOnUse] = useState(false);
  const { controllerCurrent, handleSetController } = props.abort;

  // const styleBtnDefault = {
  //   backgroundColor: 'lightblue',
  //   color: 'black',
  //   marginRight: '10px',
  // };

  // const styleBtnLoading = {
  //   backgroundColor: 'lightgray',
  //   color: 'gray',
  //   marginRight: '10px',
  // };

  function closeModalFn(reason = undefined) {
    setMaxPlayersOnUse(false);
  }

  useEffect(() => {
    if (maxPlayersOnUse) {
      const timer = setTimeout(closeModalFn, secondsModalSpam * 1000);
      return () => clearTimeout(timer);
    }
  }, [maxPlayersOnUse]);

  async function handlePlayClick() {
    // Cancelar solicitud previa si existe
    if (controllerCurrent) {
      controllerCurrent.abort();
    }

    const newController = new AbortController();
    handleSetController(newController);

    setLoading(true);

    playAudio(props.id, newController)
      .then((res) => {
        if (res.data.maxPlayerOnUse) setMaxPlayersOnUse(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  // style={loading ? styleBtnLoading : styleBtnDefault}
  return (
    <>
      <IconButton
        onClick={handlePlayClick}
        sx={{
          backgroundColor: '#f5f5f5', // Color de fondo
          border: '2px solid gray', // Borde gris para armonizar con la tarjeta
          borderRadius: '50%', // Forma circular
          padding: '10px', // Espaciado interno
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra ligera
          '&:hover': {
            backgroundColor: '#e0e0e0', // Cambia el color al pasar el ratón
          },
          '&:disabled': {
            backgroundColor: '#cccccc', // Color para el estado deshabilitado
            border: '2px solid #aaaaaa',
          },
        }}
        disabled={loading}
      >
        <PlayArrow fontSize="large" />
      </IconButton>

      {/* Modal de aviso de spam */}
      <Dialog
        open={maxPlayersOnUse}
        disableEscapeKeyDown={true}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            closeModalFn();
          }
        }}
      >
        <DialogTitle>CPU del servidor al 100%</DialogTitle>
        <DialogContent>
          <Typography>Espera un poco o apoquina pasta para el server 😭😭😭</Typography>
        </DialogContent>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Dialog>
    </>
  );
};

export default PlayAudio;
