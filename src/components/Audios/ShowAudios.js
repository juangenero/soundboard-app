import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid2,
  Typography,
} from '@mui/material';
import { React, useRef } from 'react';
import PlayAudio from './PlayAudio.js';

function ShowAudios(props) {
  const { audios, handleDeleteAudio } = props;
  const controllerRef = useRef(null);
  const urlEmojis = 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/';

  const handleSetController = (controller) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = controller;
  };

  return (
    <>
      {audios.length < 1 && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
      {audios.length > 0 && (
        <Grid2 container spacing={2}>
          {audios.map((audio) => (
            <Grid2 xs={12} sm={6} md={4} lg={3} key={audio.id}>
              <Card sx={{ border: '2px solid lightgray' }}>
                <CardContent>
                  {/* Emoji */}
                  <Box>
                    <img
                      src={`${urlEmojis}${audio.emoji}.png`}
                      alt="emoji no encontrado"
                      loading="lazy"
                    />
                  </Box>
                  {/* Nombre del audio */}
                  <Typography variant="h5" component="div" align="center">
                    {audio.nombre}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* Botón Play */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <PlayAudio
                      key={audio.id}
                      id={audio.id}
                      abort={{
                        controllerCurrent: controllerRef.current,
                        handleSetController: handleSetController,
                      }}
                    />
                  </Box>
                  {/* Botón eliminar */}
                  {/* <Box display="flex" justifyContent="flex-end" width="100%">
                    <DeleteAudio
                      id={audio.id}
                      nombre={audio.nombre}
                      handleDeleteAudio={handleDeleteAudio}
                    />
                  </Box> */}
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
