import { Typography } from '@mui/material';
import React from 'react';
import ManageAudios from '../components/Audios/ManageAudios.js';

function Dashboard() {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Playwrite AU SA, sans-serif',
          marginY: '25px',
        }}
      >
        Soundboard (BETA)
      </Typography>
      <ManageAudios />
    </>
  );
}

export default Dashboard;
