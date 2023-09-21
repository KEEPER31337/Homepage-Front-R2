import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { useGetTodayAttendancePointQuery } from '@api/attendanceApi';

const TodayAttendPointCard = () => {
  const { data: todayAttendPoint } = useGetTodayAttendancePointQuery();

  return (
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
  );
};

export default TodayAttendPointCard;
