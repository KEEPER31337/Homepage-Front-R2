import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { DateTime } from 'luxon';
import { NUMBER_ERROR_MSG, REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import StandardInput from '@components/Input/StandardInput';

const NAME_MAX_LENGTH = 20;

const SignUpSecondInputSection = () => {
  const [date, setDate] = useState<DateTime | null>(null);

  const { control } = useForm({ mode: 'onBlur' });

  return (
    <Stack spacing={2}>
      <Controller
        name="name"
        defaultValue=""
        control={control}
        rules={{
          required: REQUIRE_ERROR_MSG,
          maxLength: {
            value: 20,
            message: `이름은 최대 ${NAME_MAX_LENGTH}글자 입력이 가능합니다.`,
          },
          pattern: {
            value: /^[가-힣a-zA-Z]{1,20}$/,
            message: '1~20자 한글, 영어만 가능합니다.',
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput hasBackground label="이름" {...field} error={Boolean(error)} helperText={error?.message} />
          );
        }}
      />
      <Controller
        name="studentId"
        defaultValue=""
        control={control}
        rules={{
          required: REQUIRE_ERROR_MSG,
          pattern: {
            value: /^[0-9]$/,
            message: NUMBER_ERROR_MSG,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput hasBackground label="학번" {...field} error={Boolean(error)} helperText={error?.message} />
          );
        }}
      />
      {/* TODO "생일 DatePicker" */}
      <StandardDatePicker hasBackground label="test" date={date} setDate={setDate} />
      <div className="absolute bottom-0 right-0">
        <OutlinedButton type="submit">다음</OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpSecondInputSection;
