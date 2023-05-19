import React from 'react';
import { Stack } from '@mui/material';

import BackgroundInput from '@components/Input/BackgroundInput';

const SignUpSecondInputSection = () => {
  return (
    <Stack className="space-y-4">
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <BackgroundInput
          className="w-full"
          value=""
          label="이름"
          onChange={() => {
            // TODO
          }}
        />
        <BackgroundInput
          className="w-full"
          value=""
          label="닉네임"
          onChange={() => {
            // TODO
          }}
        />
      </Stack>
      <BackgroundInput
        value=""
        label="학번"
        onChange={() => {
          // TODO
        }}
      />
      {/* TODO "생일 DatePicker" */}
    </Stack>
  );
};

export default SignUpSecondInputSection;
