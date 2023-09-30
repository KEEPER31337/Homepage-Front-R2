import React, { useReducer, useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Svg404Component from './SvgComponent/Svg404Component';

const NotFound = () => {
  const [point, setPoint] = useState({ top: window.innerHeight / 2.5, left: window.innerWidth / 3 });
  const [torchTrigger, torchTriggerReducer] = useReducer((prev) => !prev, true);

  const handleKeyClick = () => {
    torchTriggerReducer();
  };

  return (
    <div
      className="-mt-10 flex h-screen w-full items-center sm:mt-auto"
      onMouseMove={(e) => {
        setPoint({ top: e.pageY, left: e.pageX });
      }}
    >
      <Container maxWidth="lg" className="space-y-40 text-pointBlue">
        <Stack className={torchTrigger === true ? 'animate-typing' : ''} spacing={4}>
          <Typography className="overflow-hidden whitespace-nowrap !font-orbitron" variant="h1" fontWeight="bold">
            Page Not Found
          </Typography>
          <Stack spacing={2}>
            <Typography className="overflow-hidden whitespace-pre-line break-words !font-orbitron">
              {`> THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, \n HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.`}
            </Typography>
            <Typography className="flex flex-wrap overflow-hidden whitespace-pre !font-orbitron">
              {`> PLEASE TRY TO `}
              <span className="text-white">[GO BACK]</span>
              {` OR `}
              <span className="text-white">[RETURN TO THE HOMEPAGE]</span>
              {` .`}
            </Typography>
            <Typography className="overflow-hidden !font-orbitron">{`> GOOD LUCK.`}</Typography>
          </Stack>
        </Stack>
        <Stack alignItems="end">
          <Svg404Component point={point} handleKeyClick={handleKeyClick} />
          {torchTrigger && <div className="torch pointer-events-none" style={point} />}
        </Stack>
      </Container>
    </div>
  );
};

export default NotFound;
