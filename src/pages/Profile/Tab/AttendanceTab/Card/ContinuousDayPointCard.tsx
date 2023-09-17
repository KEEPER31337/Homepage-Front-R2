import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, ListSubheader } from '@mui/material';

const ContinuousDayPointCard = () => {
  const continuousDayPoint = {
    week: 3000,
    month: 10000,
    year: 100000,
  }; // TODO 추후 API 만들어지면 받아오기

  return (
    <Card>
      <CardContent>
        <List
          dense
          subheader={
            <ListSubheader color="inherit" sx={{ bgcolor: 'transparent' }}>
              개근시 획득 가능 포인트
            </ListSubheader>
          }
        >
          <ListItem secondaryAction={<>{continuousDayPoint?.week} Point</>}>
            <ListItemText primary="⭐️ 주 개근" />
          </ListItem>
          <ListItem secondaryAction={<>{continuousDayPoint?.month} Point</>}>
            <ListItemText primary="⭐️ 월 개근" />
          </ListItem>
          <ListItem secondaryAction={<>{continuousDayPoint?.year} Point</>}>
            <ListItemText primary="⭐️ 년 개근" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ContinuousDayPointCard;
