import React, { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '@components/Section/SearchSection';

const wikiSearchList = [
  { id: 'title+content', content: '제목 + 내용' },
  { id: 'title', content: '제목' },
  { id: 'content', content: '내용' },
];

const WikiSearchSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('search') ?? '');
  const [searchType, setSearchType] = useState(() => {
    const initialSearchType = searchParams.get('searchType');
    return wikiSearchList.some(({ id }) => id === initialSearchType) ? (initialSearchType as string) : 'title+content';
  });

  const handleSearchButtonClick = () => {
    const trimmedSearch = search.trim();

    navigate({
      pathname: '/wiki/list',
      search: createSearchParams(
        trimmedSearch ? { page: String(1), searchType, search: trimmedSearch } : { page: String(1) },
      ).toString(),
    });
  };

  return (
    <SearchSection
      options={wikiSearchList}
      selectorValue={searchType}
      setSelectorValue={setSearchType}
      inputValue={search}
      setInputValue={setSearch}
      onSearchButtonClick={handleSearchButtonClick}
    />
  );
};

export default WikiSearchSection;
