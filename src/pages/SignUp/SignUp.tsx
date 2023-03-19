import React from 'react';

import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { Box, Stack, Typography } from '@mui/material';
import StepProgress from '@components/Progress/StepProgress';
import OutlinedButton from '@components/Button/OutlinedButton';

const SignUp = () => {
  const TOTAL_STEPS = 3;

  const currentStep = 1; // TODO 추후 state로 관리
  const stepInfoMsg = {
    1: '로그인에 사용할\n아이디와 비밀번호를 등록해 주세요.',
    2: '프로필 정보를 등록해 주세요.',
    3: '이메일 주소를 입력해주세요.\n입력한 이메일 주소로 인증 코드가 발송됩니다.',
  };

  return (
    <div className="grid h-screen place-content-center place-items-center">
      <Logo className="mb-9 w-48" />
      <Box className="h-[492px] w-[690px] border border-pointBlue px-24 py-14">
        <Stack className="relative h-full w-full">
          <StepProgress className="mb-2 w-32" currentStep={currentStep} totalStep={TOTAL_STEPS} />
          <Typography className="whitespace-pre !font-semibold">{stepInfoMsg[currentStep]}</Typography>
          <div className="absolute right-0 bottom-0">
            <OutlinedButton>다음</OutlinedButton>
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default SignUp;
