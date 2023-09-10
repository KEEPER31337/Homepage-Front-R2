import React from 'react';
import { Stack } from '@mui/material';

import StandardInput from '@components/Input/StandardInput';

const SignUpThirdInputSection = () => {
  return (
    <Stack spacing={2}>
      {/* TODO 인증요청 버튼 포함 이메일 인풋 */}
      <StandardInput
        hasBackground
        value=""
        label="인증코드"
        onChange={() => {
          // TODO
        }}
      />
    </Stack>
  );
};

export default SignUpThirdInputSection;
