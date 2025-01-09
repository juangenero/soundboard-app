import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext } from 'react';
import DashboardContext from '../../context/DashboardContext';

const SwitchFavorite = () => {
  const { activeFav, setActiveFav } = useContext(DashboardContext);

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={activeFav}
            onChange={(ev) => {
              setActiveFav(ev.target.checked);
            }}
          />
        }
        label="Onlyfavs"
      />
    </Box>
  );
};

export default SwitchFavorite;
