import { Box, keyframes, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import AudioContext from '../../../context/AudioContext';
import { getIp } from '../../../services/api.service';

const CheckIp = () => {
  const { ip, setIp } = useContext(AudioContext);

  useEffect(() => {
    const ip = async () => {
      const { data } = await getIp();
      console.log(data);
      setIp(data);
    };
    ip();
  }, []);

  const scroll = keyframes` 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } `;

  return (
    <Box
      sx={{
        // position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'gray',
      }}
    >
      <Typography
        variant="h6"
        component="p"
        sx={{ display: 'inline-block', animation: `${scroll} 30s linear infinite`, color: 'white' }}
      >
        Por favor, no hagais spam en canales ajenos 😔😔😔 Almacenaremos su IP {ip} de forma
        preventiva!
      </Typography>
    </Box>
  );
};

export default CheckIp;
