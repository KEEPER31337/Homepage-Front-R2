import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const AttendRankPointCard = () => {
  const attendRankPoint = {
    firstPlace: 500,
    secondPlace: 300,
    thirdPlace: 100,
  }; // TODO 추후 API 만들어지면 받아오기

  return (
    <Card>
      <CardContent>
        <List
          dense
          subheader={
            <ListSubheader color="inherit" sx={{ bgcolor: 'transparent' }}>
              출석 등수별 획득 가능 포인트
            </ListSubheader>
          }
        >
          <ListItem secondaryAction={<>{attendRankPoint?.firstPlace} Point</>}>
            <ListItemText primary="⭐️ 1등" />
          </ListItem>
          <ListItem secondaryAction={<>{attendRankPoint?.secondPlace} Point</>}>
            <ListItemText primary="⭐️ 2등" />
          </ListItem>
          <ListItem secondaryAction={<>{attendRankPoint?.thirdPlace} Point</>}>
            <ListItemText primary="⭐️ 3등" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default AttendRankPointCard;
