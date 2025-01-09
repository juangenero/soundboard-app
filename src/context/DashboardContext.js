import React, { createContext, useState } from 'react';
import { addFavLS, getIdsFavLS, removeFavLS } from '../services/localStorage.service';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
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
    <DashboardContext.Provider
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
        addFavorite, // !! Función star
        removeFavorite, // !! Función star
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
