import React, { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import StepProgress from '@components/Progress/StepProgress';
import SignUpFirstInputSection from './Section/SignUpFirstInputSection';
import SignUpSecondInputSection from './Section/SignUpSecondInputSection';
import SignUpThirdInputSection from './Section/SignUpThirdInputSection';

const SignUp = () => {
  const TOTAL_STEPS = 3;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const stepInfoMsg = {
    1: '로그인에 사용할\n아이디와 비밀번호를 등록해 주세요.',
    2: '프로필 정보를 등록해 주세요.',
    3: '이메일 주소를 입력해주세요.\n입력한 이메일 주소로 인증 코드가 발송됩니다.',
  };

  const stepInputSection = {
    1: <SignUpFirstInputSection setCurrentStep={setCurrentStep} />,
    2: <SignUpSecondInputSection />,
    3: <SignUpThirdInputSection />,
  };

  return (
    <div className="grid h-screen place-content-center place-items-center">
      <Logo className="mb-9 w-48" />
      <Box className="h-[492px] w-[690px] border border-pointBlue px-24 py-14">
        <Stack className="relative h-full w-full">
          <StepProgress className="mb-2 w-32" currentStep={currentStep} totalStep={TOTAL_STEPS} />
          <Typography className="!mb-8 whitespace-pre !font-semibold">{stepInfoMsg[currentStep]}</Typography>
          {stepInputSection[currentStep]}
        </Stack>
      </Box>
    </div>
  );
};

export default SignUp;
