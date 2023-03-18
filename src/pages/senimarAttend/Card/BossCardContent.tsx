import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import Countdown from '../Countdown/Countdown';
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
      <div className="flex justify-center">
        <FilledButton onClick={startSeminar}>시작</FilledButton>
      </div>
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
