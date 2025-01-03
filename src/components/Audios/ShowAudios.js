import { Box, Card, CardActions, CardContent, Grid2, Typography } from '@mui/material';
import { React } from 'react';
import DeleteAudio from './DeleteAudio.js';
import PlayAudio from './PlayAudio.js';

function ShowAudios(props) {
  const { audios, handleDeleteAudio } = props;

  return (
    <>
      {audios.length === 0 && <h2>No hay audios para mostrar</h2>}
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
                <CardActions style={{ justifyContent: 'space-between' }}>
                  <Box display="flex" justifyContent="flex-start" width="100%">
                    <PlayAudio id={audio.id} />
                  </Box>
                  <Box display="flex" justifyContent="flex-end" width="100%">
                    <DeleteAudio
                      id={audio.id}
                      nombre={audio.nombre}
                      handleDeleteAudio={handleDeleteAudio}
                    />
                  </Box>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
}

export default ShowAudios;
