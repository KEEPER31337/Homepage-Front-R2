import React from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { NUMBER_ERROR_MSG, REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import StandardInput from '@components/Input/StandardInput';
import signUpPageState from '../SignUp.recoil';

const NAME_MAX_LENGTH = 20;

interface SignUpFirstInputSectionProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const SignUpSecondInputSection = ({ setCurrentStep }: SignUpFirstInputSectionProps) => {
  const setSignUpPageState = useSetRecoilState(signUpPageState);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const handleSecondStepFormSubmit: SubmitHandler<FieldValues> = ({ loginId, password }) => {
    setSignUpPageState((prev) => ({ ...prev, loginId, password }));
    setCurrentStep(3);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(handleSecondStepFormSubmit)}>
      <Controller
        name="realName"
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
            value: /^[0-9]+$/,
            message: NUMBER_ERROR_MSG,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardInput hasBackground label="학번" {...field} error={Boolean(error)} helperText={error?.message} />
          );
        }}
      />
      <Controller
        name="birthday"
        defaultValue=""
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <StandardDatePicker
              hasBackground
              label={
                <>
                  <span className="mr-1">생일</span>
                  <span className="opacity-30">(선택)</span>
                </>
              }
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
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

export default SignUpSecondInputSection;
