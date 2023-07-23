import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import MailAuthenticationModal from '@components/Modal/MailAuthenticationModal';
import { Divider } from '@mui/material';
import validateEmail from '@utils/validateEmail';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchID = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isSent, setIsSent] = useState(false);
  const [mailAuthenticationModalOpen, setMailAuthenticationModalOpen] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);

    const isValid = validateEmail(value);
    setIsValidEmail(isValid);
  };

  const handleConfirmClick = () => {
    if (isValidEmail) {
      console.log('유효한 이메일 주소입니다:', email);
      setIsSent(true);
    } else {
      console.log('유효하지 않은 이메일 주소입니다:', email);
    }
  };

  return (
    <div className="h-full w-full items-center justify-center">
      <div className="h-[480px] w-[700px]">
        {!isSent ? (
          <>
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
          </>
        ) : (
          <>
            <div className="flex flex-col gap-6 pb-10 pt-20 text-center">
              <p className="text-14">회원님의 KEPPER 아이디가</p>
              <p className="text-20 font-bold text-pointBlue">{email}</p>
              <p>이메일로 발송되었습니다.</p>
            </div>
            <div className="text-right">
              <span className="cursor-pointer hover:underline hover:duration-300">인증메일이 오지 않았나요?</span>
              <MailAuthenticationModal
                open={mailAuthenticationModalOpen}
                onClose={() => setMailAuthenticationModalOpen(false)}
                onOtherEmailButtonClick={() => setMailAuthenticationModalOpen(false)}
                onResendMailButtonClick={() => setMailAuthenticationModalOpen(false)}
              />
            </div>
            <div className="mt-10 text-center">
              <Link to="/login">
                <OutlinedButton onClick={handleConfirmClick} disabled={!isValidEmail}>
                  로그인 페이지로
                </OutlinedButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchID;
