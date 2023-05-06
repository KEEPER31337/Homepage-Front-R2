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
      <div className="mx-auto mt-[32px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between">
          {seminarExist ? (
            <Countdown />
          ) : (
            <>
              <SeminarSelector limitValue={attendValue} setLimitValue={setAttendValue} />
              <SeminarSelector limitValue={lateAttendValue} setLimitValue={setLateAttendValue} />
            </>
          )}
        </div>
      </div>
      <div className="mt-[39px] flex justify-center">
        <FilledButton onClick={startSeminar}>시작</FilledButton>
      </div>
    </>
  );
};

export default BossCardContent;
