import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Stack } from '@mui/material';
import { VscCheck } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';

import { signUpKeys, useCheckLoginIdDuplicationQuery } from '@api/signUpApi';
import { COMMON, LOGIN_ID_MSG, CONFIRM_PASSWORD_MSG } from '@constants/helperText';
import { LOGIN_ID } from '@constants/apiResponseMessage';
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
      setError('loginId', { message: LOGIN_ID.error.existing });
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
          required: COMMON.error.required,
          minLength: {
            value: 4,
            message: COMMON.error.minLength(4),
          },
          pattern: {
            value: /^[a-zA-Z0-9_]{4,12}$/,
            message: LOGIN_ID_MSG.error.formatError,
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
          required: COMMON.error.required,
          minLength: {
            value: 8,
            message: COMMON.error.minLength(8),
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
            message: CONFIRM_PASSWORD_MSG.error.formatError,
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
          required: COMMON.error.required,
          validate: {
            confirmMatchPassward: (value) => {
              if (getValues('password') !== value) return CONFIRM_PASSWORD_MSG.error.mismatch;
              setPasswordConfirmSuccessMsg(CONFIRM_PASSWORD_MSG.success.match);
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
