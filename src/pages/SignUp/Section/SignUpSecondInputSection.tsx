import React, { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { Stack } from '@mui/material';
import { VscCheck } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import { signUpKeys, useCheckStudentIdDuplicationQuery } from '@api/signUpApi';
import { NUMBER_ERROR_MSG, REQUIRE_ERROR_MSG } from '@constants/errorMsg';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardDatePicker from '@components/DatePicker/StandardDatePicker';
import StandardInput from '@components/Input/StandardInput';
import signUpPageState from '../SignUp.recoil';

const NAME_MAX_LENGTH = 20;

interface SignUpFirstInputSectionProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}

const SignUpSecondInputSection = ({ setCurrentStep }: SignUpFirstInputSectionProps) => {
  const [studentIdState, setStudentIdState] = useState('');
  const [checkStudentIdDuplicateEnabled, setCheckStudentIdDuplicateEnabled] = useState(false);
  const setSignUpPageState = useSetRecoilState(signUpPageState);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const queryClient = useQueryClient();
  const { data: isStudentIdDuplicate } = useCheckStudentIdDuplicationQuery({
    studentId: studentIdState,
    enabled: checkStudentIdDuplicateEnabled,
  });

  const handleSecondStepFormSubmit: SubmitHandler<FieldValues> = ({ realName, studentId, birthday }) => {
    setSignUpPageState((prev) => ({ ...prev, realName, studentId, birthday: birthday.toFormat('yyyy.MM.dd') }));
    setCurrentStep(3);
  };

  const handleCheckStudentIdDuplicateClick = () => {
    setCheckStudentIdDuplicateEnabled(true);
    setStudentIdState(getValues('studentId'));
  };

  useEffect(() => {
    if (!isStudentIdDuplicate) return;

    if (isStudentIdDuplicate.duplicate === true) {
      setError('studentId', { message: '이미 존재하는 학번입니다.' });
      setCheckStudentIdDuplicateEnabled(false);
    }
  }, [isStudentIdDuplicate]);

  useEffect(() => {
    if (!isStudentIdDuplicate) return;

    if (isStudentIdDuplicate.duplicate === false) {
      setCheckStudentIdDuplicateEnabled(false);
      queryClient.setQueryData(signUpKeys.studentIdDuplication(studentIdState), undefined);
    }
  }, [watch('studentId')]);

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(handleSecondStepFormSubmit)}>
      <Controller
        name="realName"
        defaultValue=""
        control={control}
        rules={{
          required: REQUIRE_ERROR_MSG,
          maxLength: {
            value: NAME_MAX_LENGTH,
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
        render={({ field, fieldState: { error, isDirty } }) => {
          return (
            <StandardInput
              hasBackground
              label="학번"
              {...field}
              error={Boolean(error)}
              helperText={error?.message}
              endAdornment={
                isStudentIdDuplicate?.duplicate === false && !error ? (
                  <VscCheck className="fill-pointBlue" />
                ) : (
                  <FilledButton
                    small
                    onClick={handleCheckStudentIdDuplicateClick}
                    disabled={Boolean(error) || !isDirty}
                  >
                    중복 확인
                  </FilledButton>
                )
              }
            />
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
        <OutlinedButton
          type="submit"
          disabled={!isValid || isSubmitting || !isStudentIdDuplicate || isStudentIdDuplicate.duplicate === true}
        >
          다음
        </OutlinedButton>
      </div>
    </Stack>
  );
};

export default SignUpSecondInputSection;
