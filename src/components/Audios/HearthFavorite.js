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

  function handleClickFavorite(ev) {
    ev.stopPropagation();

    // Actualizar estado local
    setFavorite(!favorite);

    // Actualizar estados globales
    if (!favorite) addFavorite(idAudio);
    else removeFavorite(idAudio);
  }

  return (
    <Tooltip title="Añadir a favoritos" placement="top">
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 6,
          right: 6,
        }}
        onClick={(ev) => {
          handleClickFavorite(ev);
        }}
      >
        {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default HearthFavorite;
