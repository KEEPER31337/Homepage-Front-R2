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
    <Stack className="w-full md:px-10 md:py-6 lg:px-12 lg:py-8">
      <div className="overflow-x-scroll">
        <div className="h-24 w-[580px] md:h-36 md:w-auto">
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
            dayBorderWidth={1}
            monthBorderWidth={0}
            margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
          />
        </div>
      </div>
      <div className="flex items-center justify-end">
        <IconButton onClick={handlePrevButtonClick} color="primary">
          <VscChevronLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} color="primary">
          <VscChevronRight />
        </IconButton>
      </div>
      <div className="mx-2 mt-2 flex flex-col gap-4 xl:flex-row">
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
        <div className="m-2 space-y-4 md:m-5">
          <div className="flex flex-col gap-1 sm:flex-row">
            <VscPinned size={24} className="min-w-fit fill-pointBlue" />
            <Typography className="w-auto">출석 포인트는 기본, 개근, 등수, 랜덤 포인트로 획득이 가능합니다.</Typography>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row">
            <VscPinned size={24} className="min-w-fit fill-pointBlue" />
            <Typography className="whitespace-break-spaces">
              개근, 등수에 따른 획득 가능 포인트는 각 🌱, 🏅 영역을 클릭하면 확인할 수 있습니다.
            </Typography>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default AttendanceTab;
