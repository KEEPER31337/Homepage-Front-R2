import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { BookInfo } from '@api/dto';

interface BookCardProps {
  bookInfo: BookInfo;
  onRequestBook: (bookId: BookInfo['bookId']) => void;
}
const BookCard = ({ bookInfo, onRequestBook }: BookCardProps) => {
  useEffect(() => {
    console.log(bookInfo);
  }, []);

  return (
    <div className="flex h-fit bg-mainBlack p-2">
      <div className="mr-2 flex h-[120px] w-[85px] bg-middleBlack">
        <Logo className="m-2 w-full" />
      </div>
      <div className="relative grow p-2">
        <div>
          <Typography className="!mb-2 font-semibold">{bookInfo.title}</Typography>
          <div className="flex space-x-2">
            <Typography>저자 : {bookInfo.author}</Typography>
            <span className="text-pointBlue"> | </span>
            <Typography>권수 : {bookInfo.bookQuantity}</Typography>
          </div>
        </div>

        <div className="absolute bottom-0 right-0">
          <OutlinedButton disabled={!bookInfo.canBorrow} onClick={() => onRequestBook(bookInfo.bookId)}>
            대출 신청
          </OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default BookCard;