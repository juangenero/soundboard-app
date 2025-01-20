import { Typography } from '@mui/material';
import React from 'react';
import ManageAudios from '../components/audios/ManageAudios.js';
import CheckIp from '../components/audios/temporal/CheckIp.js';

function Dashboard() {
  return (
    <>
      <CheckIp />
      <Typography
        variant="h4"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Playwrite AU SA, sans-serif',
          marginY: '1rem',
        }}
      >
        Soundboard (BETA)
      </Typography>
      <ManageAudios />
    </>
  );
}

export default Dashboard;
