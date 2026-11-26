import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getWikiErrorStatus, useGetWikiDocQuery, useGetWikiRevisionQuery } from '@api/wikiApi';
import { WikiDocument, WikiRevision, WikiTag } from '@api/wikiDto';
import NotFound from '@pages/NotFound/NotFound';
import WikiHidden from '@pages/wiki/WikiHidden';
import OutlinedButton from '@components/Button/OutlinedButton';
import WikiAdjacentDocNavSection from './Section/WikiAdjacentDocNavSection';
import WikiBannerSection from './Section/WikiBannerSection';
import WikiContentSection from './Section/WikiContentSection';
import WikiRevisionNoticeSection from './Section/WikiRevisionNoticeSection';
import WikiTagSection from './Section/WikiTagSection';

/* NOTE 문서 상세(WikiDocument)와 리비전 상세(WikiRevision)의 응답 형태가 달라, 화면에서는 이 모델로 통일해서 사용합니다. */
export interface WikiViewModel {
  docId: number;
  revisionNo: number;
  title: string;
  content: string;
  editorId: number;
  editorName: string;
  editorThumbnailPath: string | null;
  editedAt: string;
}

const documentToViewModel = (doc: WikiDocument): WikiViewModel => ({
  docId: doc.docId,
  revisionNo: doc.revisionNo,
  title: doc.title,
  content: doc.content,
  editorId: doc.lastEditorId,
  editorName: doc.lastEditorName,
  editorThumbnailPath: doc.lastEditorThumbnailPath,
  editedAt: doc.updatedAt,
});

const revisionToViewModel = (revision: WikiRevision): WikiViewModel => ({
  docId: revision.docId,
  revisionNo: revision.revisionNo,
  title: revision.title,
  content: revision.content,
  editorId: revision.writerId,
  editorName: revision.writerName,
  editorThumbnailPath: revision.writerThumbnailPath,
  editedAt: revision.createdAt,
});

interface WikiViewPageProps {
  docId: number;
  view: WikiViewModel | undefined;
  /** 리비전 상세 응답에는 이전/다음 문서가 없어, 현재 문서를 볼 때만 넘깁니다. */
  adjacentDocs?: Pick<WikiDocument, 'previousDoc' | 'nextDoc'>;
  /** 태그는 리비전 이력에 남지 않아 과거 시점의 태그를 알 수 없으므로, 현재 문서를 볼 때만 넘깁니다. */
  tags?: WikiTag[];
  error: Error | null;
  isRevisionMode: boolean;
}

const WikiViewPage = ({ docId, view, adjacentDocs, tags, error, isRevisionMode }: WikiViewPageProps) => {
  const navigate = useNavigate();
  const errorStatus = getWikiErrorStatus(error);

  if (errorStatus === 404) {
    return <NotFound from="Wiki" />;
  }

  if (errorStatus === 403) {
    return <WikiHidden target={isRevisionMode ? '리비전' : '문서'} docId={docId} />;
  }

  if (!view) {
    if (!error) return null;

    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <Typography className="text-subGray">문서를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</Typography>
        <OutlinedButton onClick={() => navigate('/wiki/list')}>위키 목록</OutlinedButton>
      </div>
    );
  }

  return (
    <div className="-mt-16 space-y-8 sm:space-y-12">
      <div className="space-y-2">
        {/* NOTE 태그는 제목(배너)에 간격 없이 붙여 보여줍니다. 태그는 현재 문서에만 있어 리비전 안내와 함께 나오지 않습니다. */}
        <div>
          <WikiBannerSection view={view} isRevisionMode={isRevisionMode} />
          {tags && <WikiTagSection tags={tags} />}
        </div>
        {isRevisionMode && <WikiRevisionNoticeSection docId={view.docId} revisionNo={view.revisionNo} />}
        <WikiContentSection content={view.content} />
      </div>
      {adjacentDocs && (
        <WikiAdjacentDocNavSection previousDoc={adjacentDocs.previousDoc} nextDoc={adjacentDocs.nextDoc} />
      )}
    </div>
  );
};

interface WikiDocViewProps {
  docId: number;
}

const WikiDocView = ({ docId }: WikiDocViewProps) => {
  const { data: doc, error } = useGetWikiDocQuery({ docId });

  return (
    <WikiViewPage
      docId={docId}
      view={doc && documentToViewModel(doc)}
      adjacentDocs={doc && { previousDoc: doc.previousDoc, nextDoc: doc.nextDoc }}
      tags={doc?.tags}
      error={error}
      isRevisionMode={false}
    />
  );
};

interface WikiRevisionViewProps {
  docId: number;
  revisionNo: number;
}

const WikiRevisionView = ({ docId, revisionNo }: WikiRevisionViewProps) => {
  const { data: revision, error } = useGetWikiRevisionQuery({ docId, revisionNo });

  return <WikiViewPage docId={docId} view={revision && revisionToViewModel(revision)} error={error} isRevisionMode />;
};

/* NOTE /wiki/view/:docId 는 현재 문서, /wiki/view/:docId/revisions/:revisionNo 는 과거 리비전을 보여줍니다.
  두 경우 쓰는 쿼리 훅이 달라 컴포넌트를 분리했습니다. */
const WikiView = () => {
  const { docId, revisionNo } = useParams();

  if (revisionNo === undefined) return <WikiDocView docId={Number(docId)} />;

  return <WikiRevisionView docId={Number(docId)} revisionNo={Number(revisionNo)} />;
};

export default WikiView;
