import React, { useState } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import StepProgress from '@components/Progress/StepProgress';
import { SignUpInfo } from '@api/dto';
import SignUpFirstInputSection from './Section/SignUpFirstInputSection';
import SignUpSecondInputSection from './Section/SignUpSecondInputSection';
import SignUpThirdInputSection from './Section/SignUpThirdInputSection';

const TOTAL_STEPS = 3;
const STEP_INFO_MESSAGE = {
  1: '로그인에 사용할\n아이디와 비밀번호를 등록해 주세요.',
  2: '프로필 정보를 등록해 주세요.',
  3: '이메일 주소를 입력해주세요.\n입력한 이메일 주소로 인증 코드가 발송됩니다.',
};

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [signUpData, setSignUpData] = useState<Omit<SignUpInfo, 'email' | 'authCode'>>({
    loginId: '',
    password: '',
    realName: '',
    studentId: '',
    birthday: null,
  });

  const stepInputSection = {
    1: (
      <SignUpFirstInputSection
        onNext={(data) => {
          setSignUpData((prev) => ({ ...prev, ...data }));
          setCurrentStep(2);
        }}
      />
    ),
    2: (
      <SignUpSecondInputSection
        onNext={(data) => {
          setSignUpData((prev) => ({ ...prev, ...data }));
          setCurrentStep(3);
        }}
      />
    ),
    3: <SignUpThirdInputSection signUpData={signUpData} />,
  };

  return (
    <Container maxWidth="xs" className="!flex flex-col items-center justify-center">
      <Logo className="mb-9 w-48" />
      <Box className="h-[560px] w-full border border-pointBlue px-10 py-14 sm:h-[492px] sm:w-[690px] sm:px-24">
        <Stack className="relative h-full w-full">
          <StepProgress className="mb-2 w-32" currentStep={currentStep} totalStep={TOTAL_STEPS} />
          <Typography className="!mb-8 whitespace-pre !font-semibold">{STEP_INFO_MESSAGE[currentStep]}</Typography>
          {stepInputSection[currentStep]}
        </Stack>
      </Box>
    </Container>
  );
};

export default SignUp;
