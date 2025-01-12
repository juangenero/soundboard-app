import React, { createContext, useState } from 'react';
import { addFavLS, getIdsFavLS, removeFavLS } from '../services/localStorage.service';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // - - - - - ESTADOS - - - - -
  const [audios, setAudios] = useState([]);
  const [audiosFiltered, setAudiosFiltered] = useState([]);
  const [search, setSearch] = useState('');

  const [favSwitch, setFavSwitch] = useState(false); // Switch para mostrar favoritos
  const [idsFav, setIdsFav] = useState(getIdsFavLS()); // Array de ids de audios favoritos

  // - - - - - FUNCIONES - - - - -

  // Añadir favorito
  const addFavorite = (idAudio) => {
    setIdsFav([...idsFav, idAudio]);
    addFavLS(idAudio);
  };

  // Eliminar favorito
  const removeFavorite = (idAudio) => {
    setIdsFav(idsFav.filter((id) => id !== idAudio));
    removeFavLS(idAudio);
  };

  return (
    <AudioContext.Provider
      value={{
        // Lista de audios
        audios,
        setAudios,
        audiosFiltered,
        setAudiosFiltered,

        // Búsqueda
        search,
        setSearch,

        // Audios favoritos
        favSwitch,
        setFavSwitch,
        idsFav,
        setIdsFav,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
