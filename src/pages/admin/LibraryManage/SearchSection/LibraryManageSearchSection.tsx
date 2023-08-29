import SearchSection from '@components/Section/SearchSection';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const LibraryManageSearchSection = () => {
  const libraryManageSearchList = [
    { id: 'all', content: '도서명 + 저자' },
    { id: 'title', content: '도서명' },
    { id: 'author', content: '저자' },
  ];

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [, setSearchParams] = useSearchParams();

  const handleSearchButtonClick = () => {
    setSearchParams({ page: String(1), searchType: '', search: search.trim() });
  };

  return (
    <SearchSection
      options={libraryManageSearchList}
      selectorValue={searchType}
      setSelectorValue={setSearchType}
      inputValue={search}
      setInputValue={setSearch}
      onSearchButtonClick={handleSearchButtonClick}
    />
  );
};

export default LibraryManageSearchSection;
