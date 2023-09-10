import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { CallenderChartInfo } from '@api/dto';
import { KEEPER_COLOR } from '@constants/keeperTheme';

const AttendanceTab = () => {
  const data: CallenderChartInfo[] = []; // TODO API 받아오기
  const year = { from: '2015-01-01', to: '2015-05-07' }; // TODO

  return (
    <div className="w-full">
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
  );
};

export default AttendanceTab;
