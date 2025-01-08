import { Star, StarBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import {
  addAudioToFavs,
  getFavsLocalStorage,
  removeAudioFromFavs,
} from './../../services/localStorage.service.js';

const FavoriteAudio = (props) => {
  const { idAudio } = props;
  const favs = getFavsLocalStorage();
  const [favorite, setFavorite] = useState(favs.includes(idAudio));

  function handleClickFavorite() {
    setFavorite(!favorite);
    if (!favorite) addAudioToFavs(idAudio);
    else removeAudioFromFavs(idAudio);
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
