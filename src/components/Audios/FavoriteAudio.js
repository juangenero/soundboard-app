import { Star, StarBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import DashboardContext from '../../context/DashboardContext.js';
import { getIdsFavLS } from './../../services/localStorage.service.js';

const FavoriteAudio = (props) => {
  const { idAudio } = props;
  const favs = getIdsFavLS();
  const [favorite, setFavorite] = useState(favs.includes(idAudio)); // Si ha marcado favorito (estrella)
  const { addFavorite, removeFavorite } = useContext(DashboardContext); // IDs de los audios favoritos

  function handleClickFavorite() {
    setFavorite(!favorite);
    if (!favorite) addFavorite(idAudio);
    else removeFavorite(idAudio);
  }

  return (
    <IconButton
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
      }}
      onClick={() => {
        handleClickFavorite();
      }}
    >
      {favorite ? <Star color="primary" /> : <StarBorder />}
    </IconButton>
  );
};

export default FavoriteAudio;
