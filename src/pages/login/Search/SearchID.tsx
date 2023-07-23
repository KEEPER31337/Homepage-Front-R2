import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import StandardTab from '@components/Tab/StandardTab';
import { Button, Container, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SearchID = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);

  const validateEmail = (input: string): boolean => {
    if (input) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(input);
    }
    return false;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);

    const isValid = validateEmail(value);
    setIsValidEmail(isValid);
  };

  const handleConfirmClick = () => {
    if (isValidEmail) {
      console.log('유효한 이메일 주소입니다:', email);
    } else {
      console.log('유효하지 않은 이메일 주소입니다:', email);
    }
  };

  return (
    <div className="h-full w-full items-center justify-center">
      <div className="h-[480px] w-[700px]">
        <div className="pb-8 pt-10 text-center">
          <p>가입 시 등록한 이메일을 입력해주세요.</p>
          <p>아이디 조회를 위한 인증코드가 입력한 이메일로 발송됩니다.</p>
        </div>
        <Divider className="bg-pointBlue" />
        <div className="mx-20 flex flex-col justify-center gap-10 pb-12 pt-8">
          <div className="relative my-10 flex justify-between gap-10">
            <p className="mt-4 leading-4">이메일</p>
            <BackgroundInput className="w-[70%]" required name="email" value={email} onChange={handleEmailChange} />
          </div>
        </div>
        <Divider className="bg-pointBlue" />
        <div className="mt-10 text-center">
          <OutlinedButton onClick={handleConfirmClick} disabled={!isValidEmail}>
            확인
          </OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default SearchID;
