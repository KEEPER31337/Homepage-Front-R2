import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { VscEyeClosed } from 'react-icons/vsc';
import { WikiPage, WikiRevisionSummary } from '@api/wikiDto';
import ProfileLink from '@components/Link/ProfileLink';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';

interface WikiRevisionItemProps {
  docId: number;
  revision: WikiRevisionSummary;
  isLatest: boolean;
}

const WikiRevisionItem = ({ docId, revision, isLatest }: WikiRevisionItemProps) => {
  const { revisionNo, editSummary, writerId, writerName, createdAt, hidden } = revision;
  const isFirstRevision = revisionNo === 1;
  const dateTime = DateTime.fromSQL(createdAt).setLocale('ko').toFormat('yyyy년 M월 d일 (ccc) HH:mm');

  const renderSummary = () => {
    if (hidden) {
      return (
        <i className="inline-flex items-center whitespace-nowrap text-gray-400">
          (<VscEyeClosed className="mx-0.5 shrink-0" />
          숨겨진 리비전)
        </i>
      );
    }

    if (!isFirstRevision && !editSummary) return null;

    return (
      <i className="text-gray-300">
        ({isFirstRevision && <b className="not-italic">새 문서</b>}
        {isFirstRevision && editSummary && ': '}
        {editSummary})
      </i>
    );
  };

  const summary = renderSummary();

  return (
    <li className="ml-6 py-1">
      <span className="mr-2 inline-block min-w-[4ch] font-mono text-gray-400">r{revisionNo}</span>
      {hidden ? (
        <time dateTime={createdAt} className="whitespace-nowrap text-gray-500 line-through">
          {dateTime}
        </time>
      ) : (
        <Link
          to={`/wiki/view/${docId}/revisions/${revisionNo}`}
          className="whitespace-nowrap text-pointBlue hover:underline"
        >
          <time dateTime={createdAt}>{dateTime}</time>
        </Link>
      )}
      {isLatest && <b className="ml-1 whitespace-nowrap text-white">(최신)</b>}
      <ProfileLink memberId={writerId} className="ml-2 whitespace-nowrap text-white">
        {writerName}
      </ProfileLink>
      {summary && (
        <>
          <span className="mx-2 text-gray-500">. .</span>
          {summary}
        </>
      )}
    </li>
  );
};

interface WikiRevisionListSectionProps {
  docId: number;
  revisions?: WikiPage<WikiRevisionSummary>;
  isError: boolean;
}

const WikiRevisionListSection = ({ docId, revisions, isError }: WikiRevisionListSectionProps) => {
  const renderContent = () => {
    if (!revisions) {
      return isError ? (
        <Typography className="py-16 text-center text-subGray">
          문서 기록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </Typography>
      ) : null;
    }

    return (
      <>
        <p className="mb-4 text-gray-400">날짜를 누르면 해당 시점의 문서를 볼 수 있습니다.</p>
        {revisions.content.length === 0 ? (
          <Typography className="py-16 text-center text-gray-400">이 페이지에 표시할 기록이 없습니다.</Typography>
        ) : (
          <ul className="list-disc text-gray-200 marker:text-gray-500">
            {revisions.content.map((revision, index) => (
              <WikiRevisionItem
                key={revision.revisionNo}
                docId={docId}
                revision={revision}
                isLatest={revisions.first && index === 0}
              />
            ))}
          </ul>
        )}
        {/* NOTE 범위를 벗어난 페이지에서도 돌아갈 수 있도록 전체 개수 기준으로 페이지네이션을 보여줍니다. */}
        {revisions.totalElements > 0 && (
          <div className="mt-8">
            <StandardTablePagination rowsPerPage={revisions.size} totalItems={revisions.totalElements} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-[500px] break-words break-keep bg-middleBlack px-6 pb-8 pt-6 text-paragraph leading-relaxed sm:px-14 sm:py-10">
      {renderContent()}
    </div>
  );
};

export default WikiRevisionListSection;
