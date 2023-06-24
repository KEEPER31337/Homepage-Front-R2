import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';

const MemberCardContent = () => {
  const [isAttendable, setIsAttendable] = useState(false);
  const [isCorrectCode, setIsCorrectCode] = useState(false);
  const isIncorrectCodeInPeriod = isAttendable && !isCorrectCode;
  const incorrectCodeMsg = '출석코드가 맞지 않습니다. 다시 입력해주세요.';
  const [startTime, setStartTime] = useState(DateTime.now());
  const attendLimit = startTime.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시:이후 api에서 가져옴
  const lateLimit = attendLimit.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시: 이후 api에서 가져옴

  const [inputCode, setInputCode] = useState([0, 0, 0, 0]);
  const validCode = '1234'; // 임시

  const handleAttendButtonClick = () => {
    const nowTime = DateTime.now();
    setIsAttendable(nowTime < attendLimit);
    setIsCorrectCode(inputCode.join('') === validCode);
  };

  return (
    <>
      <SeminarInput
        helperText={isIncorrectCodeInPeriod ? incorrectCodeMsg : ''}
        setInputCode={setInputCode}
        inputCode={inputCode}
      />
      <div className="flex justify-center">
        <FilledButton
          onClick={() => {
            handleAttendButtonClick();
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
        <div className="grid content-between text-right">
          <Countdown startTime={startTime} endTime={attendLimit} />
          <Countdown startTime={attendLimit} endTime={lateLimit} />
        </div>
      </div>
    </>
  );
};

export default MemberCardContent;
