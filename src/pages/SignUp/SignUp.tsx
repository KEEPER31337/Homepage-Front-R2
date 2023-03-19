import React from 'react';

import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { Box } from '@mui/material';

const SignUp = () => {
  return (
    <div className="grid h-screen place-content-center place-items-center">
      <Logo className="mb-9 w-48" />
      <Box className="h-[492px] w-[690px] border border-pointBlue px-24 py-14" />
    </div>
  );
};

export default SignUp;
