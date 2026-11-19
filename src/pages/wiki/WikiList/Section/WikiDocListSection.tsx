import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetWikiDocListQuery } from '@api/wikiApi';
import { WikiDocumentSummary, WikiSearchType } from '@api/wikiDto';
import usePagination from '@hooks/usePagination';
import ProfileLink from '@components/Link/ProfileLink';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column, Row } from '@components/Table/StandardTable.interface';

const wikiDocColumn: Column<WikiDocumentSummary>[] = [
  { key: 'updatedAt', headerName: '수정일', width: '15%' },
  { key: 'title', headerName: '제목', width: '60%' },
  { key: 'lastEditorName', headerName: '최근 편집자', width: '15%' },
  { key: 'revisionNo', headerName: '리비전', width: '10%' },
];

/* NOTE 모바일에서는 제목 칸 아래 줄에 편집자와 수정일을 함께 보여주므로 제목 칸만 둡니다. */
const mobileWikiDocColumn = wikiDocColumn.filter(({ key }) => key === 'title');

const WIKI_SEARCH_TYPES: WikiSearchType[] = ['title+content', 'title', 'content'];

const toWikiSearchType = (searchType: string | null) =>
  WIKI_SEARCH_TYPES.find((wikiSearchType) => wikiSearchType === searchType);

const WikiDocListSection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchType = toWikiSearchType(searchParams.get('searchType'));
  const search = searchParams.get('search') ?? undefined;

  const { page } = usePagination();
  const { data: docs, isError } = useGetWikiDocListQuery({
    searchType,
    search,
    page,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!docs) {
    return isError ? (
      <Typography align="center" marginY={8}>
        문서 목록을 불러오지 못했습니다.
      </Typography>
    ) : null;
  }

  const handleDocRowClick = ({ rowData }: { rowData: Row<WikiDocumentSummary> }) => {
    navigate(`/wiki/view/${rowData.docId}`);
  };

  const childComponent = ({ key, value, rowData }: ChildComponent<WikiDocumentSummary>) => {
    const updatedAt = DateTime.fromSQL(rowData.updatedAt);

    switch (key) {
      case 'title': {
        const isRecentlyUpdated = updatedAt >= DateTime.now().plus({ days: -1 }).startOf('day');

        return (
          <>
            <div className="flex items-center">
              <span>{value}</span>
              {isRecentlyUpdated && (
                <span className="ml-1 rounded-sm bg-pointBlue px-1 text-center text-small text-mainBlack">N</span>
              )}
            </div>
            {isMobile && (
              <div className="flex items-end">
                <Typography variant="small">
                  <ProfileLink memberId={rowData.lastEditorId}>{rowData.lastEditorName}</ProfileLink> |{' '}
                  <span title={updatedAt.toFormat('yyyy-MM-dd HH:mm')}>{updatedAt.toRelative()}</span> · r
                  {rowData.revisionNo}
                </Typography>
              </div>
            )}
          </>
        );
      }
      case 'lastEditorName':
        return <ProfileLink memberId={rowData.lastEditorId}>{rowData.lastEditorName}</ProfileLink>;
      case 'updatedAt':
        return <span title={updatedAt.toFormat('yyyy-MM-dd HH:mm')}>{updatedAt.toRelative()}</span>;
      case 'revisionNo':
        return `r${rowData.revisionNo}`;
      default:
        return value;
    }
  };

  return (
    <StandardTable
      columns={isMobile ? mobileWikiDocColumn : wikiDocColumn}
      childComponent={childComponent}
      rows={docs.content.map((doc) => ({ ...doc, id: doc.docId }))}
      onRowClick={handleDocRowClick}
      paginationOption={{ rowsPerPage: docs.size, totalItems: docs.totalElements }}
    />
  );
};

export default WikiDocListSection;
