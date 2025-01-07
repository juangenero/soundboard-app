import React from 'react';
import ManageAudios from '../components/Audios/ManageAudios.js';

function Dashboard(props) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Soundboard (BETA)</h1>
      </div>
      <ManageAudios />
    </>
  );
}

export default Dashboard;
