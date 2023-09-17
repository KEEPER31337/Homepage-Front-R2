import React, { useState } from 'react';
import { ButtonGroup, Typography } from '@mui/material';
import { useGetTodayAttendanceInfoQuery } from '@api/attendanceApi';
import TextButton from '@components/Button/TextButton';
import TodayAttendPointCard from '../Card/TodayAttendPointCard';

interface AttendanceInfoSectionProps {
  memberId: number;
}

const AttendanceInfoSection = ({ memberId }: AttendanceInfoSectionProps) => {
  const [selectedCard, setSelectedCard] = useState<'continuousDay' | 'todayRank' | 'todayPoint'>('todayPoint');
  const { data: todayAttendInfo } = useGetTodayAttendanceInfoQuery({ memberId });

  return (
    <div className="w-full xl:w-1/2">
      <ButtonGroup>
        <TextButton disabled small>
          <Typography variant="small" className="text-white">
            🗓️ 총 출석일 {/* TODO API 추가되면 받아오기 */}일
          </Typography>
        </TextButton>
        <TextButton onClick={() => setSelectedCard('continuousDay')} small>
          🌱 개근 {todayAttendInfo?.continuousDay}일차
        </TextButton>
        <TextButton onClick={() => setSelectedCard('todayRank')} small>
          🏅 오늘 출석 {todayAttendInfo?.todayRank}등
        </TextButton>
        <TextButton onClick={() => setSelectedCard('todayPoint')} small>
          ⭐️ {todayAttendInfo?.todayPoint}pt
        </TextButton>
      </ButtonGroup>
      {selectedCard === 'todayPoint' && <TodayAttendPointCard />}
    </div>
  );
};

export default AttendanceInfoSection;
