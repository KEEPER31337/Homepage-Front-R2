import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getWikiErrorStatus, useGetWikiTagDocListQuery } from '@api/wikiApi';
import usePagination from '@hooks/usePagination';
import Chip from '@components/Chip/Chip';
import WikiDocTable from '@pages/wiki/WikiDocTable';

interface WikiTagDocListProps {
  tagId: number;
}

const WikiTagDocList = ({ tagId }: WikiTagDocListProps) => {
  const { page } = usePagination();
  const { data: tag, error } = useGetWikiTagDocListQuery({ tagId, page });

  if (!tag) {
    if (!error) return null;

    return (
      <Typography align="center" marginY={8}>
        {getWikiErrorStatus(error) === 404 ? '존재하지 않는 태그입니다.' : '문서 목록을 불러오지 못했습니다.'}
      </Typography>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="shrink-0">태그 :</span>
          <Chip label={tag.name} className="!max-w-full" />
        </h2>
        <Typography className="shrink-0 text-subGray">문서 {tag.documents.totalElements}개</Typography>
      </div>
      <WikiDocTable docs={tag.documents} />
    </div>
  );
};

const WikiTag = () => {
  const { tagId } = useParams();

  return <WikiTagDocList key={tagId} tagId={Number(tagId)} />;
};

export default WikiTag;
