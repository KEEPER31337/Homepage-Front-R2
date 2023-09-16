import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import { BorrowedBookInfo } from '@api/dto';
import OutlinedButton from '@components/Button/OutlinedButton';
import ServerImg from '@components/Image/ServerImg';

interface BookGuideProps {
  bookInfo?: BorrowedBookInfo;
  onClick?: () => void;
}
const BookCard = ({ bookInfo, onClick }: BookGuideProps) => {
  return (
    <div className="m-1 flex w-[120px] flex-col space-y-2 lg:w-[150px] xl:w-[180px]">
      <div className="relative flex h-[180px] bg-subBlack lg:h-[210px] xl:h-[240px]">
        <ServerImg src={bookInfo?.thumbnailPath || ''} alt="library thumbnail" />
        <div className={`${bookInfo && 'p-1'} absolute bottom-0 flex w-full flex-col space-y-1 bg-middleBlack/50`}>
          <Tooltip
            title={bookInfo?.bookTitle}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(76, 238, 249, 0.50)',
                  fontSize: '14px',
                },
              },
            }}
            placement="top"
          >
            <Typography className="truncate text-center">{bookInfo?.bookTitle}</Typography>
          </Tooltip>
          {bookInfo?.status === '대출중' && (
            <div className="flex flex-col items-center">
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
        </div>
      </div>
      {bookInfo && (
        <OutlinedButton className="w-full" onClick={onClick} small>
          {bookInfo?.status === '대출중' ? '반납신청' : '신청취소'}
        </OutlinedButton>
      )}
    </div>
  );
};

export default BookCard;
