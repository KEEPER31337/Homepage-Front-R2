import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useSearchIdMutation } from '@api/SearchAccountApi';
import { validateEmail } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardInput from '@components/Input/StandardInput';
import MailAuthenticationModal from '@components/Modal/MailAuthenticationModal';
import WarningModal from '@components/Modal/WarningModal';

const SearchID = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [mailAuthenticationModalOpen, setMailAuthenticationModalOpen] = useState(false);
  const [matchInfoModalOpen, setMatchInfoModalOpen] = useState(false);

  const { mutate: searchId } = useSearchIdMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);

    const isValid = validateEmail(value);
    setIsValidEmail(isValid);
  };

  const handleConfirmClick = () => {
    searchId(
      { email },
      {
        onSuccess: () => {
          setIsSent(true);
        },
        onError: () => {
          setMatchInfoModalOpen(true);
        },
      },
    );
  };

  const handleOtherEmailButtonClick = () => {
    setIsSent(false);
    setEmail('');
    setMailAuthenticationModalOpen(false);
  };

  const handleResendMailButtonClick = () => {
    searchId({ email });
    setMailAuthenticationModalOpen(false);
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
                <StandardInput
                  hasBackground
                  className="w-[70%]"
                  required
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <Divider className="bg-pointBlue" />
            <div className="mt-10 text-center">
              <OutlinedButton onClick={handleConfirmClick} disabled={!isValidEmail}>
                확인
              </OutlinedButton>
            </div>
            <WarningModal
              open={matchInfoModalOpen}
              onClose={() => setMatchInfoModalOpen(false)}
              actionButtonName="확인"
              onActionButonClick={() => setMatchInfoModalOpen(false)}
            >
              해당 아이디로 가입된 정보가 없습니다.
            </WarningModal>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-6 pb-10 pt-20 text-center">
              <p>회원님의 KEPPER 아이디가</p>
              <p className="text-h3 font-bold text-pointBlue">{email}</p>
              <p>이메일로 발송되었습니다.</p>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="cursor-pointer hover:underline hover:duration-300"
                onClick={() => setMailAuthenticationModalOpen(true)}
              >
                인증 메일이 오지 않았나요?
              </button>
              <MailAuthenticationModal
                open={mailAuthenticationModalOpen}
                onClose={() => setMailAuthenticationModalOpen(false)}
                onOtherEmailButtonClick={handleOtherEmailButtonClick}
                onResendMailButtonClick={handleResendMailButtonClick}
              />
            </div>
            <Link to="/login" className="mt-10 block text-center">
              <OutlinedButton>로그인 페이지로</OutlinedButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchID;
