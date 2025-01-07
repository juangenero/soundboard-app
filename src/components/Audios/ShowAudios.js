import { Box, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { React, useRef } from 'react';
import background from '../../assets/images/bg-card2.png';
import PlayAudio from './PlayAudio.js';

function ShowAudios(props) {
  const { audios, handleDeleteAudio } = props;
  const controllerRef = useRef(null);
  const urlEmojis = 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/';

  // Controla las peticiones rechazadas cuando se crean nuevas al reproducir audios
  const handleSetController = (controller) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = controller;
  };

  return (
    <>
      {audios.length < 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Playwrite AU SA, sans-serif' }}>
            No se encontraron audios
          </Typography>
        </Box>
      )}
      {audios.length > 0 && (
        <Grid2 container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence>
            {audios.map((audio) => (
              <Grid2 xs={12} sm={6} md={4} lg={3} key={audio.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card
                    sx={{
                      backgroundImage: `url(${background})`,
                      border: '2px solid gray',
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
                      <Typography
                        variant="subtitle1"
                        component="div"
                        align="center"
                        sx={{ fontFamily: 'Playwrite AU SA, sans-serif' }}
                      >
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
                </motion.div>
              </Grid2>
            ))}
          </AnimatePresence>
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
