import React from 'react';

import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { Box } from '@mui/material';
import StepProgress from '@components/Progress/StepProgress';

const SignUp = () => {
  const TOTAL_STEPS = 3;

  const currentStep = 1; // TODO 추후 state로 관리

  return (
    <div className="grid h-screen place-content-center place-items-center">
      <Logo className="mb-9 w-48" />
      <Box className="h-[492px] w-[690px] border border-pointBlue px-24 py-14">
        <StepProgress className="w-32" currentStep={currentStep} totalStep={TOTAL_STEPS} />
      </Box>
    </div>
  );
};

export default SignUp;
