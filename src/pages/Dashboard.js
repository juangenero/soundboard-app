import React from 'react';
import ManageAudios from '../components/Audios/ManageAudios.js';
import ServerInfo from '../components/Discord/ServerInfo.js';

function Dashboard(props) {
  return (
    <>
      <ServerInfo />
      <ManageAudios />
    </>
  );
}

export default Dashboard;
