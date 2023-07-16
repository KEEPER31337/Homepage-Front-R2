import React, { useState } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import { startSeminar } from '@api/seminarApi';
import Countdown from '../Countdown/Countdown';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';

const BossCardContent = () => {
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [seminarExist, setSeminarExist] = useState(false); // Todo: api 적용
  const [startTime, setStartTime] = useState(DateTime.now());
  const [attendLimit, setAttendLimit] = useState(DateTime.now());
  const [lateLimit, setLateLimit] = useState(DateTime.now());
  const { mutate: setSeminarTime } = startSeminar({ id: 2 }); // Todo: 이후 id 파라미터로 받아옴

  const onStartSeminar = () => {
    setSeminarExist(true);
    setStartTime(DateTime.now());
    setAttendLimit(startTime.plus({ minutes: attendValue }));
    setLateLimit(startTime.plus({ minutes: lateAttendValue + attendValue }));
    setSeminarTime({
      attendanceCloseTime: attendLimit.toFormat('yyyy-MM-dd HH:mm:ss'),
      latenessCloseTime: lateLimit.toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  };

  // Todo: 이용가능한 세미나 조회 api

  return (
    <>
      <SeminarInput disabled inputCode={[0, 0, 0, 0]} />
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
      <div className="mt-[39px] flex justify-center">
        <FilledButton onClick={onStartSeminar}>시작</FilledButton>
      </div>
    </>
  );
};

export default BossCardContent;
