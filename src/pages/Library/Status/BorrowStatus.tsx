import React from 'react';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

interface BorrowStatusProps {
  librarian: string;
  borrowedBookCount: number;
  maxBorrowableBooks: number;
}

const BorrowStatus = ({ librarian, borrowedBookCount, maxBorrowableBooks }: BorrowStatusProps) => {
  return borrowedBookCount !== maxBorrowableBooks ? (
    <Typography className="!flex !items-end text-pointBlue">
      신청 가능 권수 : {maxBorrowableBooks - borrowedBookCount}/{maxBorrowableBooks}
    </Typography>
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
      placement="bottom"
    >
      <Typography className="!flex !items-end !text-small text-subRed md:!text-paragraph">
        신청 가능 권 수({maxBorrowableBooks}권)을 초과했습니다.
      </Typography>
    </Tooltip>
  );
};

export default BorrowStatus;
