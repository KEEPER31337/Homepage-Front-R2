import React from 'react';
import { Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';

const BookCard = () => {
  return (
    <div className="flex h-fit bg-mainBlack p-2">
      <div className="mr-2 flex h-[120px] w-[85px] bg-middleBlack">
        <Logo className="m-2 w-full" />
      </div>
      <div className="relative grow p-2">
        <div>
          <Typography variant="paragraph" component="div" className="!mb-2 font-semibold">
            Beginning Linux programming 4th Edition
          </Typography>
          <Typography variant="paragraph">저자 : 페트릭 엔게브렛슨</Typography>
          <span className="text-pointBlue"> | </span>
          <Typography variant="paragraph">권수 : 2/3</Typography>
        </div>

        <div className="absolute bottom-0 right-0">
          <OutlinedButton>대출 신청</OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
