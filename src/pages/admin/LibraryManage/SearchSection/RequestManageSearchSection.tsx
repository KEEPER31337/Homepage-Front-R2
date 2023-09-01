import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSection from '@components/Section/SearchSection';

const RequestManageSearchSection = () => {
  const librarySearchList = [
    { id: 'requests_or_willreturn', content: '전체' },
    { id: 'requests', content: '대출 신청' },
    { id: 'willreturn', content: '반납 신청' },
  ];

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('requests_or_willreturn');
  const [, setSearchParams] = useSearchParams();

  const handleSearchButtonClick = () => {
    setSearchParams({ page: String(1), status, search: search.trim() });
  };

  return (
    <SearchSection
      options={librarySearchList}
      selectorValue={status}
      setSelectorValue={setStatus}
      inputValue={search}
      setInputValue={setSearch}
      onSearchButtonClick={handleSearchButtonClick}
    />
  );
};

export default RequestManageSearchSection;
