import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { useContext } from 'react';
import DashboardContext from '../../context/DashboardContext';

const SwitchFavorite = () => {
  const { favSwitch, setFavSwitch } = useContext(DashboardContext);

  return (
    <Box>
      <FormControlLabel
        control={
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>Onlyfavs</Typography>
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
