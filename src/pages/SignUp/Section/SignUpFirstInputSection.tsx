import React from 'react';
import { Stack } from '@mui/material';

import BackgroundInput from '@components/Input/BackgroundInput';

const SignUpFirstInputSection = () => {
  return (
    <Stack spacing={2}>
      <BackgroundInput
        value=""
        label="아이디"
        onChange={() => {
          // TODO
        }}
      />
      <BackgroundInput
        value=""
        label="비밀번호"
        onChange={() => {
          // TODO
        }}
      />
      <BackgroundInput
        value=""
        label="비밀번호 확인"
        onChange={() => {
          // TODO
        }}
      />
    </Stack>
  );
};

export default SignUpFirstInputSection;
