import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MemberInfo } from '@api/dto';
import { useStartSeminarMutation, useGetAvailableSeminarInfoQuery, useGetSeminarInfoQuery } from '@api/seminarApi';
import memberState from '@recoil/member.recoil';
import starterState from '@recoil/seminarStarter.recoil';
import FilledButton from '@components/Button/FilledButton';
import Countdown from '../Countdown/Countdown';
import SeminarInput from '../Input/SeminarInput';
import SeminarSelector from '../Selector/SeminarSelector';
import SeminarAttendStatus from '../Status/SeminarAttendStatus';

const BossCardContent = ({ seminarId }: { seminarId: number }) => {
  const [seminarStart, setSeminarStart] = useState(false);
  const setStartMember = useSetRecoilState<number | undefined>(starterState);
  const { data: seminarData } = useGetSeminarInfoQuery(seminarId);
  const [attendValue, setAttendValue] = useState<number>(5);
  const [lateAttendValue, setLateAttendValue] = useState<number>(5);
  const [startTime, setStartTime] = useState(DateTime.now());
  const { mutate: setSeminarTime } = useStartSeminarMutation(seminarId);
  const { data: availableSeminarData } = useGetAvailableSeminarInfoQuery();
  const member: MemberInfo | null = useRecoilValue(memberState);

  const handleOnStartSeminar = () => {
    setStartTime(DateTime.now());
    setStartMember(member?.memberId);
    setSeminarTime({
      attendanceCloseTime: startTime.plus({ minutes: attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
      latenessCloseTime: startTime.plus({ minutes: lateAttendValue + attendValue }).toFormat('yyyy-MM-dd HH:mm:ss'),
    });
  };

  useEffect(() => {
    if (!seminarData || !availableSeminarData) return;

    if (availableSeminarData.id === seminarData.id) {
      setSeminarStart(true);
    }
  }, [seminarData, availableSeminarData]);

  return (
    <>
      <Typography className="!mt-[16px] !text-h3 !font-bold ">{seminarData?.name} 세미나</Typography>
      <p className="mb-[14px] mt-[26px]">출석 코드</p>
      <SeminarInput
        disabled
        helperText="ㅤ"
        setInputCode={() => null}
        inputCode={seminarStart && seminarData && seminarData?.attendanceCode ? seminarData?.attendanceCode : ''}
      />
      <div className="mx-auto mt-[20px] flex h-[60px] w-[146px] justify-between">
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
