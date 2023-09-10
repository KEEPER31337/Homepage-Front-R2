import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import { DateTime } from 'luxon';
import { useSetRecoilState } from 'recoil';
import { useCheckEmailDuplicationQuery } from '@api/signUpApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import { emailRegex } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import TimerInput from '@components/Input/TimerInput';
import signUpPageState from '../SignUp.recoil';

const SignUpThirdInputSection = () => {
  const expiredSeconds = 300; // TODO API에서 받아오기
  const [isEmailSent, setIsEmailSent] = useState(false);

  const setSignUpPageState = useSetRecoilState(signUpPageState);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const { data: isEmailDuplicate, isSuccess: checkEmailDuplicationSuccess } = useCheckEmailDuplicationQuery({
    email: getValues('email'),
    enabled: isEmailSent,
  });

  const handleRequestVerificationCode = () => {
    setIsEmailSent(true);
  };

  const handleThirdStepFormSubmit: SubmitHandler<FieldValues> = ({ email, authCode }) => {
    setSignUpPageState((prev) => ({ ...prev, email, authCode }));

    // TODO 가입 성공 시
    navigate('/login');
  };

  useEffect(() => {
    if (!checkEmailDuplicationSuccess) return;

    if (isEmailDuplicate.duplicate === true) {
      setError('email', { message: '이미 존재하는 이메일입니다.' });
      setIsEmailSent(false);
    }
  }, [checkEmailDuplicationSuccess]);

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(handleThirdStepFormSubmit)}>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        rules={{
          required: REQUIRE_ERROR_MSG,
          pattern: {
            value: emailRegex,
            message: '이메일 주소를 다시 확인해주세요.',
          },
        }}
        render={({ field, fieldState: { error, isDirty } }) => {
          return (
            <EmailAuthInput
              label="이메일"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
              buttonDisabled={Boolean(error) || !isDirty}
              onAuthButtonClick={handleRequestVerificationCode}
            />
          );
        }}
      />
      <Controller
        name="authCode"
        defaultValue=""
        control={control}
        rules={{
          required: REQUIRE_ERROR_MSG,
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <TimerInput
              label="인증코드 입력"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
              disabled={!isEmailDuplicate || isEmailDuplicate.duplicate || !isEmailSent}
              expirationTime={DateTime.now().plus({ seconds: expiredSeconds })}
            />
          );
        }}
      />
      <div className="absolute bottom-0 right-0">
        <OutlinedButton type="submit" disabled={!isValid || isSubmitting}>
          완료
        </OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpThirdInputSection;
