import React from 'react';
import PageTitle from '@components/Typography/PageTitle';
import SearchSection from '@components/Section/SearchSection';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import BookCard from './Card/BookCard';
import BorrowStatus from './Status/BorrowStatus';

const Library = () => {
  return (
    <div>
      <PageTitle>도서검색</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <SearchSection />
        <BorrowStatus canBorrow={false} />
      </div>
      <div className="grid grid-cols-2">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
      <StandardTablePagination />
    </div>
  );
};

export default Library;
