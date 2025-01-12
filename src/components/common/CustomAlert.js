// CustomAlert.js
import { Alert, Box, Snackbar } from '@mui/material';
import React from 'react';
import { useAlert } from '../../context/Alert.context.js';

const CustomAlert = () => {
  const { alerts, removeAlert } = useAlert();
  const autoHideDuration = 5000;

  const handleClose = (id) => (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    removeAlert(id);
  };

  return (
    <Box>
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={autoHideDuration}
          onClose={handleClose(alert.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose(alert.id)}
            severity={alert.severity}
            variant="filled"
            sx={{ marginBottom: `${index * 60}px`, width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default CustomAlert;
