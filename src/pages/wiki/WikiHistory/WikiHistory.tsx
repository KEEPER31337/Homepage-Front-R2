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
  /* NOTE 문서 상세는 제목과 편집 버튼에만 씁니다. 현재 리비전이 숨겨지면 403이 오고, WikiHidden에서 이 페이지로 오는 경우이므로
    실패해도 기록 목록은 그대로 보여줍니다. */
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
