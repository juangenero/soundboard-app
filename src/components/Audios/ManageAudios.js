// import AddAudio from './AddAudio.js';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { addAudio, deleteAudio, getAudios } from '../../services/api.service.js';
import AddAudio from './AddAudio.js';
import ShowAudios from './ShowAudios.js';

function ManageAudios(props) {
  const [audios, setAudios] = useState([]);
  const [search, setSearch] = useState('');

  // Buscador de audios
  const filteredAudios = audios.filter((audio) =>
    audio.nombre.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchAudios();
  }, []);

  async function fetchAudios() {
    try {
      let response = await getAudios();
      // TODO - Por eliminar cuando se hagan los filtros (Ordenar audios por ID)
      response = response.data.sort((a, b) => a.id - b.id);
      setAudios(response);
    } catch (error) {
      console.error('Error al recuperar los audios:', error);
    }
  }

  // Recibe el formData del componente AddAudio
  async function handleAddAudio(formData) {
    const { data } = await addAudio(formData);
    fetchAudios();
  }

  // Recibe el formData del componente AddAudio
  async function handleDeleteAudio(id) {
    const { data } = await deleteAudio(id);
    fetchAudios();
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        {/* Botón de añadir */}
        <Box sx={{ paddingLeft: '25px' }}>
          <AddAudio handleAddAudio={handleAddAudio} />
        </Box>
        {/* Cuadro de búsqueda */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            sx={{ width: '350px', marginRight: '80px', background: '#e3e1e1' }}
            label="Buscar"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
      <ShowAudios audios={filteredAudios} handleDeleteAudio={handleDeleteAudio} />
    </>
  );
}

export default ManageAudios;
