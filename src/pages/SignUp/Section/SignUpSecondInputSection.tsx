import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { DateTime } from 'luxon';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';

import StandardInput from '@components/Input/StandardInput';

const SignUpSecondInputSection = () => {
  const [date, setDate] = useState<DateTime | null>(null);
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <StandardInput
          hasBackground
          className="w-full"
          value=""
          label="이름"
          onChange={() => {
            // TODO
          }}
        />
        <StandardInput
          hasBackground
          className="w-full"
          value=""
          label="닉네임"
          onChange={() => {
            // TODO
          }}
        />
      </Stack>
      <StandardInput
        hasBackground
        value=""
        label="학번"
        onChange={() => {
          // TODO
        }}
      />
      {/* TODO "생일 DatePicker" */}
      <StandardDatePicker hasBackground label="test" date={date} setDate={setDate} />
    </Stack>
  );
};

export default SignUpSecondInputSection;
