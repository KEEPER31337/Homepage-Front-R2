import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { BorrowedBookInfo } from '@api/dto';
import TextButton from '@components/Button/TextButton';
import ServerImg from '@components/Image/ServerImg';

interface BookGuideProps {
  bookInfo?: BorrowedBookInfo; // ReactNode를 사용하여 텍스트 또는 JSX를 받을 수 있도록 함
}
const BookCard = ({ bookInfo }: BookGuideProps) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col items-center  space-y-2">
        <div
          className={`${
            !bookInfo?.status ? 'h-[240px] w-[170px]' : 'h-[120px] w-[85px]'
          } flex justify-center bg-subBlack p-4`} // TODO : status에 따라서 사이즈 변경
        >
          <ServerImg src="" alt="library thumbnail" />
        </div>
        <Tooltip
          title={bookInfo?.bookTitle}
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
          <div className="w-[170px] truncate text-center">{bookInfo?.bookTitle}</div>
        </Tooltip>

        <div className="w-full border border-pointBlue" />
        <div className="flex w-full  justify-between  ">
          {!bookInfo?.status && (
            <div className="flex w-full flex-col justify-start  ">
              <Typography variant="small">
                대출 일자
                {DateTime.fromFormat(bookInfo?.borrowDateTime || '', 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy.MM.dd')}
              </Typography>
              <Typography variant="small" className={`${bookInfo?.overdue && 'text-subRed'}`}>
                반납 일자
                {DateTime.fromFormat(bookInfo?.expireDateTime || '', 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy.MM.dd')}
              </Typography>
            </div>
          )}
          <div>
            <TextButton small>{bookInfo?.status ? '신청취소' : '반납신청'}</TextButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
