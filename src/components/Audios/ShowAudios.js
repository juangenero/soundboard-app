import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
          {audios.map(
            (audio) =>
              ({ undefined } && (
                <Grid2 xs={12} sm={6} md={4} lg={3} key={audio.id}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: '2px solid lightgray',
                      borderRadius: '32px',
                      boxShadow: 'none',
                      width: 250,
                    }}
                  >
                    <CardContent>
                      {/* Emoji */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 50, height: 50 }}
                          image={`${urlEmojis}${audio.emoji}.png`}
                          alt="Not found"
                        />
                      </Box>
                      {/* Nombre del audio */}
                      <Typography variant="subtitle1" component="div" align="center">
                        {audio.nombre}
                      </Typography>
                    </CardContent>

                    {/* Botonera */}
                    <CardActions
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                    </CardActions>
                  </Card>
                </Grid2>
              ))
          )}
        </Grid2>
      )}
    </>
  );
}

export default ShowAudios;

{
  /* <Box display="flex" justifyContent="flex-end" width="100%">
<DeleteAudio
id={audio.id}
nombre={audio.nombre}
handleDeleteAudio={handleDeleteAudio}
/>
</Box> */
}
