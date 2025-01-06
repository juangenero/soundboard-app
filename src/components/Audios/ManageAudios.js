// import AddAudio from './AddAudio.js';
import { useEffect, useState } from 'react';
import { addAudio, deleteAudio, getAudios } from '../../services/api.service.js';
import AddAudio from './AddAudio.js';
import ShowAudios from './ShowAudios.js';

function ManageAudios(props) {
  const [audios, setAudios] = useState([]);

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
      <AddAudio handleAddAudio={handleAddAudio} />
      <br />
      <ShowAudios audios={audios} handleDeleteAudio={handleDeleteAudio} />
    </>
  );
}

export default ManageAudios;
