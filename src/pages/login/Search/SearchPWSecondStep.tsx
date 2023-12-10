import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { useChangePasswordMutation } from '@api/SearchAccountApi';
import { PASSWORD_ERROR_MSG } from '@constants/helperText';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';

interface searchPWFormProps {
  id: string;
  email: string;
  verificationCode: string;
}

interface SearchPWSecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  firstForm: searchPWFormProps;
}
const SearchPWSecondStep = ({ setCurrentStep, firstForm }: SearchPWSecondStepProps) => {
  const { mutate: changePassword } = useChangePasswordMutation();
  const [isSame, setIsSame] = useState<boolean>(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('');

  const isSamePassword = form.newPassword === form.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === 'newPassword') {
      setPasswordErrorMsg('');
    }
    if (name === 'confirmPassword') {
      setIsSame(isSamePassword);
      setConfirmPasswordErrorMsg('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const { name, value } = e.currentTarget;
    if (name === 'newPassword') {
      if (value && !passwordRegex.test(value)) setPasswordErrorMsg(PASSWORD_ERROR_MSG);
    }
    if (name === 'confirmPassword') {
      if (!(value.length > 0 && isSame)) {
        setConfirmPasswordErrorMsg('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleConfirmSecondStep = () => {
    if (passwordRegex.test(form.newPassword)) {
      changePassword(
        {
          loginId: firstForm.id,
          email: firstForm.email,
          authCode: firstForm.verificationCode,
          password: form.newPassword,
        },
        {
          onSuccess: () => {
            setCurrentStep(3);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (!isSame && form.confirmPassword.length <= 0) return;
    setIsSame(isSamePassword);
  }, [form.newPassword, form.confirmPassword]);

  return (
    <>
      <div className="pb-6 pt-8 text-center text-xs sm:pb-8 sm:pt-10">
        <p className="mb-4 text-paragraph sm:text-base">신규 비밀번호를 입력해주세요.</p>
        <p className="text-xs sm:text-paragraph">입력한 비밀번호로 재설정됩니다.</p>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mx-2 my-14 flex flex-col justify-center gap-6 sm:mx-20 sm:gap-10">
        <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paragraph leading-4 sm:text-base">신규 비밀번호</p>
          <StandardInput
            hasBackground
            className="w-full sm:w-[70%]"
            required
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(passwordErrorMsg)}
            helperText={passwordErrorMsg}
          />
        </div>
        <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paragraph leading-4 sm:text-base">비밀번호 확인</p>
          <StandardInput
            hasBackground
            className="w-full sm:w-[70%]"
            required
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(confirmPasswordErrorMsg)}
            helperText={confirmPasswordErrorMsg || (isSame && '비밀번호가 일치합니다.')}
          />
        </div>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton className="w-full sm:w-1/5" disabled={!isSamePassword} onClick={handleConfirmSecondStep}>
          확인
        </OutlinedButton>
      </div>
    </>
  );
};

export default SearchPWSecondStep;
