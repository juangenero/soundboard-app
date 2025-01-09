import React, { createContext, useState } from 'react';
import { addFavLS, removeFavLS } from '../services/localStorage.service';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // - - - - - ESTADOS - - - - -
  const [audios, setAudios] = useState([]);
  const [audiosFav, setAudiosFav] = useState([]);
  const [audiosFiltered, setAudiosFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFav, setActiveFav] = useState(false);
  const [idsFav, setIdsFav] = useState([]);

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

  // Get active favorito

  // Set active favorito

  return (
    <DashboardContext.Provider
      value={{
        // Lista de audios
        audios,
        setAudios,
        audiosFav,
        setAudiosFav,
        audiosFiltered,
        setAudiosFiltered,

        // Audios favoritos
        activeFav,
        setActiveFav,
        idsFav,
        setIdsFav,
        addFavorite, // !! Función
        removeFavorite, // !! Función

        // Búsqueda
        search,
        setSearch,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
