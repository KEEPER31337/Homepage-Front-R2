import React from 'react';
import { useParams } from 'react-router-dom';
import { getWikiErrorStatus, useGetWikiDocQuery, useGetWikiRevisionListQuery } from '@api/wikiApi';
import usePagination from '@hooks/usePagination';
import NotFound from '@pages/NotFound/NotFound';
import WikiHistoryBannerSection from './Section/WikiHistoryBannerSection';
import WikiRevisionListSection from './Section/WikiRevisionListSection';

const REVISION_PAGE_SIZE = 20;

const WikiHistory = () => {
  const docId = Number(useParams().docId);
  const { page } = usePagination();
  const { data: revisions, error, isError } = useGetWikiRevisionListQuery({ docId, page, size: REVISION_PAGE_SIZE });

  const { data: doc, error: docError } = useGetWikiDocQuery({ docId });

  if (getWikiErrorStatus(error) === 404) {
    return <NotFound from="Wiki" />;
  }

  const title = getWikiErrorStatus(docError) === 403 ? '숨겨진 문서' : doc?.title;

  return (
    <div className="-mt-16 space-y-2">
      <WikiHistoryBannerSection
        docId={docId}
        title={title}
        totalRevisions={revisions?.totalElements}
        canEdit={doc !== undefined}
      />
      <WikiRevisionListSection docId={docId} revisions={revisions} isError={isError} />
    </div>
  );
};

export default WikiHistory;
