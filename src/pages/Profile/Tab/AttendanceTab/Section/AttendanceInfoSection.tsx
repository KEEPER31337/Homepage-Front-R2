import React from 'react';
import { ButtonGroup, Card, CardContent, CardHeader, Typography } from '@mui/material';
import TextButton from '@components/Button/TextButton';

const AttendanceInfoSection = () => {
  return (
    <div className="w-full xl:w-1/2">
      <ButtonGroup>
        <TextButton small>🗓️ 총 출석일</TextButton>
        <TextButton small>🌱 개근 일차</TextButton>
        <TextButton small>🏅 오늘 출석</TextButton>
        <TextButton small>⭐️ pt</TextButton>
      </ButtonGroup>
      <Card>
        <CardHeader title={<Typography>오늘의 출석 포인트</Typography>} />
        <CardContent>test</CardContent>
      </Card>
    </div>
  );
};

export default AttendanceInfoSection;
