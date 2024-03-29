import React, { useState } from 'react';
import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { useCheckAuthCodeMutation, useRequestAuthCodeMutation } from '@api/SearchAccountApi';
import { COMMON, EMAIL_MSG } from '@constants/helperText';
import { validateEmail } from '@utils/validateEmail';
import OutlinedButton from '@components/Button/OutlinedButton';
import EmailAuthInput from '@components/Input/EmailAuthInput';
import StandardInput from '@components/Input/StandardInput';
import TimerInput from '@components/Input/TimerInput';
import MailAuthenticationModal from '@components/Modal/MailAuthenticationModal';
import WarningModal from '@components/Modal/WarningModal';

interface searchPWFormProps {
  id: string;
  email: string;
  verificationCode: string;
}

interface SearchPWFirstStepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  form: searchPWFormProps;
  setForm: React.Dispatch<React.SetStateAction<searchPWFormProps>>;
}

const SearchPWFirstStep = ({ setCurrentStep, form, setForm }: SearchPWFirstStepProps) => {
  const {
    mutate: requestAuthcode,
    isLoading: isEmailSendLoading,
    isSuccess: isEmailSendSuccess,
  } = useRequestAuthCodeMutation();
  const { mutate: checkAuth } = useCheckAuthCodeMutation();

  const [expirationTime, setExpirationTime] = useState<DateTime | null>(null);
  const [isAuthCodeRequireClick, setIsAuthCodeRequireClick] = useState(false);
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [mailAuthenticationModalOpen, setMailAuthenticationModalOpen] = useState(false);
  const [matchInfoModalOpen, setMatchInfoModalOpen] = useState(false);
  const [isValidAuthCode, setIsValidAuthCode] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
    if (name === 'email') {
      const isValid = validateEmail(value);
      setIsValidEmail(isValid);
      if (isValid) setEmailErrorMsg('');
    }
    if (name === 'id') {
      if (value.length > 0) setIdErrorMsg('');
    }
    if (name === 'verificationCode') {
      setIsValidAuthCode(true);
    }
  };

  const handleEmailBlur = () => {
    if (!validateEmail(form.email)) {
      setEmailErrorMsg(EMAIL_MSG.error.formatError);
    }
  };

  const handleRequestVerificationCode = () => {
    if (!form.id) {
      setIdErrorMsg(COMMON.error.required);
      return;
    }
    if (!form.email) {
      setEmailErrorMsg(COMMON.error.required);
      return;
    }

    requestAuthcode(
      { loginId: form.id, email: form.email },
      {
        onSuccess: ({ expiredSeconds }) => {
          setIsAuthCodeRequireClick(true);
          setExpirationTime(DateTime.now().plus({ seconds: expiredSeconds }));
          setMatchInfoModalOpen(false);
        },
        onError: () => {
          setMatchInfoModalOpen(true);
          setIsAuthCodeRequireClick(false);
        },
      },
    );
  };

  const handleConfirmFirstStep = () => {
    checkAuth(
      {
        loginId: form.id,
        email: form.email,
        authCode: form.verificationCode,
      },
      {
        onSuccess: (data) => {
          if (data?.auth === true) {
            setCurrentStep(2);
          } else {
            setIsValidAuthCode(false);
          }
        },
      },
    );
  };

  const handleOtherEmailButtonClick = () => {
    setIsAuthCodeRequireClick(false);
    setExpirationTime(null);
    setForm({ ...form, email: '', verificationCode: '' });
    setMailAuthenticationModalOpen(false);
  };

  const handleResendMailButtonClick = () => {
    requestAuthcode(
      { loginId: form.id, email: form.email },
      {
        onSuccess: ({ expiredSeconds }) => {
          setExpirationTime(DateTime.now().plus({ seconds: expiredSeconds }));
        },
      },
    );
    setMailAuthenticationModalOpen(false);
  };

  return (
    <>
      <div className="pb-6 pt-8 text-center text-xs sm:pb-8 sm:pt-10">
        <p className="mb-4 text-paragraph sm:text-base">가입 시 등록한 이메일을 입력해주세요.</p>
        <p className="text-xs sm:text-paragraph">아이디 조회를 위한 인증코드가 입력한 이메일로 발송됩니다.</p>
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mx-2 my-14 flex flex-col justify-center gap-6 sm:mx-20 sm:gap-10">
        <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paragraph leading-4 sm:text-base">아이디</p>
          <StandardInput
            hasBackground
            className="w-full sm:w-[70%]"
            required
            name="id"
            value={form.id}
            onChange={handleChange}
            error={Boolean(idErrorMsg)}
            helperText={idErrorMsg}
          />
        </div>
        <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paragraph leading-4 sm:text-base">이메일</p>
          <EmailAuthInput
            className="w-full sm:w-[70%]"
            inputDisabled={isAuthCodeRequireClick}
            isLoading={isAuthCodeRequireClick && isEmailSendLoading}
            isSuccess={isAuthCodeRequireClick && isEmailSendSuccess}
            value={form.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            buttonDisabled={!isValidEmail || isAuthCodeRequireClick}
            onAuthButtonClick={handleRequestVerificationCode}
            error={Boolean(emailErrorMsg)}
            helperText={emailErrorMsg}
          />
        </div>
        <WarningModal
          open={matchInfoModalOpen}
          onClose={() => setMatchInfoModalOpen(false)}
          actionButtonName="확인"
          onActionButonClick={() => setMatchInfoModalOpen(false)}
        >
          해당 아이디 + 이메일로 가입된 정보가 없습니다.
        </WarningModal>
        <div className="flex flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paragraph leading-4 sm:text-base">인증코드</p>
          <TimerInput
            className="w-full sm:w-[70%]"
            name="verificationCode"
            value={form.verificationCode}
            onChange={handleChange}
            disabled={!(isAuthCodeRequireClick && isEmailSendSuccess)}
            expirationTime={expirationTime}
          />
        </div>
        {!isValidAuthCode && <p className="text-red-500">인증코드가 맞지 않습니다. 다시 입력해주세요.</p>}
        {isAuthCodeRequireClick && (
          <div className="relative -mx-2 sm:-mx-20 ">
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
        )}
      </div>
      <Divider className="bg-pointBlue" />
      <div className="mt-10 text-center">
        <OutlinedButton
          className="w-full sm:w-1/5"
          disabled={!(form.verificationCode.length > 0)}
          onClick={handleConfirmFirstStep}
        >
          확인
        </OutlinedButton>
      </div>
    </>
  );
};

export default SearchPWFirstStep;
