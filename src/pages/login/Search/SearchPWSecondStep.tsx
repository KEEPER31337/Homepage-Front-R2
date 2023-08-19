import { useChangePasswordMutation } from '@api/SearchAccountApi';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
  const { mutate: changePassword, isSuccess, isError } = useChangePasswordMutation();
  const [isSame, setIsSame] = useState<boolean>(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const isSamePassword = () => {
    setIsSame(form.newPassword === form.confirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === 'confirmPassword') {
      isSamePassword();
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
          onSuccess: (data) => {
            setCurrentStep(3);
          },
        },
      );
    }
  };

  useEffect(() => {
    isSamePassword();
  }, [form.newPassword, form.confirmPassword]);

  return (
    <>
      <div className="pb-8 pt-10 text-center">
        <p>신규 비밀번호를 입력해주세요.</p>
        <p>입력한 비밀번호로 재설정됩니다.</p>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mx-20 my-12 flex flex-col justify-center gap-10 text-right">
        <div className="flex justify-between gap-10">
          <p className="mt-4 leading-4">신규 비밀번호</p>
          <BackgroundInput
            className="w-[70%]"
            required
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between gap-10">
          <p className="mt-4 leading-4">비밀번호 확인</p>
          <BackgroundInput
            className="w-[70%]"
            required
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {form.confirmPassword !== '' && (
          <p className={`${isSame ? 'text-pointBlue' : 'text-red-500'}`}>
            {isSame ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
          </p>
        )}{' '}
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton disabled={!isSamePassword} onClick={handleConfirmSecondStep}>
          확인
        </OutlinedButton>
      </div>
    </>
  );
};

export default SearchPWSecondStep;
