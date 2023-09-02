import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSection from '@components/Section/SearchSection';

const BoardSearchSection = () => {
  const postSearchList = [
    { id: 'title+content', content: '제목 + 내용' },
    { id: 'title', content: '제목' },
    { id: 'content', content: '내용' },
    { id: 'writer', content: '작성자' },
  ];

  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('title+content');
  const [, setSearchParams] = useSearchParams();

  const handleSearchButtonClick = () => {
    setSearchParams({ page: String(1), searchType, search: search.trim() });
  };

  return (
    <SearchSection
      options={postSearchList}
      selectorValue={searchType}
      setSelectorValue={setSearchType}
      inputValue={search}
      setInputValue={setSearch}
      onSearchButtonClick={handleSearchButtonClick}
    />
  );
};

export default BoardSearchSection;
