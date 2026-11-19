import React, { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import SearchSection from '@components/Section/SearchSection';

/* NOTE 위키 목록 API는 작성자 검색을 지원하지 않습니다. */
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

    /* NOTE 대문에서 검색해도 결과가 보이도록 항상 목록(/wiki/list)으로 이동합니다.
      검색어가 없으면 검색 조건을 지우고 전체 목록으로 돌아갑니다. */
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
