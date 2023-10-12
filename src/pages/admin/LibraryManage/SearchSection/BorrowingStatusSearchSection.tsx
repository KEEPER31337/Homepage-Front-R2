import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSection from '@components/Section/SearchSection';

const BorrowingStatusSearchSection = () => {
  const librarySearchList = [
    { id: '전체', content: '전체' },
    { id: '반납대기', content: '반납대기' },
    { id: '반납완료', content: '반납완료' },
    { id: '대출중', content: '대출중' },
    { id: '대출반려', content: '대출반려' },
  ];

  const [search, setSearch] = useState('');
  const [searchType, setStatus] = useState('전체');
  const [, setSearchParams] = useSearchParams();

  const searchBorrowingStatusList = () => {
    setSearchParams({ page: String(1), searchType, search: search.trim() });
  };

  const handleSearchButtonClick = () => {
    searchBorrowingStatusList();
  };

  useEffect(() => {
    searchBorrowingStatusList();
  }, [searchType]);

  return (
    <SearchSection
      options={librarySearchList}
      selectorValue={searchType}
      setSelectorValue={setStatus}
      inputValue={search}
      setInputValue={setSearch}
      onSearchButtonClick={handleSearchButtonClick}
    />
  );
};

export default BorrowingStatusSearchSection;
