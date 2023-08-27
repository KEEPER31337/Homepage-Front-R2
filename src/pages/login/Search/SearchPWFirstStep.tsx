import { useCheckAuthCodeMutation, useRequestAuthCodeMutation } from '@api/SearchAccountApi';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import BackgroundInput from '@components/Input/BackgroundInput';
import MailAuthenticationModal from '@components/Modal/MailAuthenticationModal';
import WarningModal from '@components/Modal/WarningModal';
import { Divider } from '@mui/material';
import validateEmail from '@utils/validateEmail';
import React, { useEffect, useState } from 'react';

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
  const { mutate: requestAuthcode } = useRequestAuthCodeMutation();
  const { mutate: checkAuthcode, isLoading } = useCheckAuthCodeMutation();

  const [isSent, setIsSent] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [timer, setTimer] = useState('05:00');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [mailAuthenticationModalOpen, setMailAuthenticationModalOpen] = useState(false);
  const [matchInfoModalOpen, setMatchInfoModalOpen] = useState(false);
  const [isValidAuthCode, setIsValidAuthCode] = useState(true);
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
    if (form.id && form.email) {
      requestAuthcode(
        { loginId: form.id, email: form.email },
        {
          onSuccess: () => {
            setIsSent(true);
            setMatchInfoModalOpen(false);
          },
          onError: () => {
            setMatchInfoModalOpen(true);
          },
        },
      );
    }
  };

  const handleConfirmFirstStep = () => {
    checkAuthcode(
      { loginId: form.id, email: form.email, authCode: form.verificationCode },
      {
        onSuccess: (data) => {
          if (data?.auth === true) {
            setCurrentStep(2);
          }
        },
        onError: () => {
          setIsValidAuthCode(false);
        },
      },
    );
  };

  const handleOtherEmailButtonClick = () => {
    setIsSent(false);
    setForm({ ...form, email: '', verificationCode: '' });
    setMailAuthenticationModalOpen(false);
  };

  const handleResendMailButtonClick = () => {
    requestAuthcode({ loginId: form.id, email: form.email });
    setMailAuthenticationModalOpen(false);
  };

  useEffect(() => {
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;
    const interval = setInterval(() => {
      if (isSent === true) {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
          setTimer(`${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`);
          if (seconds === 0) {
            setTimer('시간이 만료되었습니다.');
          }
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
            disabled={isSent}
            name="email"
            value={form.email}
            onChange={handleChange}
            endAdornment={
              <FilledButton small disabled={!isValidEmail || isSent} onClick={handleRequestVerificationCode}>
                인증 요청
              </FilledButton>
            }
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
        <div className="responsive flex w-full justify-between">
          {!isValidAuthCode && (
            <p className="absolute left-20 text-red-500">인증코드가 맞지 않습니다. 다시 입력해주세요.</p>
          )}
          <button
            type="button"
            className="absolute right-20 cursor-pointer hover:underline hover:duration-300"
            onClick={() => setMailAuthenticationModalOpen(true)}
          >
            인증메일이 오지 않았나요?
          </button>
          <MailAuthenticationModal
            open={mailAuthenticationModalOpen}
            onClose={() => setMailAuthenticationModalOpen(false)}
            onOtherEmailButtonClick={handleOtherEmailButtonClick}
            onResendMailButtonClick={handleResendMailButtonClick}
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
