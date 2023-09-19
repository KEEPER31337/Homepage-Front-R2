import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Divider, Stack, Typography } from '@mui/material';

import { DateTime } from 'luxon';
import { useCheckEmailDuplicationQuery } from '@api/signUpApi';
import { REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import { emailRegex } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import TimerInput from '@components/Input/TimerInput';
import ConfirmModal from '@components/Modal/ConfirmModal';

const EditEmailSection = () => {
  const [expirationTime] = useState<DateTime | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

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

  const handleEmailFormSubmit: SubmitHandler<FieldValues> = () => {
    // TODO
  };

  useEffect(() => {
    if (!checkEmailDuplicationSuccess) return;

    if (isEmailDuplicate.duplicate === true) {
      setError('email', { message: '이미 존재하는 이메일입니다.' });
      setIsEmailSent(false);
    }
  }, [checkEmailDuplicationSuccess]);

  return (
    <Stack
      width={{ sm: '100%' }}
      spacing={{ xs: 2, md: 4 }}
      marginBottom={4}
      justifyContent="space-between"
      onSubmit={handleSubmit(handleEmailFormSubmit)}
    >
      <Stack spacing={1} component="form" onSubmit={handleSubmit(handleEmailFormSubmit)}>
        <Typography fontWeight="semibold">이메일 변경</Typography>
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
        완료
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
      </Stack>
    </ConfirmModal>
  );
};

export default EditAccountModal;
