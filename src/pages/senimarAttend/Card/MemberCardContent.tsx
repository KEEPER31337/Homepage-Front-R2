import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';

const MemberCardContent = () => {
  const [isAttendable, setIsAttendable] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(false);

  const isIncorrectCodeInPeriod = isAttendable && !isCorrectCode;
  const incorrectCodeMsg = '출석코드가 맞지 않습니다. 다시 입력해주세요.';
  const attendLimit = new Date(); // 임시
  attendLimit.setMinutes(attendLimit.getMinutes() + 5); // 임시
  const [inputCode, setInputCode] = useState('');
  const validCode = '1234'; // 임시

  const handleAttendButtonClick = (nowTime: Date) => {
    setIsAttendable(nowTime < attendLimit);
    setIsCorrectCode(inputCode === validCode);
  };

  return (
    <>
      <SeminarInput helperText={isIncorrectCodeInPeriod ? incorrectCodeMsg : ''} setInputCode={setInputCode} />
      <div className="flex justify-center">
        <FilledButton
          onClick={() => {
            handleAttendButtonClick(new Date());
          }}
        >
          출석
        </FilledButton>
      </div>
      <div className="mx-auto mt-[35px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between">
          <Countdown />
        </div>
      </div>
    </>
  );
};

export default MemberCardContent;
