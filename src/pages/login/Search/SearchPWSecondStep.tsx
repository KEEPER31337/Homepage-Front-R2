import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface SearchPWSecondStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const SearchPWSecondStep = ({ setCurrentStep }: SearchPWSecondStepProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === 'confirmPassword') {
      // TODO
    }
  };

  const handleConfirmSecondStep = () => {
    setCurrentStep(3);
  };

  const isSamePassword = () => {
    if (form.newPassword === '' && form.confirmPassword === '') {
      return false;
    }
    return form.newPassword === form.confirmPassword;
  };

  return (
    <>
      <div className="pb-8 pt-10 text-center">
        <p>신규 비밀번호를 입력해주세요.</p>
        <p>입력한 비밀번호로 재설정됩니다.</p>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mx-20 my-12 flex flex-col justify-center gap-10">
        <div className="relative flex justify-between gap-10">
          <p className="mt-4 leading-4">신규 비밀번호</p>
          <BackgroundInput
            className="w-[70%]"
            required
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="relative flex justify-between gap-10">
          <p className="mt-4 leading-4">비밀번호 확인</p>
          <BackgroundInput
            className="w-[70%]"
            required
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton disabled={!isSamePassword()} onClick={handleConfirmSecondStep}>
          확인
        </OutlinedButton>
      </div>
    </>
  );
};

export default SearchPWSecondStep;
