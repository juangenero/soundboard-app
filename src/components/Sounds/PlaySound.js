import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { playSonido } from '../../services/api.service.js';

const PlaySound = (props) => {
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);

  async function handlePlayClick() {
    setLoading(true);
    const startTime = Date.now();

    playSonido(props.id)
      .then((res) => {
        setElapsedTime(res.data.timeResponse - startTime);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <IconButton onClick={handlePlayClick} disabled={loading}>
        <PlayArrow fontSize="large" />
      </IconButton>
      {elapsedTime && <div>{elapsedTime} ms</div>}
    </>
  );
};

export default PlaySound;
