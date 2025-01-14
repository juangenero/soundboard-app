import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  SvgIcon,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { playAudio } from '../../services/api.service.js';
import background from './../../assets/images/bg-card2.png';
import HearthFavorite from './HearthFavorite.js';
const CardAudio = (props) => {
  const { audio, playRef } = props;
  const urlEmojis = 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/';

  const [loading, setLoading] = useState(false);
  const [hoverCard, setHoverCard] = useState(false);
  const [maxPlayersOnUse, setMaxPlayersOnUse] = useState(false);

  function closeModalFn(reason = undefined) {
    setMaxPlayersOnUse(false);
  }

  useEffect(() => {
    if (maxPlayersOnUse) {
      const timer = setTimeout(closeModalFn, 5000);
      return () => clearTimeout(timer);
    }
  }, [maxPlayersOnUse]);

  async function handlePlayClick() {
    // Cancelar solicitud previa si existe
    if (playRef.current) {
      playRef.current.abort();
    }

    const newPlayRef = new AbortController();
    handleSetController(newPlayRef);

    setLoading(true);

    playAudio(audio.id, newPlayRef)
      .then((res) => {
        if (res.data.maxPlayerOnUse) setMaxPlayersOnUse(true);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  // Controla las peticiones rechazadas cuando se crean nuevas al reproducir audios
  const handleSetController = (controller) => {
    if (playRef.current) {
      playRef.current.abort();
    }
    playRef.current = controller;
  };

  // Cuando el ratón entra en al card
  function handleClickHover() {
    setHoverCard(true);
  }

  // Cuando sale el ratón de la card
  function handleClickUnHover() {
    setHoverCard(false);
  }

  return (
    <>
      <Card
        onClick={!loading ? handlePlayClick : undefined}
        onMouseEnter={handleClickHover}
        onMouseLeave={handleClickUnHover}
        sx={{
          position: 'relative',
          backgroundImage: `url(${background})`,
          borderRadius: '12px',
          boxShadow: 'none',
          width: '180px',
          height: 'auto',
          border: '1px solid gray',
          cursor: hoverCard ? 'pointer' : 'default',
        }}
      >
        <CardContent>
          {/* Emoji */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Icono favorito */}
            {hoverCard ? <HearthFavorite idAudio={audio.id} /> : undefined}
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50, opacity: hoverCard ? 0.5 : 1 }}
              image={`${urlEmojis}${audio.emoji}.png`}
              alt="Not found"
            />
          </Box>
          {/* Nombre del audio */}
          <Box sx={{ opacity: hoverCard ? 0.5 : 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: 'Playwrite AU SA, sans-serif',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {audio.nombre}
            </Typography>
          </Box>

          {/* Icono play hover */}
          {hoverCard && (
            <SvgIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '75px',
                opacity: loading ? 0.5 : 1,
              }}
            >
              <svg viewBox="0 0 64 64" width="64" height="64">
                <circle cx="32" cy="32" r="32" fill="#4285F4" />
                <polygon points="26,16 26,48 48,32" fill="#FFFFFF" />
              </svg>
            </SvgIcon>
          )}
        </CardContent>
      </Card>

      {/* Modal SPAM */}
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

export default CardAudio;
