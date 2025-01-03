import { PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { playAudio } from '../../services/api.service.js';

const PlayAudio = (props) => {
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);

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
    setLoading(true);
    const startTime = Date.now();

    playAudio(props.id)
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
      <IconButton
        onClick={handlePlayClick}
        style={loading ? styleBtnLoading : styleBtnDefault}
        disabled={loading}
      >
        <PlayArrow fontSize="medium" />
      </IconButton>
      {elapsedTime && <div>{elapsedTime} ms</div>}
    </>
  );
};

export default PlayAudio;
