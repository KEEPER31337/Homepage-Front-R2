import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useStartSeminarMutation, useGetSeminarInfoQuery } from '@api/seminarApi';
import FilledButton from '@components/Button/FilledButton';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

const BossCardContent = ({ seminarId }: { seminarId: number }) => {
  const { data: seminarData, isLoading, isFetching } = useGetSeminarInfoQuery(seminarId);
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [isTransitionTime, setIsTransitionTime] = useState(false);
  const { mutate: setSeminarTime, isPending } = useStartSeminarMutation(seminarId);

  const handleOnStartSeminar = () => {
    const startTime = DateTime.now();
    setSeminarTime({
      attendanceCloseTime: startTime.plus({ minutes: attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
      latenessCloseTime: startTime.plus({ minutes: lateAttendValue + attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  };

  return isLoading ? (
    <div className="flex h-full items-center">
      <CircularProgress />
    </div>
  ) : (
    <>
      <Typography className="!mt-[16px] !text-h3 !font-bold">{seminarData?.name} 세미나</Typography>
      <p className="mb-[14px] mt-[26px]">출석 코드</p>
      <SeminarInput
        disabled
        helperText="ㅤ"
        setInputCode={() => null}
        inputCode={seminarData?.attendanceStartTime ? (seminarData.attendanceCode ?? '') : ''}
      />
      <div className="mx-auto mt-[20px] flex h-[60px] w-[146px] justify-between">
        <div className="grid content-between">
          <div>출석</div>
          <div>지각</div>
        </div>
        <div className="grid content-between text-right">
          {seminarData &&
            (!seminarData.attendanceStartTime ? (
              <>
                <SeminarSelector limitValue={attendValue} setLimitValue={setAttendValue} />
                <SeminarSelector limitValue={lateAttendValue} setLimitValue={setLateAttendValue} />
              </>
            ) : (
              <>
                <Countdown
                  startTime={seminarData.attendanceStartTime}
                  endTime={seminarData.attendanceCloseTime}
                  isTransitionTime={isTransitionTime}
                  setIsTransitionTime={setIsTransitionTime}
                />
                <Countdown
                  startTime={seminarData.attendanceCloseTime}
                  endTime={seminarData.latenessCloseTime}
                  isTransitionTime={isTransitionTime}
                  setIsTransitionTime={setIsTransitionTime}
                />
              </>
            ))}
        </div>
      </div>
      <div className="mt-[39px] flex justify-center">
        {seminarData && !seminarData.attendanceStartTime ? (
          <FilledButton onClick={handleOnStartSeminar} disabled={isPending || isFetching}>
            시작
          </FilledButton>
        ) : (
          seminarData && <SeminarAttendStatus status={seminarData?.statusType} />
        )}
      </div>
    </>
  );
};

export default BossCardContent;
