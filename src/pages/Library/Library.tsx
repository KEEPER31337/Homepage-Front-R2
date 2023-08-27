import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import PageTitle from '@components/Typography/PageTitle';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { useGetBookListQuery, useRequestBorrowBookMutation, useGetBookBorrowsQuery } from '@api/libraryApi';
import usePagination from '@hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import { BookListSearch } from '@api/dto';
import LibrarySearchSection from './SearchSection/LibrarySearchSection';
import BookCard from './Card/BookCard';
import BorrowStatus from './Status/BorrowStatus';
import RequestBookModal from './Modal/RequestBookModal';

const MAX_BORROWABLE_BOOKS = 5;

const Library = () => {
  const [requestBookModalOpen, setRequestBookModalOpen] = useState(false);
  const { mutate: RequestBorrowBook } = useRequestBorrowBookMutation();

  const handleRequestBook = (bookId: number) => {
    RequestBorrowBook(bookId);
    //  TODO 무조건 완료 모달뜨지 않게 예외처리
    setRequestBookModalOpen(true);
  };

  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType') as BookListSearch['searchType'];
  const search = searchParams.get('search') as BookListSearch['search'];

  const librarian = '박소현';

  const size = 6;
  const { page } = usePagination();

  const { data: bookListData } = useGetBookListQuery({ page, size, searchType, search });
  const { data: borrowedBookListData } = useGetBookBorrowsQuery({ page: 0, size: MAX_BORROWABLE_BOOKS });

  return (
    <div>
      <PageTitle>도서검색</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <LibrarySearchSection />
        <BorrowStatus
          librarian={librarian}
          borrowedBookCount={borrowedBookListData?.totalElement || 0}
          maxBorrowableBooks={MAX_BORROWABLE_BOOKS}
        />
      </div>
      <div className="h-[402px] bg-middleBlack">
        {bookListData?.content?.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Typography>데이터가 없습니다.</Typography>
          </div>
        ) : (
          <div className="grid grid-cols-2 content-start">
            {bookListData?.content?.map((bookInfo) => (
              <BookCard key={bookInfo.bookId} bookInfo={bookInfo} onRequestBook={handleRequestBook} />
            ))}
          </div>
        )}

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
