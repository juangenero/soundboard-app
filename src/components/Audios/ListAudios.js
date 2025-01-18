import { Box, Grid2, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { React, useContext, useRef } from 'react';
import AudioContext from '../../context/AudioContext.js';
import CardAudio from './CardAudio.js';

function ListAudios() {
  const { audiosFiltered } = useContext(AudioContext);
  const playRef = useRef(null); // Referencia del play ejecutado

  return (
    <>
      <Typography sx={{ fontFamily: 'Playwrite AU SA', margin: '1rem' }}>
        {`Mostrando ${audiosFiltered.length} audios`}
      </Typography>
      {audiosFiltered.length < 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontFamily: 'Playwrite AU SA, sans-serif' }}>
            No se encontraron audios
          </Typography>
        </Box>
      )}
      {audiosFiltered.length > 0 && (
        <Grid2 container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence>
            {audiosFiltered.map((audio) => (
              <Grid2 xs={12} sm={6} md={4} lg={3} key={audio.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <CardAudio audio={audio} playRef={playRef} />
                </motion.div>
              </Grid2>
            ))}
          </AnimatePresence>
        </Grid2>
      )}
    </>
  );
}

export default ListAudios;

{
  /* <Box display="flex" justifyContent="flex-end" width="100%">
<DeleteAudio
id={audio.id}
nombre={audio.nombre}
handleDeleteAudio={handleDeleteAudio}
/>
</Box> */
}
