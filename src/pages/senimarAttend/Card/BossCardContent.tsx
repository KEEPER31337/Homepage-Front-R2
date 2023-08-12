import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import { startSeminar, getAvailableSeminarInfo } from '@api/seminarApi';
import Countdown from '../Countdown/Countdown';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';

const BossCardContent = () => {
  const [attendValue, setAttendValue] = useState<number>(2);
  const [lateAttendValue, setLateAttendValue] = useState<number>(2);
  const [startTime, setStartTime] = useState(DateTime.now());
  const { mutate: setSeminarTime } = startSeminar(5); // Todo: 이후 id 파라미터로 받아옴
  const { data: availableSeminarData, refetch: availableSeminarRefetch } = getAvailableSeminarInfo();
  const onStartSeminar = () => {
    setStartTime(DateTime.now());
    setSeminarTime({
      attendanceCloseTime: startTime.plus({ minutes: attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
      latenessCloseTime: startTime.plus({ minutes: lateAttendValue + attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  };

  useEffect(() => {
    availableSeminarRefetch();
  }, [availableSeminarData]);

  return (
    <>
      <SeminarInput
        disabled
        helperText="ㅤ"
        inputCode={availableSeminarData?.id ? availableSeminarData?.attendanceCode.split('') : ['', '', '', '']}
      />
      <div className="mx-auto mt-[35px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between text-right">
          {availableSeminarData?.id ? (
            <>
              <Countdown
                startTime={DateTime.fromISO(availableSeminarData.openTime)}
                endTime={DateTime.fromISO(availableSeminarData.attendanceCloseTime)}
              />
              <Countdown
                startTime={DateTime.fromISO(availableSeminarData.attendanceCloseTime)}
                endTime={DateTime.fromISO(availableSeminarData.latenessCloseTime)}
              />
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
