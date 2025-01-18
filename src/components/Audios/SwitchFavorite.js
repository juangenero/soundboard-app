import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { useContext } from 'react';
import AudioContext from '../../context/AudioContext.js';

const SwitchFavorite = () => {
  const { favSwitch, setFavSwitch } = useContext(AudioContext);

  return (
    <Box>
      <FormControlLabel
        control={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>Favoritos</Typography>
            <Switch
              color="primary"
              checked={favSwitch}
              onChange={(ev) => {
                setFavSwitch(ev.target.checked);
              }}
            />
          </Box>
        }
      />
    </Box>
  );
};

export default SwitchFavorite;
