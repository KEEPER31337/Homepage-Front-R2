import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { ReactComponent as NotFoundImg } from '@assets/notFound/404.svg';

const NotFound = () => {
  return (
    <div className="-mt-10 flex h-screen w-full items-center sm:mt-auto">
      <Container maxWidth="lg" className="space-y-40 text-pointBlue">
        <Stack spacing={4}>
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
          <NotFoundImg />
        </Stack>
      </Container>
    </div>
  );
};

export default NotFound;
