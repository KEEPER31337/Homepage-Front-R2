import React from 'react';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

interface BookAvailabilityStatus {
  isAvailable: boolean;
  librarian: string;
}

const BookAvailabilityStatus = ({ isAvailable, librarian }: BookAvailabilityStatus) => {
  return isAvailable === true ? (
    <Typography className="text-pointBlue">신청 가능 권수 : 1/5</Typography>
  ) : (
    <Tooltip
      title={`사서(${librarian})에게 반납해주세요.`}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'rgba(76, 238, 249, 0.15)',
            fontSize: '14px',
          },
        },
      }}
      placement="top"
    >
      <Typography className="text-subRed">신청 가능 권 수(5권)을 초과했습니다.</Typography>
    </Tooltip>
  );
};

export default BookAvailabilityStatus;
