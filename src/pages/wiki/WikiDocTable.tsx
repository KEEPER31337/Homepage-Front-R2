import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { WikiDocumentSummary, WikiPage } from '@api/wikiDto';
import ProfileLink from '@components/Link/ProfileLink';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column, Row } from '@components/Table/StandardTable.interface';

const wikiDocColumn: Column<WikiDocumentSummary>[] = [
  { key: 'updatedAt', headerName: '수정일', width: '15%' },
  { key: 'title', headerName: '제목', width: '60%' },
  { key: 'lastEditorName', headerName: '최근 편집자', width: '15%' },
  { key: 'revisionNo', headerName: '리비전', width: '10%' },
];

const mobileWikiDocColumn = wikiDocColumn.filter(({ key }) => key === 'title');

interface WikiDocTableProps {
  docs: WikiPage<WikiDocumentSummary>;
}

/* NOTE 문서 목록(WikiList)과 태그별 문서 목록(WikiTag)이 같이 쓰는 표입니다. 페이지 번호는 URL의 page 쿼리를 따릅니다. */
const WikiDocTable = ({ docs }: WikiDocTableProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDocRowClick = ({ rowData }: { rowData: Row<WikiDocumentSummary> }) => {
    navigate(`/wiki/view/${rowData.docId}`);
  };

  const childComponent = ({ key, rowData }: ChildComponent<WikiDocumentSummary>) => {
    const updatedAt = DateTime.fromSQL(rowData.updatedAt);

    switch (key) {
      case 'title': {
        const isRecentlyUpdated = updatedAt >= DateTime.now().plus({ days: -1 }).startOf('day');

        return (
          <>
            <div className="flex items-center">
              <span>{rowData.title}</span>
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
        return null;
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

export default WikiDocTable;
