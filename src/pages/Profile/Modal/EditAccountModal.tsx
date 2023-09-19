import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Divider, Stack, Typography } from '@mui/material';

import { DateTime } from 'luxon';
import { useEditEmailMutation, useEditPasswordMutation, useNewEmailAuthMutation } from '@api/memberApi';
import { useCheckEmailDuplicationQuery } from '@api/signUpApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import { emailRegex } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import StandardInput from '@components/Input/StandardInput';
import TimerInput from '@components/Input/TimerInput';
import ConfirmModal from '@components/Modal/ConfirmModal';

const EditEmailSection = () => {
  const [expirationTime, setExpirationTime] = useState<DateTime | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

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
  const { mutate: newEmailAuth } = useNewEmailAuthMutation();
  const { mutate: editEmail } = useEditEmailMutation();

  const handleRequestVerificationCode = () => {
    setIsEmailSent(true);
  };

  const handleEmailFormSubmit: SubmitHandler<FieldValues> = ({ email, auth, password }) => {
    editEmail(
      { email, auth, password },
      {
        onSuccess: () => {
          toast.success('이메일 변경 성공하였습니다.');
          reset();
        },
      },
    );
  };

  useEffect(() => {
    if (!checkEmailDuplicationSuccess) return;

    if (isEmailDuplicate.duplicate === true) {
      setError('email', { message: '이미 존재하는 이메일입니다.' });
      setIsEmailSent(false);
      return;
    }

    newEmailAuth(getValues('email'), {
      onSuccess: () => {
        setExpirationTime(DateTime.now().plus({ seconds: 300 }));
        // TODO 유효시간 받아오기 setExpirationTime(DateTime.now().plus({ seconds: expiredSeconds }));
      },
    });
  }, [checkEmailDuplicationSuccess]);

  return (
    <Stack
      width={{ sm: '100%' }}
      spacing={{ xs: 2, md: 4 }}
      marginBottom={4}
      component="form"
      onSubmit={handleSubmit(handleEmailFormSubmit)}
    >
      <Stack spacing={1}>
        <Typography fontWeight="semibold">이메일 변경</Typography>
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: '필수 정보입니다.',
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <StandardInput
                hasBackground
                type="password"
                label="현재 비밀번호"
                {...field}
                error={Boolean(error)}
                helperText={error?.message}
              />
            );
          }}
        />
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
                label="새 이메일"
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
          name="auth"
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
                disabled={
                  !isEmailDuplicate ||
                  isEmailDuplicate.duplicate ||
                  !isEmailSent ||
                  Boolean(expirationTime && expirationTime < DateTime.now())
                }
                expirationTime={expirationTime}
              />
            );
          }}
        />
      </Stack>
      <OutlinedButton
        type="submit"
        disabled={!isValid || isSubmitting || Boolean(expirationTime && expirationTime < DateTime.now())}
      >
        이메일 변경
      </OutlinedButton>
    </Stack>
  );
};

const EditPasswordSection = () => {
  const [passwordConfirmSuccessMsg, setPasswordConfirmSuccessMsg] = useState<string>('');

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const { mutate: editPassword } = useEditPasswordMutation();

  const handlePasswordFormSubmit: SubmitHandler<FieldValues> = ({ newPassword }) => {
    editPassword({ newPassword });
  };

  return (
    <Stack
      width={{ sm: '100%' }}
      spacing={{ xs: 2, md: 4 }}
      marginBottom={4}
      component="form"
      onSubmit={handleSubmit(handlePasswordFormSubmit)}
    >
      <Stack spacing={1}>
        <Typography fontWeight="semibold">비밀번호 변경</Typography>
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required: '필수 정보입니다.',
          }}
          render={({ field, fieldState: { error } }) => {
            return (
              <StandardInput
                hasBackground
                type="password"
                label="현재 비밀번호"
                {...field}
                error={Boolean(error)}
                helperText={error?.message}
              />
            );
          }}
        />
        <Controller
          name="newPassword"
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
                label="새 비밀번호"
                {...field}
                error={Boolean(error)}
                helperText={error?.message}
              />
            );
          }}
        />
        <Controller
          name="newPasswordConfirm"
          defaultValue=""
          control={control}
          rules={{
            required: '필수 정보입니다.',
            validate: {
              confirmMatchPassward: (value) => {
                if (getValues('newPassword') !== value) return '비밀번호가 일치하지 않습니다.';
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
                label="새 비밀번호 확인"
                {...field}
                error={Boolean(error)}
                helperText={error?.message || passwordConfirmSuccessMsg}
              />
            );
          }}
        />
      </Stack>
      <OutlinedButton type="submit" disabled={!isValid || isSubmitting}>
        비밀번호 변경
      </OutlinedButton>
    </Stack>
  );
};

interface EditAccountModalProps {
  open: boolean;
  onClose: () => void;
}

const EditAccountModal = ({ open, onClose }: EditAccountModalProps) => {
  return (
    <ConfirmModal open={open} onClose={onClose} title="계정 정보 수정" modalWidth="md">
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={6}
        paddingX={{ sm: 0, md: 2 }}
        direction={{ sm: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <EditEmailSection />
        <EditPasswordSection />
      </Stack>
    </ConfirmModal>
  );
};

export default EditAccountModal;
