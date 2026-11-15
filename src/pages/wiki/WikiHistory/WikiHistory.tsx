import React from 'react';
import { useParams } from 'react-router-dom';
import { getWikiErrorStatus, useGetWikiDocQuery, useGetWikiRevisionListQuery } from '@api/wikiApi';
import usePagination from '@hooks/usePagination';
import NotFound from '@pages/NotFound/NotFound';
import { parseWikiIdParam } from '@pages/wiki/wikiParam';
import WikiHistoryBannerSection from './Section/WikiHistoryBannerSection';
import WikiRevisionListSection from './Section/WikiRevisionListSection';

const REVISION_PAGE_SIZE = 20;

interface WikiRevisionHistoryProps {
  docId: number;
}

const WikiRevisionHistory = ({ docId }: WikiRevisionHistoryProps) => {
  const { page } = usePagination();

  /* NOTE 주소의 page 값이 숫자가 아니거나 범위를 벗어나면 400이 되므로 첫 페이지로 조회합니다. */
  const requestPage = Number.isInteger(page) && page >= 0 ? page : 0;
  const {
    data: revisions,
    error,
    isError,
  } = useGetWikiRevisionListQuery({ docId, page: requestPage, size: REVISION_PAGE_SIZE });
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

/* NOTE 잘못된 docId로 요청이 나가지 않도록 쿼리 훅을 쓰는 컴포넌트를 분리했습니다. */
const WikiHistory = () => {
  const { docId: docIdParam } = useParams();
  const docId = parseWikiIdParam(docIdParam);

  if (docId === null) {
    return <NotFound from="Wiki" />;
  }

  return <WikiRevisionHistory docId={docId} />;
};

export default WikiHistory;
