import React, { useState } from 'react';
import Countdown from '../Countdown/Countdown';
import SeminarButton from '../Button/SeminarButton';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';

const BossCardContent = () => {
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [seminarExist, setSeminarExist] = useState(false); // Todo: api 적용

  const startSeminar = () => {
    setSeminarExist(true);
  };

  return (
    <>
      <SeminarInput disabled />
      <SeminarButton onClick={startSeminar}>시작</SeminarButton>
      {seminarExist ? (
        <Countdown />
      ) : (
        <>
          <SeminarSelector limitValue={attendValue} setLimitValue={setAttendValue}>
            출석
          </SeminarSelector>
          <SeminarSelector limitValue={lateAttendValue} setLimitValue={setLateAttendValue}>
            지각
          </SeminarSelector>
        </>
      )}
    </>
  );
};

export default BossCardContent;
