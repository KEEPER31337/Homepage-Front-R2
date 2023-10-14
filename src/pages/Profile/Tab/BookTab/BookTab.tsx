import React from 'react';
import Typography from '@mui/material/Typography';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import {
  useGetBookBorrowsQuery,
  useRequestReturnBookMutation,
  useCancleReturnBookMutation,
  useCancleBorrowBookMutation,
} from '@api/libraryApi';
import BookCard from './Card/BookCard';
import BookGuide from './Guide/BookGuide';

const MAX_BORROWABLE_BOOKS = 5;

const BookTab = () => {
  const { data: borrowedBookListData } = useGetBookBorrowsQuery({ page: 0, size: MAX_BORROWABLE_BOOKS });
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { mutate: requestReturnBookMutation } = useRequestReturnBookMutation();

  const { mutate: cancleReturnBookMutation } = useCancleReturnBookMutation();
  const { mutate: cancleBorrowBookMutation } = useCancleBorrowBookMutation();

  const librarian = executiveInfos?.find((role) => role.jobName === 'ROLE_사서')?.realName || '';

  const borrowLength = borrowedBookListData?.content?.filter((bookInfo) => bookInfo.status === '대출대기').length;
  const returnLength = borrowedBookListData?.content?.filter((bookInfo) => bookInfo.status === '반납대기').length;

  const renderBookCard = (status: string, mutationCallback: (id: number) => void) => {
    const booksToRender = borrowedBookListData?.content?.filter((bookInfo) => bookInfo.status === status) || [];

    if (!booksToRender.length && status !== '대출중') return null;

    return (
      <div className="flex flex-col">
        <Typography className="pl-1 text-pointBlue">{status}</Typography>
        <div className="flex flex-wrap">
          {Array.from(status === '대출중' ? { length: 5 } : { length: booksToRender.length }, (v, i) => i).map(
            (index) => (
              <BookCard
                key={index}
                index={index + 1}
                bookInfo={booksToRender[index]}
                onClick={() => mutationCallback(booksToRender[index]?.borrowInfoId)}
              />
            ),
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="flex flex-col xl:flex-row xl:space-x-2">
        <BookGuide>
          총 대출가능 도서수는 <span className="text-pointBlue">5</span>권입니다.
        </BookGuide>
        <BookGuide>
          대출기간은 승인된 대출일자로 부터 <span className="text-pointBlue">14</span>일간 입니다.
        </BookGuide>
        <BookGuide>
          도서 관련 문의는 사서(<span className="text-pointBlue">{librarian}</span>)에게 문의 가능합니다.
        </BookGuide>
      </div>
      <div className="flex flex-col space-y-4 overflow-y-auto">
        {renderBookCard('대출중', requestReturnBookMutation)}
        <div className="flex flex-row flex-wrap">
          {renderBookCard('대출대기', cancleBorrowBookMutation)}
          {renderBookCard('반납대기', cancleReturnBookMutation)}
        </div>
        <div className="flex w-full flex-col items-center space-y-1">
          {borrowLength === 0 && <Typography>대출대기가 없습니다</Typography>}
          {returnLength === 0 && <Typography>반납대기가 없습니다</Typography>}
        </div>
      </div>
    </div>
  );
};

export default BookTab;
