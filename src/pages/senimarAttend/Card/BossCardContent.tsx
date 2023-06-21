import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import Countdown from '../Countdown/Countdown';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';

const BossCardContent = () => {
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [seminarExist, setSeminarExist] = useState(false); // Todo: api 적용
  const [startTime, setStartTime] = useState(DateTime.now());
  const attendLimit = startTime.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시:이후 api에서 가져옴
  const lateLimit = attendLimit.plus({ days: 0, hours: 0, minutes: 0, seconds: 5 }); // 임시: 이후 api에서 가져옴
  const startSeminar = () => {
    setSeminarExist(true);
    setStartTime(DateTime.now());
  };

  return (
    <>
      <SeminarInput disabled />
      <div className="flex justify-center">
        <FilledButton onClick={startSeminar}>시작</FilledButton>
      </div>
      <div className="mx-auto mt-[35px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between text-right">
          {seminarExist ? (
            <>
              <Countdown startTime={startTime} endTime={attendLimit} />
              <Countdown startTime={attendLimit} endTime={lateLimit} />
            </>
          ) : (
            <>
              <SeminarSelector limitValue={attendValue} setLimitValue={setAttendValue} />
              <SeminarSelector limitValue={lateAttendValue} setLimitValue={setLateAttendValue} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BossCardContent;
