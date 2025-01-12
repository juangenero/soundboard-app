import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useContext, useState } from 'react';
import AudioContext from '../../context/AudioContext.js';
import { getIdsFavLS } from '../../services/localStorage.service.js';

const HearthFavorite = (props) => {
  const { idAudio } = props;

  const isFav = getIdsFavLS().includes(idAudio); // Obtener si el audio está en favoritos
  const [favorite, setFavorite] = useState(isFav); // Si ha marcado favorito (estrella)
  const { addFavorite, removeFavorite } = useContext(AudioContext); // Funciones para añadir/quitar favoritos

  function handleClickFavorite() {
    // Actualizar estado local
    setFavorite(!favorite);

    // Actualizar estados globales
    if (!favorite) addFavorite(idAudio);
    else removeFavorite(idAudio);
  }

  return (
    <Tooltip title="Añadir a favoritos" placement="top">
      <IconButton
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}
        onClick={() => {
          handleClickFavorite();
        }}
      >
        {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default HearthFavorite;
