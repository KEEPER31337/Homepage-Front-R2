import React from 'react';
import { ButtonGroup, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useGetTodayAttendanceInfoQuery } from '@api/attendanceApi';
import TextButton from '@components/Button/TextButton';

interface AttendanceInfoSectionProps {
  memberId: number;
}

const AttendanceInfoSection = ({ memberId }: AttendanceInfoSectionProps) => {
  const { data: todayAttendInfo } = useGetTodayAttendanceInfoQuery({ memberId });

  return (
    <div className="w-full xl:w-1/2">
      <ButtonGroup>
        <TextButton small>🗓️ 총 출석일 {/* TODO API 추가되면 받아오기 */}일</TextButton>
        <TextButton small>🌱 개근 {todayAttendInfo?.continuousDay}일차</TextButton>
        <TextButton small>🏅 오늘 출석 {todayAttendInfo?.todayRank}등</TextButton>
        <TextButton small>⭐️ {todayAttendInfo?.todayPoint}pt</TextButton>
      </ButtonGroup>
      <Card>
        <CardHeader title={<Typography>오늘의 출석 포인트</Typography>} />
        <CardContent>test</CardContent>
      </Card>
    </div>
  );
};

export default AttendanceInfoSection;
