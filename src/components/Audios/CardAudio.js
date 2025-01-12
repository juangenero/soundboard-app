import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import background from '../../assets/images/bg-card2.png';
import HearthFavorite from './HearthFavorite.js';
import PlayAudio from './PlayAudio.js';

const CardAudio = (props) => {
  const { audio, playRef } = props;
  const urlEmojis = 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/';

  // Controla las peticiones rechazadas cuando se crean nuevas al reproducir audios
  const handleSetController = (controller) => {
    if (playRef.current) {
      playRef.current.abort();
    }
    playRef.current = controller;
  };

  return (
    <Card
      sx={{
        backgroundImage: `url(${background})`,
        border: '2px solid gray',
        borderRadius: '32px',
        boxShadow: 'none',
        width: 250,
        position: 'relative', // Para poner el icono de favorito como posición "absoluta"
      }}
    >
      <CardContent>
        {/* Icono favorito */}
        <HearthFavorite idAudio={audio.id} />

        {/* Emoji */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 50, height: 50 }}
            image={`${urlEmojis}${audio.emoji}.png`}
            alt="Not found"
          />
        </Box>
        {/* Nombre del audio */}
        <Typography
          variant="subtitle1"
          component="div"
          align="center"
          sx={{ fontFamily: 'Playwrite AU SA, sans-serif' }}
        >
          {audio.nombre}
        </Typography>
      </CardContent>

      {/* Botonera */}
      <CardActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlayAudio
          key={audio.id}
          id={audio.id}
          abort={{
            playCurrent: playRef.current,
            handleSetController: handleSetController,
          }}
        />
      </CardActions>
    </Card>
  );
};

export default CardAudio;
