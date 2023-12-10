import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Stack, Typography } from '@mui/material';

import { DateTime } from 'luxon';
import { VscSignOut } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import {
  useEditEmailMutation,
  useEditPasswordMutation,
  useNewEmailAuthMutation,
  useWithdrawalMutation,
} from '@api/memberApi';
import { useCheckEmailDuplicationQuery } from '@api/signUpApi';
import { COMMON, EMAIL_MSG, PASSWORD_MSG } from '@constants/helperText';
import memberState from '@recoil/member.recoil';
import { emailRegex } from '@utils/validateEmail';
import FilledButton from '@components/Button/FilledButton';
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
  const {
    mutate: newEmailAuth,
    isLoading: isEmailSendLoading,
    isSuccess: isEmailSendSuccess,
  } = useNewEmailAuthMutation();
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
          setIsEmailSent(false);
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
            required: COMMON.error.required,
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
            required: COMMON.error.required,
            pattern: {
              value: emailRegex,
              message: EMAIL_MSG.error.formatError,
            },
          }}
          render={({ field, fieldState: { error, isDirty } }) => {
            return (
              <EmailAuthInput
                label="새 이메일"
                {...field}
                isLoading={isEmailSendLoading}
                isSuccess={isEmailSendSuccess}
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
            required: COMMON.error.required,
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

  const handlePasswordFormSubmit: SubmitHandler<FieldValues> = ({ password, newPassword }) => {
    editPassword({ oldPassword: password, newPassword });
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
            required: COMMON.error.required,
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
            required: COMMON.error.required,
            minLength: {
              value: 8,
              message: COMMON.error.underMinLen(8),
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
              message: PASSWORD_MSG.error.formatError,
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
            required: COMMON.error.required,
            validate: {
              confirmMatchPassward: (value) => {
                if (getValues('newPassword') !== value) return PASSWORD_MSG.error.incorrect;
                setPasswordConfirmSuccessMsg(PASSWORD_MSG.success.correct);
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
  const [startWithdrawal, setStartWithdrawal] = useState(false);
  const setMemberState = useSetRecoilState(memberState);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });
  const navigate = useNavigate();

  const { mutate: withdrawal } = useWithdrawalMutation();

  const handleWithdrawalSubmit: SubmitHandler<FieldValues> = ({ rawPassword }) => {
    withdrawal(
      { rawPassword },
      {
        onSuccess: () => {
          setMemberState(null);
          navigate('/');
        },
      },
    );
  };

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
      <Button
        color="secondary"
        variant="text"
        onClick={() => setStartWithdrawal((prev) => !prev)}
        startIcon={<VscSignOut size={20} className="fill-subRed" />}
      >
        <Typography className="align-middle text-subRed">탈퇴하기</Typography>
      </Button>
      {startWithdrawal && (
        <Stack
          component="form"
          paddingLeft={3}
          direction="row"
          alignItems="center"
          spacing={2}
          onSubmit={handleSubmit(handleWithdrawalSubmit)}
        >
          <Controller
            name="rawPassword"
            defaultValue=""
            control={control}
            rules={{
              required: COMMON.error.required,
            }}
            render={({ field, fieldState: { error } }) => {
              return (
                <StandardInput
                  className="h-16"
                  type="password"
                  label="현재 비밀번호"
                  {...field}
                  error={Boolean(error)}
                  helperText={error?.message}
                />
              );
            }}
          />
          <FilledButton type="submit" small disabled={isSubmitting || !isValid}>
            탈퇴
          </FilledButton>
        </Stack>
      )}
    </ConfirmModal>
  );
};

export default EditAccountModal;
