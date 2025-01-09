import { Box, TextField } from '@mui/material';
import { useContext, useEffect } from 'react';
import DashboardContext from '../../context/DashboardContext.js';
import { addAudio, deleteAudio, getAudios } from '../../services/api.service.js';
import AddAudio from './AddAudio.js';
import ShowAudios from './ShowAudios.js';
import SwitchFavorite from './SwitchFavorite.js';

function ManageAudios() {
  const { audios, setAudios } = useContext(DashboardContext); // Audios recibido desde el servidor
  const { audiosFav, setAudiosFav } = useContext(DashboardContext); // Audios marcados como favoritos
  const { audiosFiltered, setAudiosFiltered } = useContext(DashboardContext); // Audios marcados como favoritos

  const { activeFav, setActiveFav } = useContext(DashboardContext); // Switch activo (boolean)
  const { idsFav, setIdsFav } = useContext(DashboardContext); // IDs de los audios favoritos

  const { search, setSearch } = useContext(DashboardContext); // Término de búsqueda

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    handleSearchAudio(search);
  }, [activeFav]);

  // Iniciar estados
  const init = async () => {
    const data = await fetchAudios();
    setAudiosFiltered(data);
  };

  // Obtener audios del servidor
  const fetchAudios = async () => {
    try {
      const response = await getAudios();
      setAudios(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al recuperar los audios:', error);
    }
  };

  // Buscar audio
  function handleSearchAudio(str) {
    setSearch(str);
    if (!activeFav) {
      setAudiosFiltered(
        audios.filter((audio) => audio.nombre.toLowerCase().includes(str.toLowerCase()))
      );
    } else {
      setAudiosFiltered(
        audios.filter(
          (audio) =>
            audio.nombre.toLowerCase().includes(str.toLowerCase()) && idsFav.includes(audio.id)
        )
      );
    }
  }

  // Añadir audio
  async function handleAddAudio(formData) {
    const { data } = await addAudio(formData);
    fetchAudios();
  }

  // Eliminar audio
  async function handleDeleteAudio(id) {
    const { data } = await deleteAudio(id);
    fetchAudios();
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        {/* Botón de añadir */}
        <Box sx={{ paddingLeft: '25 px' }}>
          <AddAudio handleAddAudio={handleAddAudio} />
        </Box>
        {/* Cuadro de búsqueda */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            sx={{ width: '400px', marginRight: '80px', background: '#e3e1e1' }}
            label="Buscar"
            variant="outlined"
            value={search}
            onChange={(e) => handleSearchAudio(e.target.value)}
          />
        </Box>
        <SwitchFavorite />
      </Box>
      <ShowAudios />
    </>
  );
}

export default ManageAudios;
