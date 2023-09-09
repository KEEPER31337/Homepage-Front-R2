import React from 'react';
import Typography from '@mui/material/Typography';
import { VscStarFull } from 'react-icons/vsc';

import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import {
  useGetBookBorrowsQuery,
  useRequestReturnBookMutation,
  useCancleReturnBookMutation,
  useCancleBorrowBookMutation,
} from '@api/libraryApi';
import BookCard from './BookTab/BookCard';
import BookGuide from './BookTab/BookGuide';

const MAX_BORROWABLE_BOOKS = 5;

const BookTab = () => {
  const { data: borrowedBookListData } = useGetBookBorrowsQuery({ page: 0, size: MAX_BORROWABLE_BOOKS });
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { mutate: requestReturnBookMutation } = useRequestReturnBookMutation();

  const { mutate: cancleReturnBookMutation } = useCancleReturnBookMutation();
  const { mutate: cancleBorrowBookMutation } = useCancleBorrowBookMutation();

  console.log(borrowedBookListData);

  const librarian = executiveInfos?.find((role) => role.jobName === 'ROLE_사서')?.realName || '';

  const renderBookCard = (status: string, mutationCallback: (id: number) => void) => {
    const booksToRender = borrowedBookListData?.content?.filter((bookInfo) => bookInfo.status === status);

    if (!booksToRender?.length) return null;

    return (
      <div className="flex flex-col">
        <div className="flex">
          <VscStarFull className="fill-pointBlue" size={20} />
          <Typography className="text-pointBlue">{status}</Typography>
        </div>

        <div className="flex flex-row flex-wrap   ">
          {booksToRender?.map((bookInfo) => (
            <BookCard
              key={bookInfo.borrowInfoId}
              bookInfo={bookInfo}
              onClick={() => mutationCallback(bookInfo.borrowInfoId)}
            />
          ))}
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
      <div className="flex">
        {renderBookCard('대출중', requestReturnBookMutation)}
        {renderBookCard('반납대기', cancleReturnBookMutation)}
        {renderBookCard('대출대기', cancleBorrowBookMutation)}
      </div>
    </div>
  );
};

export default BookTab;
