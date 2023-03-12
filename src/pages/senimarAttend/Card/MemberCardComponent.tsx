import React, { useState } from 'react';
import Countdown from '../Countdown/Countdown';
import SeminarButton from '../Button/SeminarButton';
import SeminarInput from '../Input/SeminarInput';

const MemberCardComponent = () => {
  const [componentIncorrectAlert, setComponentIncorrectAlert] = useState(<p className="mb-[22px]" />);
  const incorrectCodeAlert = <p className="my-[4px] ">출석코드가 맞지 않습니다. 다시 입력해주세요.</p>;
  const attendLimit = new Date(); // 임시
  attendLimit.setMinutes(attendLimit.getMinutes() + 5); // 임시
  const Attendance = (today: Date) => {
    if (today < attendLimit) {
      // 임시: api에서 출석 status 가져올수 있으면 if문 필요없음
      if (1) {
        setComponentIncorrectAlert(<p />);
      } else {
        setComponentIncorrectAlert(incorrectCodeAlert);
        // TODO: Input 내용물 전부 지우기
      }
    } else {
      setComponentIncorrectAlert(<p />);
    }
  };

  return (
    <>
      <SeminarInput />
      <div className="mx-auto flex items-center justify-center text-small text-red-500">{componentIncorrectAlert}</div>
      <SeminarButton
        onClick={() => {
          Attendance(new Date());
        }}
      >
        출석
      </SeminarButton>
      <Countdown />
    </>
  );
};

export default MemberCardComponent;
