import React from 'react';
import { Stack } from '@mui/material';
import { useAtomValue } from 'jotai';
import memberState from '@recoil/member.recoil';
import AttendanceChartSection from './Section/AttendanceChartSection';
import AttendanceGuideSection from './Section/AttendanceGuideSection';
import AttendanceInfoSection from './Section/AttendanceInfoSection';

const AttendanceTab = () => {
  const member = useAtomValue(memberState);

  if (!member) return null;
  return (
    <Stack className="w-full md:px-10 md:py-6 lg:px-12 lg:py-8">
      <AttendanceChartSection memberId={member.memberId} />
      <div className="mx-2 mt-2 flex flex-col gap-4 xl:flex-row">
        <AttendanceInfoSection memberId={member.memberId} />
        <AttendanceGuideSection />
      </div>
    </Stack>
  );
};

export default AttendanceTab;
