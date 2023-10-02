import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Link, Stack, Typography } from '@mui/material';
import Svg404Component from './SvgComponent/Svg404Component';

interface NotFoundProps {
  from: string;
}

const NotFound = ({ from }: NotFoundProps) => {
  const [point, setPoint] = useState({ top: window.innerHeight / 2.5, left: window.innerWidth / 3 });
  const [torchTrigger, torchTriggerReducer] = useReducer((prev) => !prev, true);

  const navigate = useNavigate();

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
            {from} Not Found
          </Typography>
          <Stack spacing={2}>
            <Typography className="overflow-hidden whitespace-pre-line break-words !font-orbitron">
              {`> THE ${from} YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, \n HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.`}
            </Typography>
            <Typography className="flex flex-wrap overflow-hidden whitespace-pre !font-orbitron">
              {`> PLEASE TRY TO `}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link underline="hover" component="button" color="#fff" onClick={() => navigate(-1)}>
                [GO BACK]
              </Link>
              {` OR `}
              <Link underline="hover" color="#fff" href="/">
                [RETURN TO THE HOMEPAGE]
              </Link>
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
