import React, { useState, useEffect } from 'react';
import FilledButton from '@components/Button/FilledButton';
import { DateTime } from 'luxon';
import { useStartSeminarMutation, useGetAvailableSeminarInfoQuery, useGetSeminarInfoQuery } from '@api/seminarApi';
import Countdown from '../Countdown/Countdown';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarInput from '../Input/SeminarInput';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

const BossCardContent = () => {
  const [seminarStart, setSeminarStart] = useState(false);
  const { data: seminarData } = useGetSeminarInfoQuery(5); // TODO: 파라미터로 아이디 받아오기
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [startTime, setStartTime] = useState(DateTime.now());
  const { mutate: setSeminarTime } = useStartSeminarMutation(5); // Todo: 이후 id 파라미터로 받아옴
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const handleOnStartSeminar = () => {
    setStartTime(DateTime.now());
    setSeminarTime({
      attendanceCloseTime: startTime.plus({ minutes: attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
      latenessCloseTime: startTime.plus({ minutes: lateAttendValue + attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  };

  useEffect(() => {
    if (seminarData && availableSeminarData?.id === seminarData.seminarId) setSeminarStart(true);
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
              <Countdown startTime={seminarData.openTime} endTime={seminarData.attendanceCloseTime} />
              <Countdown startTime={seminarData.attendanceCloseTime} endTime={seminarData.latenessCloseTime} />
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
          <FilledButton onClick={handleOnStartSeminar}>시작</FilledButton>
        )}
      </div>
    </>
  );
};

export default BossCardContent;
