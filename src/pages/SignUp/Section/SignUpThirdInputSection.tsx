import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import { DateTime } from 'luxon';
import { useRecoilValue } from 'recoil';
import { useCheckEmailDuplicationQuery, useEmailAuthMutation, useSignUpMutation } from '@api/signUpApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import { emailRegex } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import TimerInput from '@components/Input/TimerInput';
import MailAuthenticationModal from '@components/Modal/MailAuthenticationModal';
import signUpPageState from '../SignUp.recoil';

const SignUpThirdInputSection = () => {
  const [expirationTime, setExpirationTime] = useState<DateTime | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [mailAuthenticationModalOpen, setMailAuthenticationModalOpen] = useState(false);

  const signUpParams = useRecoilValue(signUpPageState);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const { data: isEmailDuplicate, isSuccess: checkEmailDuplicationSuccess } = useCheckEmailDuplicationQuery({
    email: getValues('email'),
    enabled: isEmailSent,
  });

  const { mutate: emailAuth } = useEmailAuthMutation();
  const { mutate: signUp } = useSignUpMutation();

  const handleRequestVerificationCode = () => {
    setIsEmailSent(true);
  };

  const handleThirdStepFormSubmit: SubmitHandler<FieldValues> = ({ email, authCode }) => {
    signUp(
      { ...signUpParams, email, authCode },
      {
        onSuccess: () => {
          navigate('/login');
        },
      },
    );
  };

  const handleOtherEmailButtonClick = () => {
    setMailAuthenticationModalOpen(false);
    setIsEmailSent(false);
    setExpirationTime(null);
    reset();
  };

  const handleResendMailButtonClick = () => {
    emailAuth(getValues('email'), {
      onSuccess: ({ expiredSeconds }) => {
        setExpirationTime(DateTime.now().plus({ seconds: expiredSeconds }));
        setMailAuthenticationModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (!checkEmailDuplicationSuccess) return;

    if (isEmailDuplicate.duplicate === true) {
      setError('email', { message: '이미 존재하는 이메일입니다.' });
      setIsEmailSent(false);
      return;
    }

    emailAuth(getValues('email'), {
      onSuccess: ({ expiredSeconds }) => {
        setExpirationTime(DateTime.now().plus({ seconds: expiredSeconds }));
      },
    });
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
              inputDisabled={isEmailSent && checkEmailDuplicationSuccess}
              buttonDisabled={Boolean(error) || !isDirty || isEmailSent}
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
              expirationTime={expirationTime}
            />
          );
        }}
      />
      {isEmailSent && checkEmailDuplicationSuccess && (
        <div className="relative">
          <Typography
            className="absolute right-0 w-fit hover:underline hover:underline-offset-4"
            component="button"
            onClick={() => setMailAuthenticationModalOpen(true)}
          >
            인증 메일이 오지 않았나요?
          </Typography>
          <MailAuthenticationModal
            open={mailAuthenticationModalOpen}
            onClose={() => setMailAuthenticationModalOpen(false)}
            onOtherEmailButtonClick={handleOtherEmailButtonClick}
            onResendMailButtonClick={handleResendMailButtonClick}
          />
        </div>
      )}
      <div className="absolute bottom-0 right-0">
        <OutlinedButton type="submit" disabled={!isValid || isSubmitting}>
          완료
        </OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpThirdInputSection;
