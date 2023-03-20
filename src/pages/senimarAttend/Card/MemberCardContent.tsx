import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';

const MemberCardContent = () => {
  const [componentIncorrectAlert, setComponentIncorrectAlert] = useState('');
  const incorrectCodeAlert = '출석코드가 맞지 않습니다. 다시 입력해주세요.';
  const attendLimit = new Date(); // 임시
  attendLimit.setMinutes(attendLimit.getMinutes() + 5); // 임시
  const inputCode = [0, 0, 0, 0];
  const validCode = '1234'; // 임시

  const handleAttendButtonClick = (today: Date) => {
    if (today < attendLimit) {
      // 임시: api에서 출석 status 가져올수 있으면 if문 필요없음
      if (inputCode.join('') === validCode) {
        setComponentIncorrectAlert('');
      } else {
        setComponentIncorrectAlert(incorrectCodeAlert);
        // TODO: Input 내용물 전부 지우기
      }
    } else {
      setComponentIncorrectAlert('');
    }
  };

  return (
    <>
      <SeminarInput helperText={componentIncorrectAlert} />
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
        <Countdown />
      </div>
    </>
  );
};

export default MemberCardContent;
