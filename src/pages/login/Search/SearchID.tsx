import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <div className="px-6 sm:h-[492px] sm:w-[690px] sm:px-0">
      {!isSent ? (
        <>
          <div className="pb-6 pt-8 text-center text-xs sm:pb-8 sm:pt-10">
            <p className="mb-4 text-paragraph sm:text-base">가입 시 등록한 이메일을 입력해주세요.</p>
            <p className="text-xs sm:text-paragraph">아이디 조회를 위한 인증코드가 입력한 이메일로 발송됩니다.</p>
          </div>
          <Divider className="bg-pointBlue" />
          <div className="mx-2 my-16 flex justify-between gap-2 sm:mx-20">
            <p className="mt-4 text-paragraph leading-4 sm:text-base">이메일</p>
            <StandardInput
              hasBackground
              className="w-[80%] sm:w-[70%]"
              required
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <Divider className="bg-pointBlue" />
          <div className="mt-10 text-center">
            <OutlinedButton className="w-full sm:w-1/5" onClick={handleConfirmClick} disabled={!isValidEmail}>
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
          <div className="mb-4 flex flex-col gap-8 pb-8 pt-16 text-center text-xs sm:pb-10 sm:pt-20">
            <p className="text-paragraph sm:text-base">회원님의 KEPPER 아이디가</p>
            <p className="text-h3 font-bold text-pointBlue">{email}</p>
            <p className="text-paragraph sm:text-base">이메일로 발송되었습니다.</p>
          </div>
          <div className="relative">
            <Typography
              variant={isMobile ? 'small' : 'paragraph'}
              className="absolute right-0 w-fit hover:underline hover:underline-offset-4"
              component="button"
              onClick={() => setMailAuthenticationModalOpen(true)}
            >
              인증 메일이 오지 않았나요?
            </Typography>
            <MailAuthenticationModal
              open={mailAuthenticationModalOpen}
              onClose={() => setMailAuthenticationModalOpen(false)}
              onOtherEmailButtonClick={handleOtherEmailButtonClick}
              onResendMailButtonClick={handleResendMailButtonClick}
            />
          </div>
          <Link to="/login" className="mt-16 block text-center">
            <OutlinedButton className="w-full sm:w-fit">로그인 페이지로</OutlinedButton>
          </Link>
        </>
      )}
    </div>
  );
};

export default SearchID;
