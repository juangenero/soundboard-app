import { Card, CardActions, CardContent, Grid2, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { getAudios } from '../../services/api.service.js';
import PlaySound from './PlaySound.js';

const ShowSounds = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const response = await getAudios();
        setAudios(response.data);
      } catch (error) {
        console.error('Error al recuperar los audios:', error);
      }
    };

    fetchSounds();
  }, []);

  return (
    <>
      {audios.length === 0 && <h2>No hay sonidos para mostrar</h2>}
      {audios.length > 0 && (
        <Grid2 container spacing={2}>
          {audios.map((audio) => (
            <Grid2 xs={12} sm={6} md={4} lg={3} key={audio.id}>
              <Card sx={{ border: '2px solid lightgray' }}>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    {audio.nombre}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <PlaySound id={audio.id} />
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
};

export default ShowSounds;
