import React, { useState } from 'react';
import PageTitle from '@components/Typography/PageTitle';
import SearchSection from '@components/Section/SearchSection';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { useGetBookListQuery, useRequestBorrowBookMutation } from '@api/libraryApi';
import usePagination from '@hooks/usePagination';
import BookCard from './Card/BookCard';
import BorrowStatus from './Status/BorrowStatus';
import RequestBookModal from './Modal/RequestBookModal';

const Library = () => {
  const [requestBookModalOpen, setRequestBookModalOpen] = useState(false);
  const { mutate: RequestBorrowBook } = useRequestBorrowBookMutation();

  const handleRequestBook = (bookId: number) => {
    RequestBorrowBook(bookId);
    //  TODO 무조건 완료 모달뜨지 않게 예외처리
    setRequestBookModalOpen(true);
  };

  const librarian = '박소현';

  const size = 6;
  const { page } = usePagination();

  const { data: bookListData } = useGetBookListQuery({ page, size });
  return (
    <div>
      <PageTitle>도서검색</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <SearchSection />
        <BorrowStatus librarian={librarian} canBorrow={false} />
      </div>
      <div className="grid grid-cols-2">
        {bookListData?.content?.map((bookInfo) => (
          <BookCard key={bookInfo.bookId} bookInfo={bookInfo} onRequestBook={handleRequestBook} />
        ))}
        <RequestBookModal
          librarian={librarian}
          open={requestBookModalOpen}
          onClose={() => setRequestBookModalOpen(false)}
        />
      </div>
      <StandardTablePagination rowsPerPage={size} totalItems={bookListData?.totalElement} />
    </div>
  );
};

export default Library;
