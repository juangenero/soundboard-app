import { Box } from '@mui/material';
import { useContext, useEffect } from 'react';
import AudioContext from '../../context/AudioContext.js';
import { addAudio, deleteAudio, getAudios } from '../../services/api.service.js';
import AddAudio from './AddAudio.js';
import ListAudios from './ListAudios.js';
import SearchAudio from './SearchAudio.js';
import SwitchFavorite from './SwitchFavorite.js';
import SelectCanalDiscord from './temporal/SelectCanalDiscord.js';

function ManageAudios() {
  const { audios, setAudios } = useContext(AudioContext); // Audios recibido desde el servidor
  const { audiosFiltered, setAudiosFiltered } = useContext(AudioContext); // Audios marcados como favoritos
  const { search, setSearch } = useContext(AudioContext); // Término de búsqueda

  const { favSwitch, setFavSwitch } = useContext(AudioContext); // Switch activo (boolean)
  const { idsFav, setIdsFav } = useContext(AudioContext); // IDs de los audios favoritos

  useEffect(() => {
    fetchAudios();
  }, []);

  useEffect(() => {
    handleFilterAudio(search);
  }, [favSwitch, idsFav]);

  // Obtener audios del servidor
  const fetchAudios = async () => {
    try {
      const response = await getAudios();
      setAudios(response.data); // Guardar en el array de audios principal
      setAudiosFiltered(response.data); // Guardar en el array de audios filtrados
    } catch (error) {
      console.error('Error al recuperar los audios:', error);
    }
  };

  // Filtrar audio
  function handleFilterAudio(str) {
    setSearch(str);
    if (!favSwitch) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        {/* Contenedor principal (izquierda) */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box sx={{ marginLeft: '1rem' }}>
            <AddAudio handleAddAudio={handleAddAudio} />
          </Box>
          <Box sx={{ marginLeft: '1rem' }}>
            <SearchAudio search={search} handleFilterAudio={handleFilterAudio} />
          </Box>
          <Box sx={{ marginLeft: '1rem' }}>
            <SelectCanalDiscord />
          </Box>
        </Box>

        {/* Favoritos */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1rem' }}>
          <SwitchFavorite />
        </Box>
      </Box>

      {/* Mostrar audios */}
      <Box>
        <ListAudios />
      </Box>
    </>
  );
}

export default ManageAudios;
