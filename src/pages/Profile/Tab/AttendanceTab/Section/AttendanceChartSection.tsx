import React, { useState } from 'react';
import { CircularProgress, IconButton, Stack } from '@mui/material';
import { ResponsiveCalendar } from '@nivo/calendar';
import { DateTime } from 'luxon';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useRecoilValue } from 'recoil';
import { useGetAttendanceInfoListQuery } from '@api/attendance';
import { KEEPER_COLOR } from '@constants/keeperTheme';
import memberState from '@recoil/member.recoil';

const AttendanceChartSection = () => {
  const [year, setYear] = useState(DateTime.now().year);

  const member = useRecoilValue(memberState);
  const { data, isLoading } = useGetAttendanceInfoListQuery({ memberId: member?.memberId, year });

  const handlePrevButtonClick = () => {
    setYear((prev) => prev - 1);
  };

  const handleNextButtonClick = () => {
    setYear((prev) => prev + 1);
  };

  return (
    <div>
      <div className="overflow-x-scroll">
        <div className="h-24 w-[580px] md:h-36 md:w-auto">
          {isLoading ? (
            <Stack height="100%" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            data && (
              <ResponsiveCalendar
                theme={{
                  labels: { text: { fill: 'white' } },
                }}
                data={data}
                from={DateTime.fromObject({ year }).startOf('year').toJSDate()}
                to={DateTime.fromObject({ year }).endOf('year').toJSDate()}
                align="top"
                emptyColor={KEEPER_COLOR.subBlack}
                colors={[KEEPER_COLOR.pointBlue]}
                dayBorderColor={KEEPER_COLOR.middleBlack}
                monthBorderColor={KEEPER_COLOR.middleBlack}
                dayBorderWidth={1}
                monthBorderWidth={0}
                margin={{ top: 20, right: 20, bottom: 5, left: 20 }}
              />
            )
          )}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <IconButton onClick={handlePrevButtonClick} color="primary">
          <VscChevronLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} color="primary" disabled={year === DateTime.now().year}>
          <VscChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default AttendanceChartSection;
