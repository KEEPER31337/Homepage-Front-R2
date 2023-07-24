import React, { useEffect, useState } from 'react';
import PageTitle from '@components/Typography/PageTitle';
import SearchSection from '@components/Section/SearchSection';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import useGetBookListQuery from '@api/libraryApi';
import { BookInfo } from '@api/dto';
import BookCard from './Card/BookCard';
import BorrowStatus from './Status/BorrowStatus';
import RequestBookModal from './Modal/RequestBookModal';

const Library = () => {
  const [librarian, setLibrarian] = useState<string>('');

  const [selectedBookId, setSelectedBookId] = useState<number>(0);
  const [requestBookModalOpen, setRequestBookModalOpen] = useState(false);

  const handleRequestBook = (bookId: BookInfo['bookId']) => {
    setSelectedBookId(bookId);
    setRequestBookModalOpen(true);
  };

  const { data: bookList } = useGetBookListQuery({ page: 0, size: 6 });

  useEffect(() => {
    setLibrarian('박소현');
  }, []);

  return (
    <div>
      <PageTitle>도서검색</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <SearchSection />
        <BorrowStatus canBorrow={false} />
      </div>
      <div className="grid grid-cols-2">
        {bookList?.map((bookInfo) => (
          <BookCard key={bookInfo.bookId} bookInfo={bookInfo} onRequestBook={handleRequestBook} />
        ))}
        <RequestBookModal
          librarian={librarian}
          selectedBookId={selectedBookId}
          open={requestBookModalOpen}
          onClose={() => setRequestBookModalOpen(false)}
        />
      </div>
      <StandardTablePagination />
    </div>
  );
};

export default Library;
