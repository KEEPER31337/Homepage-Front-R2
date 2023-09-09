import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';

import { DateTime } from 'luxon';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import TimerInput from '@components/Input/TimerInput';

const SignUpThirdInputSection = () => {
  const expiredSeconds = 300; // TODO API에서 받아오기

  const { control } = useForm({ mode: 'onBlur' });

  const handleRequestVerificationCode = () => {
    //
  };

  return (
    <Stack spacing={2}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{
          required: '필수 정보입니다.',
        }}
        render={({ field }) => {
          return <EmailAuthInput {...field} label="이메일" onAuthButtonClick={handleRequestVerificationCode} />;
        }}
      />
      <Controller
        name="authCode"
        defaultValue=""
        control={control}
        rules={{
          required: '필수 정보입니다.',
        }}
        render={({ field }) => {
          return (
            <TimerInput
              {...field}
              label="인증코드 입력"
              expirationTime={DateTime.now().plus({ seconds: expiredSeconds })}
            />
          );
        }}
      />
    </Stack>
  );
};

export default SignUpThirdInputSection;
