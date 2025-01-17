import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useContext, useEffect, useState } from 'react';
import AudioContext from '../../../context/AudioContext.js';

const SelectCanalDiscord = () => {
  const { canalDiscord, setCanalDiscord } = useContext(AudioContext);

  // Alcalá City por defecto
  const [selectServidor, setSelectServidor] = useState({
    nombre: servidores[0].nombre,
    id: servidores[0].id,
  });

  // Club de la garraspera por defecto
  const [selectCanal, setSelectCanal] = useState({
    nombre: servidores[0].channels[0].nombre,
    id: servidores[0].channels[0].id,
  });

  useEffect(() => {
    setCanalDiscord({ guildId: selectServidor.id, channelId: selectCanal.id });
  }, [selectServidor, selectCanal]);

  const handleSelectServidor = (ev) => {
    let idServer = ev.target.value;
    let selectedServer = servidores.find((server) => server.id === idServer);
    let nombreServer = selectedServer.nombre;

    setSelectServidor({ nombre: nombreServer, id: idServer });

    // Reset canal al cambiar de servidor
    setSelectCanal({
      nombre: selectedServer.channels[0].nombre,
      id: selectedServer.channels[0].id,
    });
  };

  const handleSelectCanal = (ev) => {
    let idCanal = ev.target.value;
    let nombreCanal = '';
    servidores.forEach((servidor) => {
      const canalEncontrado = servidor.channels.find((canal) => canal.id === idCanal);
      if (canalEncontrado) {
        nombreCanal = canalEncontrado.nombre;
      }
    });

    setSelectCanal({ nombre: nombreCanal, id: idCanal });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <FormControl>
        <Box>
          {/* Seleccionar servidor */}
          <Select value={selectServidor.id} onChange={handleSelectServidor} sx={{ width: '180px' }}>
            {servidores.map((server) => (
              <MenuItem key={server.id} value={server.id}>
                {server.nombre}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
      {/* Seleccionar canal */}
      <FormControl>
        <Box>
          <Select value={selectCanal.id} onChange={handleSelectCanal} sx={{ width: 'auto' }}>
            {servidores
              .find((s) => s.nombre === selectServidor.nombre)
              ?.channels.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>
                  {channel.nombre}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
};

export default SelectCanalDiscord;

const servidores = [
  {
    nombre: 'Alcalá City',
    id: '982724208343810058',
    channels: [
      {
        nombre: 'El club de la garraspera',
        id: '1126882636451823776',
      },
      {
        nombre: 'El Rincon Mr.bobo',
        id: '1089241088457441310',
      },
      {
        nombre: 'Creepy fans',
        id: '1003403644902846514',
      },
    ],
  },
  // {
  //   nombre: 'Papu in da uuh',
  //   id: '763539213252558868',
  //   channels: [
  //     {
  //       nombre: 'DBD que tu te cagas',
  //       id: '1097361239644065822',
  //     },
  //     {
  //       nombre: 'Llorando en el valo',
  //       id: '1106943638228959252',
  //     },
  //     {
  //       nombre: 'Rocket que tu te cagas',
  //       id: '815586752236224522',
  //     },
  //   ],
  // },
];
