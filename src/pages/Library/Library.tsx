import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { BookListSearch } from '@api/dto';
import { useGetExecutiveInfoQuery } from '@api/dutyManageApi';
import { useGetBookListQuery, useRequestBorrowBookMutation, useGetBookBorrowsQuery } from '@api/libraryApi';
import usePagination from '@hooks/usePagination';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import PageTitle from '@components/Typography/PageTitle';
import BookCard from './Card/BookCard';
import RequestBookModal from './Modal/RequestBookModal';
import LibrarySearchSection from './SearchSection/LibrarySearchSection';
import BorrowStatus from './Status/BorrowStatus';

const MAX_BORROWABLE_BOOKS = 5;

const Library = () => {
  const [requestBookModalOpen, setRequestBookModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const { page } = usePagination();
  const searchType = searchParams.get('searchType') as BookListSearch['searchType'];
  const search = searchParams.get('search') as BookListSearch['search'];

  const { data: bookListData } = useGetBookListQuery({ page, searchType, search });
  const { data: borrowedBookListData } = useGetBookBorrowsQuery({ page: 0, size: MAX_BORROWABLE_BOOKS });
  const { data: executiveInfos } = useGetExecutiveInfoQuery();
  const { mutate: RequestBorrowBook } = useRequestBorrowBookMutation();

  const librarian = executiveInfos?.find((role) => role.jobName === 'ROLE_사서')?.realName || '';

  const handleRequestBook = (bookId: number) => {
    RequestBorrowBook(bookId, {
      onSuccess: () => {
        setRequestBookModalOpen(true);
      },
    });
  };

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
      <StandardTablePagination rowsPerPage={bookListData?.size} totalItems={bookListData?.totalElement} />
    </div>
  );
};

export default Library;
