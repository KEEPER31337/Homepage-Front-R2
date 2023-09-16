import React from 'react';
import { Stack } from '@mui/material';
import AttendanceChartSection from './Section/AttendanceChartSection';
import AttendanceGuideSection from './Section/AttendanceGuideSection';
import AttendanceInfoSection from './Section/AttendanceInfoSection';

const AttendanceTab = () => {
  return (
    <Stack className="w-full md:px-10 md:py-6 lg:px-12 lg:py-8">
      <AttendanceChartSection />
      <div className="mx-2 mt-2 flex flex-col gap-4 xl:flex-row">
        <AttendanceInfoSection />
        <AttendanceGuideSection />
      </div>
    </Stack>
  );
};

export default AttendanceTab;
