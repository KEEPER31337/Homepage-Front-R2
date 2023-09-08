import React from 'react';
import Typography from '@mui/material/Typography';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import { useGetBookBorrowsQuery } from '@api/libraryApi';
import BookCard from './BookTab/BookCard';
import BookGuide from './BookTab/BookGuide';

const MAX_BORROWABLE_BOOKS = 5;

const BookTab = () => {
  const { data: borrowedBookListData } = useGetBookBorrowsQuery({ page: 0, size: MAX_BORROWABLE_BOOKS });
  const { data: executiveInfos } = useGetExecutiveInfoQuery();

  const librarian = executiveInfos?.find((role) => role.jobName === 'ROLE_사서')?.realName || '';

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mb-4 flex  space-x-2">
        <BookGuide>
          총 대출가능 도서수는 <span className="text-pointBlue">5</span>권입니다.
        </BookGuide>
        <BookGuide>
          대출기간은 승인된 대출일자로 부터 <span className="text-pointBlue">14</span>일간 입니다.
        </BookGuide>
        <BookGuide>
          도서 관련 문의는 사서<span className="text-pointBlue">({librarian})</span>에게 문의 가능합니다.
        </BookGuide>
      </div>
      <div className="flex h-full flex-col space-y-5">
        <div className="flex flex-col items-center space-y-2">
          <Typography className="text-pointBlue">대출중</Typography>
          <div className="flex flex-row space-x-2">
            {borrowedBookListData?.content?.map((bookInfo) => (
              <BookCard key={bookInfo.borrowInfoId} bookInfo={bookInfo} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Typography>대출대기중</Typography>
          <div className="flex flex-row space-x-2">
            {borrowedBookListData?.content?.map((bookInfo) => (
              <BookCard key={bookInfo.borrowInfoId} bookInfo={bookInfo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTab;
