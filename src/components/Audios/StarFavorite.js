import { Star, StarBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { useContext, useState } from 'react';
import DashboardContext from '../../context/DashboardContext.js';
import { getIdsFavLS } from '../../services/localStorage.service.js';

const StarFavorite = (props) => {
  const { idAudio } = props;

  const isFav = getIdsFavLS().includes(idAudio); // Obtener si el audio está en favoritos
  const [favorite, setFavorite] = useState(isFav); // Si ha marcado favorito (estrella)
  const { addFavorite, removeFavorite } = useContext(DashboardContext); // Funciones para añadir/quitar favoritos

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
        {favorite ? <Star color="primary" /> : <StarBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default StarFavorite;
