import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { ResponsiveCalendar } from '@nivo/calendar';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { CallenderChartInfo } from '@api/dto';
import { KEEPER_COLOR } from '@constants/keeperTheme';

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
    <Stack width="100%">
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
          margin={{ top: 20, right: 70, bottom: 5, left: 70 }}
        />
      </div>
      <div className="mr-16 flex items-center justify-end">
        <IconButton onClick={handlePrevButtonClick} color="primary">
          <VscChevronLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} color="primary">
          <VscChevronRight />
        </IconButton>
      </div>
    </Stack>
  );
};

export default AttendanceTab;
