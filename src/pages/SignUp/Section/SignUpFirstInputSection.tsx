import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Stack } from '@mui/material';
import { VscCheck } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';

import { signUpKeys, useCheckLoginIdDuplicationQuery } from '@api/signUpApi';
import { ID } from '@constants/apiResponseMessage';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';
import signUpPageState from '../SignUp.recoil';

interface SignUpFirstInputSectionProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const SignUpFirstInputSection = ({ setCurrentStep }: SignUpFirstInputSectionProps) => {
  const [loginIdState, setLoginIdState] = useState('');
  const [checkLoginIdDuplicateEnabled, setCheckLoginIdDuplicateEnabled] = useState(false);
  const [passwordConfirmSuccessMsg, setPasswordConfirmSuccessMsg] = useState<string>('');
  const setSignUpPageState = useSetRecoilState(signUpPageState);

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const queryClient = useQueryClient();
  const { data: isLoginIdDuplicate } = useCheckLoginIdDuplicationQuery({
    loginId: loginIdState,
    enabled: checkLoginIdDuplicateEnabled,
  });

  const handleFirstStepFormSubmit: SubmitHandler<FieldValues> = ({ loginId, password }) => {
    setSignUpPageState((prev) => ({ ...prev, loginId, password }));
    setCurrentStep(2);
  };

  const handleCheckLoginIdDuplicateClick = () => {
    setCheckLoginIdDuplicateEnabled(true);
    setLoginIdState(getValues('loginId'));
  };

  useEffect(() => {
    if (!isLoginIdDuplicate) return;

    if (isLoginIdDuplicate.duplicate === true) {
      setError('loginId', { message: ID.error.existing });
      setCheckLoginIdDuplicateEnabled(false);
    }
  }, [isLoginIdDuplicate]);

  useEffect(() => {
    if (!isLoginIdDuplicate) return;

    if (isLoginIdDuplicate.duplicate === false) {
      setCheckLoginIdDuplicateEnabled(false);
      queryClient.setQueryData(signUpKeys.idDuplication(loginIdState), undefined);
    }
  }, [watch('loginId')]);

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
        render={({ field, fieldState: { error, isDirty } }) => {
          return (
            <StandardInput
              hasBackground
              label="아이디"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
              endAdornment={
                isLoginIdDuplicate?.duplicate === false && !error ? (
                  <VscCheck size={20} className="fill-pointBlue" />
                ) : (
                  <FilledButton small onClick={handleCheckLoginIdDuplicateClick} disabled={Boolean(error) || !isDirty}>
                    중복 확인
                  </FilledButton>
                )
              }
            />
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
        <OutlinedButton
          type="submit"
          disabled={!isValid || isSubmitting || !isLoginIdDuplicate || isLoginIdDuplicate.duplicate === true}
        >
          다음
        </OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpFirstInputSection;
