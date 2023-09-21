import React from 'react';
import { Typography } from '@mui/material';
import { VscPinned } from 'react-icons/vsc';

const AttendanceGuideSection = () => {
  return (
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
  );
};

export default AttendanceGuideSection;
