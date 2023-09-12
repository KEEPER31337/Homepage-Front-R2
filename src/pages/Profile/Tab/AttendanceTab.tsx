import React, { useState } from 'react';
import { ButtonGroup, Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';
import { ResponsiveCalendar } from '@nivo/calendar';
import { VscChevronLeft, VscChevronRight, VscPinned } from 'react-icons/vsc';
import { CallenderChartInfo } from '@api/dto';
import { KEEPER_COLOR } from '@constants/keeperTheme';
import TextButton from '@components/Button/TextButton';

const AttendanceTab = () => {
  const data: CallenderChartInfo[] = []; // TODO API 받아오기
  const year = { from: '2015-01-01', to: '2015-05-07' }; // TODO

  const [, setCurrentIndex] = useState(0);

  const handlePrevButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextButtonClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Stack width="100%" paddingX={6} paddingY={4}>
      <div className="h-36">
        <ResponsiveCalendar
          theme={{
            labels: { text: { fill: 'white' } },
          }}
          data={data}
          from={year.from}
          to={year.to}
          align="top"
          emptyColor={KEEPER_COLOR.subBlack}
          colors={[KEEPER_COLOR.pointBlue]}
          dayBorderColor={KEEPER_COLOR.middleBlack}
          monthBorderColor={KEEPER_COLOR.middleBlack}
          dayBorderWidth={4}
          margin={{ top: 20, right: 12, bottom: 5, left: 12 }}
        />
      </div>
      <div className="flex items-center justify-end">
        <IconButton onClick={handlePrevButtonClick} color="primary">
          <VscChevronLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} color="primary">
          <VscChevronRight />
        </IconButton>
      </div>
      <ButtonGroup>
        <TextButton small>🗓️ 총 출석일</TextButton>
        <TextButton small>🌱 개근 일차</TextButton>
        <TextButton small>🏅 오늘 출석</TextButton>
        <TextButton small>⭐️ pt</TextButton>
      </ButtonGroup>
      <div className="mx-2 mt-2 flex gap-4">
        <Card className="w-1/2">
          <CardHeader title={<Typography>오늘의 출석 포인트</Typography>} />
          <CardContent>test</CardContent>
        </Card>
        <div className="m-5 space-y-4">
          <div className="flex gap-1">
            <VscPinned size={24} className="fill-pointBlue" />
            <Typography>출석 포인트는 기본, 개근, 등수, 랜덤 포인트로 획득이 가능합니다.</Typography>
          </div>
          <div className="flex gap-1">
            <VscPinned size={24} className="fill-pointBlue" />
            <Typography>개근, 등수에 따른 획득 가능 포인트는 각 🌱, 🏅 영역을 클릭하면 확인할 수 있습니다.</Typography>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default AttendanceTab;
