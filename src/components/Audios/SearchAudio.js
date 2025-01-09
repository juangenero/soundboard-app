import { Box, TextField } from '@mui/material';
import React from 'react';

const SearchAudio = (props) => {
  const { search, handleFilterAudio } = props;

  return (
    <Box>
      <TextField
        sx={{ width: '25vw' }}
        label="Buscar"
        variant="outlined"
        value={search}
        onChange={(e) => handleFilterAudio(e.target.value)}
      />
    </Box>
  );
};

export default SearchAudio;
