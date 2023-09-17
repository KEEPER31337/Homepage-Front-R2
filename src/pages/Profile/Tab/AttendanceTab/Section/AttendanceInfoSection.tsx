import React, { useState } from 'react';
import { ButtonGroup, Card, CardContent, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { useGetTodayAttendanceInfoQuery, useGetTodayAttendancePointQuery } from '@api/attendanceApi';
import TextButton from '@components/Button/TextButton';

interface AttendanceInfoSectionProps {
  memberId: number;
}

const AttendanceInfoSection = ({ memberId }: AttendanceInfoSectionProps) => {
  const [, setSelectedCard] = useState(1);
  const { data: todayAttendInfo } = useGetTodayAttendanceInfoQuery({ memberId });
  const { data: todayAttendPoint } = useGetTodayAttendancePointQuery();

  return (
    <div className="w-full xl:w-1/2">
      <ButtonGroup>
        <TextButton disabled small>
          <Typography variant="small" className="text-white">
            🗓️ 총 출석일 {/* TODO API 추가되면 받아오기 */}일
          </Typography>
        </TextButton>
        <TextButton onClick={() => setSelectedCard(1)} small>
          🌱 개근 {todayAttendInfo?.continuousDay}일차
        </TextButton>
        <TextButton onClick={() => setSelectedCard(2)} small>
          🏅 오늘 출석 {todayAttendInfo?.todayRank}등
        </TextButton>
        <TextButton onClick={() => setSelectedCard(3)} small>
          ⭐️ {todayAttendInfo?.todayPoint}pt
        </TextButton>
      </ButtonGroup>
      <Card>
        <CardContent>
          <List
            dense
            subheader={
              <ListSubheader color="inherit" sx={{ bgcolor: 'transparent' }}>
                오늘의 출석 포인트
              </ListSubheader>
            }
          >
            <ListItem secondaryAction={<>{todayAttendPoint?.point} Point</>}>
              <ListItemText primary="⭐️ 기본 포인트" />
            </ListItem>
            <ListItem secondaryAction={<>{todayAttendPoint?.continuousPoint} Point</>}>
              <ListItemText primary="⭐️ 개근 포인트" />
            </ListItem>
            <ListItem secondaryAction={<>{todayAttendPoint?.rankPoint} Point</>}>
              <ListItemText primary="⭐️ 등수 포인트" />
            </ListItem>
            <ListItem secondaryAction={<>{todayAttendPoint?.randomPoint} Point</>}>
              <ListItemText primary="⭐️ 랜덤 포인트" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceInfoSection;
