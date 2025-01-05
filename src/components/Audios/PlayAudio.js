import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { playAudio } from '../../services/api.service.js';

const PlayAudio = (props) => {
  const [loading, setLoading] = useState(false);
  const { controllerCurrent, handleSetController } = props.abort;

  const styleBtnDefault = {
    backgroundColor: 'lightblue',
    color: 'black',
    marginRight: '10px',
  };

  const styleBtnLoading = {
    backgroundColor: 'lightgray',
    color: 'gray',
    marginRight: '10px',
  };

  async function handlePlayClick() {
    // Cancelar solicitud previa si existe
    if (controllerCurrent) {
      controllerCurrent.abort();
    }

    const newController = new AbortController();
    handleSetController(newController);

    setLoading(true);

    playAudio(props.id, newController)
      .then((res) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <IconButton
        onClick={handlePlayClick}
        style={loading ? styleBtnLoading : styleBtnDefault}
        disabled={loading}
      >
        <PlayArrow fontSize="medium" />
      </IconButton>
    </>
  );
};

export default PlayAudio;
