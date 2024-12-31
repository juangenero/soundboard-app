import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { playSonido, simulateCall } from '../../services/api.service.js';

const PlaySound = (props) => {
  const [loading, setLoading] = useState(false);

  async function handlePlayClick() {
    setLoading(true);
    try {
      playSonido(props.id)
        .then(() => {
          // setLoading(false);
        })
        .catch(() => {
          // setLoading(false);
        });

      // TODO por arreglar
      simulateCall({ time: 2000 }).then(() => {
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <IconButton sx={{ background: '#d3d3d3' }} onClick={handlePlayClick} disabled={loading}>
        <PlayArrow fontSize="large" />
      </IconButton>
    </>
  );
};

export default PlaySound;
