import React, { useState } from 'react';
import { ButtonGroup, Typography } from '@mui/material';
import { useGetTodayAttendanceInfoQuery } from '@api/attendanceApi';
import TextButton from '@components/Button/TextButton';
import AttendRankPointCard from '../Card/AttendRankPointCard';
import ContinuousDayPointCard from '../Card/ContinuousDayPointCard';
import TodayAttendPointCard from '../Card/TodayAttendPointCard';

interface AttendanceInfoSectionProps {
  memberId: number;
  summary?: boolean;
}

const AttendanceInfoSection = ({ memberId, summary = false }: AttendanceInfoSectionProps) => {
  const [selectedCard, setSelectedCard] = useState<'continuousDay' | 'todayRank' | 'todayPoint'>('todayPoint');
  const { data: todayAttendInfo } = useGetTodayAttendanceInfoQuery({ memberId });

  return (
    <div className="w-full xl:w-1/2">
      <ButtonGroup>
        <TextButton disabled small>
          <Typography variant="small" className="text-white">
            🗓️ 총 출석일 {todayAttendInfo?.totalAttendance}일
          </Typography>
        </TextButton>
        <TextButton disabled={summary} onClick={() => setSelectedCard('continuousDay')} small>
          <Typography variant="small" className={`${summary && 'text-white'}`}>
            🌱 개근 {todayAttendInfo?.continuousDay}일차
          </Typography>
        </TextButton>
        <TextButton disabled={summary} onClick={() => setSelectedCard('todayRank')} small>
          <Typography variant="small" className={`${summary && 'text-white'}`}>
            🏅 오늘 출석 {todayAttendInfo?.todayRank}등
          </Typography>
        </TextButton>
        <TextButton disabled={summary} onClick={() => setSelectedCard('todayPoint')} small>
          <Typography variant="small" className={`${summary && 'text-white'}`}>
            ⭐️ {todayAttendInfo?.todayPoint}pt
          </Typography>
        </TextButton>
      </ButtonGroup>
      {!summary && selectedCard === 'continuousDay' && <ContinuousDayPointCard />}
      {!summary && selectedCard === 'todayRank' && <AttendRankPointCard />}
      {!summary && selectedCard === 'todayPoint' && <TodayAttendPointCard />}
    </div>
  );
};

export default AttendanceInfoSection;
