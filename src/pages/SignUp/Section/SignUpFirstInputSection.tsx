import React, { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';

import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';
import signUpPageState from '../SignUp.recoil';

interface SignUpFirstInputSectionProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const SignUpFirstInputSection = ({ setCurrentStep }: SignUpFirstInputSectionProps) => {
  const [passwordConfirmSuccessMsg, setPasswordConfirmSuccessMsg] = useState<string>('');
  const setSignUpPageState = useSetRecoilState(signUpPageState);

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const handleFirstStepFormSubmit: SubmitHandler<FieldValues> = ({ loginId, password }) => {
    setSignUpPageState((prev) => ({ ...prev, loginId, password }));
    setCurrentStep(2);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(handleFirstStepFormSubmit)}>
      <Controller
        name="loginId"
        defaultValue=""
        control={control}
        rules={{
          required: '필수 정보입니다.',
          minLength: {
            value: 4,
            message: '4글자 이상 입력해주세요.',
          },
          pattern: {
            value: /^[a-zA-Z0-9_]{4,12}$/,
            message: '4~12자 영어, 숫자, _ 만 가능합니다.',
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput hasBackground label="아이디" {...field} error={Boolean(error)} helperText={error?.message} />
          );
        }}
      />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{
          required: '필수 정보입니다.',
          minLength: {
            value: 8,
            message: '8글자 이상 입력해주세요.',
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
            message: '8~20자 영문과 숫자를 사용하세요.',
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput
              hasBackground
              type="password"
              label="비밀번호"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
            />
          );
        }}
      />
      <Controller
        name="passwordConfirm"
        defaultValue=""
        control={control}
        rules={{
          required: '필수 정보입니다.',
          validate: {
            confirmMatchPassward: (value) => {
              if (getValues('password') !== value) return '비밀번호가 일치하지 않습니다.';
              setPasswordConfirmSuccessMsg('비밀번호가 일치합니다.');
              return undefined;
            },
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput
              hasBackground
              type="password"
              label="비밀번호 확인"
              {...field}
              error={Boolean(error)}
              helperText={error?.message || passwordConfirmSuccessMsg}
            />
          );
        }}
      />

      <div className="absolute bottom-0 right-0">
        <OutlinedButton type="submit" disabled={!isValid || isSubmitting}>
          다음
        </OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpFirstInputSection;
