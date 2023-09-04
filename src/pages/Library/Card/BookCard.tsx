import React from 'react';
import { Typography } from '@mui/material';
import { BookInfo } from '@api/dto';
import OutlinedButton from '@components/Button/OutlinedButton';
import ServerImg from '@components/Image/ServerImg';

interface BookCardProps {
  bookInfo: BookInfo;
  onRequestBook: (bookId: number) => void;
}
const BookCard = ({ bookInfo, onRequestBook }: BookCardProps) => {
  return (
    <div className="flex h-fit bg-mainBlack p-2">
      <div className="mr-2 flex h-[120px] w-[85px] bg-middleBlack">
        <ServerImg src={bookInfo?.thumbnailPath} alt="library thumbnail" />
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
            대출 {bookInfo.canBorrow ? '신청' : ' 불가'}
          </OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
