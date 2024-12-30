import React from 'react';
import ServerInfo from '../components/Discord/ServerInfo';
import AddSound from '../components/Sounds/AddSound';
import ShowSounds from '../components/Sounds/ShowSounds';

function Dashboard(props) {
  return (
    <>
      <ServerInfo />
      <AddSound />
      <ShowSounds />
    </>
  );
}

export default Dashboard;
