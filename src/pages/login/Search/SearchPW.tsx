import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import StandardTab from '@components/Tab/StandardTab';
import { Button, Container, Divider, autocompleteClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';

const SearchPW = () => {
  const [form, setForm] = useState({
    id: '',
    email: '',
    verificationCode: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [timer, setTimer] = useState('05:00');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRequestVerificationCode = () => {
    if (form.email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    setIsSent(true);
  };

  useEffect(() => {
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;
    const interval = setInterval(() => {
      if (isSent === true) {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
          setTimer(`${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isSent, seconds]);

  return (
    <div className="h-full w-full items-center justify-center">
      <div className="h-[480px] w-[700px]">
        <div className="pb-8 pt-10 text-center">
          <p>가입 시 등록한 이메일을 입력해주세요.</p>
          <p>비밀번호 재설정을 위한 인증코드가 이메일로 발송됩니다.</p>
        </div>
        <Divider className="bg-pointBlue" />
        <div className="mx-20 my-12 flex flex-col justify-center gap-10">
          <div className="relative flex justify-between gap-10">
            <p className="mt-4 leading-4">아이디</p>
            <BackgroundInput className="w-[70%]" required name="id" value={form.id} onChange={handleChange} />
          </div>
          <div className="relative flex justify-between gap-10">
            <p className="mt-4 leading-4">이메일</p>
            <BackgroundInput
              className="w-[70%]"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              endAdornment={
                <FilledButton disabled={isSent} onClick={handleRequestVerificationCode}>
                  인증 요청
                </FilledButton>
              }
            />
          </div>
          <div className="flex justify-between gap-10">
            <p className="mt-4 leading-4">인증코드</p>
            <BackgroundInput
              className="w-[70%]"
              required
              name="verificationCode"
              value={form.verificationCode}
              onChange={handleChange}
              endAdornment={<p>{timer}</p>}
            />
          </div>
        </div>
        <Divider className="bg-pointBlue" />
        <div className="mt-10 text-center">
          <OutlinedButton>확인</OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default SearchPW;
