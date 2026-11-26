import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useGetWikiDocListQuery } from '@api/wikiApi';
import { WikiSearchType } from '@api/wikiDto';
import usePagination from '@hooks/usePagination';
import WikiDocTable from '@pages/wiki/WikiDocTable';

const WIKI_SEARCH_TYPES: WikiSearchType[] = ['title+content', 'title', 'content'];

const toWikiSearchType = (searchType: string | null) =>
  WIKI_SEARCH_TYPES.find((wikiSearchType) => wikiSearchType === searchType);

const WikiList = () => {
  const [searchParams] = useSearchParams();
  const searchType = toWikiSearchType(searchParams.get('searchType'));
  const search = searchParams.get('search') ?? undefined;

  const { page } = usePagination();
  const { data: docs, isError } = useGetWikiDocListQuery({
    searchType,
    search,
    page,
  });

  if (!docs) {
    return isError ? (
      <Typography align="center" marginY={8}>
        문서 목록을 불러오지 못했습니다.
      </Typography>
    ) : null;
  }

  return <WikiDocTable docs={docs} />;
};

export default WikiList;
