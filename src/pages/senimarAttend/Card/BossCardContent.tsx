import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import { startSeminar, getAvailableSeminarInfo, getSeminarInfo } from '@api/seminarApi';
import Countdown from '../Countdown/Countdown';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

const BossCardContent = ({ seminarId }: { seminarId: number }) => {
  const [seminarStart, setSeminarStart] = useState(false);
  const { data: seminarData } = getSeminarInfo(seminarId);
  const [attendValue, setAttendValue] = useState<number>(1);
  const [lateAttendValue, setLateAttendValue] = useState<number>(1);
  const [startTime, setStartTime] = useState(DateTime.now());
  const { mutate: setSeminarTime, isSuccess } = startSeminar(seminarId);
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
  }, [isSuccess]);

  useEffect(() => {
    if (seminarData && availableSeminarData?.id === seminarData?.seminarId) setSeminarStart(true);
  }, [availableSeminarData]);

  return (
    <>
      <SeminarInput
        disabled
        helperText="ㅤ"
        inputCode={seminarStart && seminarData ? seminarData?.attendanceCode.split('') : ['', '', '', '']}
      />
      <div className="mx-auto mt-[35px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between text-right">
          {seminarStart && seminarData ? (
            <>
              <Countdown
                startTime={DateTime.fromISO(seminarData.openTime)}
                endTime={DateTime.fromISO(seminarData.attendanceCloseTime)}
              />
              <Countdown
                startTime={DateTime.fromISO(seminarData.attendanceCloseTime)}
                endTime={DateTime.fromISO(seminarData.latenessCloseTime)}
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
        {seminarStart ? (
          <SeminarAttendStatus status="ATTENDANCE" />
        ) : (
          <FilledButton onClick={onStartSeminar}>시작</FilledButton>
        )}
      </div>
    </>
  );
};

export default BossCardContent;
