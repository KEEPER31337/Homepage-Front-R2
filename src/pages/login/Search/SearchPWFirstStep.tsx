import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import { Divider } from '@mui/material';
import validateEmail from '@utils/validateEmail';
import React, { useEffect, useState } from 'react';

interface SearchPWFirstStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const SearchPWFirstStep = ({ setCurrentStep }: SearchPWFirstStepProps) => {
  const [form, setForm] = useState({
    id: '',
    email: '',
    verificationCode: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [timer, setTimer] = useState('05:00');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === 'email') {
      const isValid = validateEmail(value);
      setIsValidEmail(isValid);
    }
  };

  const handleRequestVerificationCode = () => {
    if (form.id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (form.email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    // TODO 인증코드 요청 api 호출
    setIsSent(true);
  };

  const handleConfirmFirstStep = () => {
    // TODO 인증코드 일치 확인 api 호출
    setCurrentStep(2);
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
    <>
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
              <FilledButton disabled={!isValidEmail} onClick={handleRequestVerificationCode}>
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
            disabled={!isSent}
            name="verificationCode"
            value={form.verificationCode}
            onChange={handleChange}
            endAdornment={<p>{timer}</p>}
          />
        </div>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton disabled={!(form.verificationCode.length > 0)} onClick={handleConfirmFirstStep}>
          확인
        </OutlinedButton>
      </div>
    </>
  );
};

export default SearchPWFirstStep;
