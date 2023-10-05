import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPostListQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column, Row } from '@components/Table/StandardTable.interface';

interface BoardRow {
  no: number | string;
  title: string;
  writerName: string;
  registerTime: string;
  visitCount: number;
  likeCount: number;
  commentCount: number;
  isSecret: boolean;
}

const boardColumn: Column<BoardRow>[] = [
  { key: 'no', headerName: '번호' },
  { key: 'title', headerName: '제목' },
  { key: 'writerName', headerName: '작성자' },
  { key: 'registerTime', headerName: '작성일' },
  { key: 'visitCount', headerName: '조회수' },
  { key: 'likeCount', headerName: '추천수' },
];

const STUDY_CATEGORY_ID = 201;

const OldStudy = () => {
  const navigate = useNavigate();
  const { page, getRowNumber } = usePagination();
  const { data: posts } = useGetPostListQuery({ categoryId: STUDY_CATEGORY_ID, page });

  const handlePostRowClick = ({ rowData }: { rowData: Row<BoardRow> }) => {
    if (!rowData.id) return;

    navigate(`/board/view/${rowData.id}`, { state: rowData.isSecret });
  };

  const childComponent = ({ key, value, rowData }: ChildComponent<BoardRow>) => {
    switch (key) {
      case 'title':
        return (
          <div className="flex items-center">
            <span>{value}</span>
            {rowData.commentCount > 0 && <span className="ml-1 text-pointBlue">[{rowData.commentCount}]</span>}
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <StandardTable
      columns={boardColumn}
      childComponent={childComponent}
      rows={
        posts?.content.map((post, postIndex) => ({
          no: getRowNumber({ size: posts.size, index: postIndex }),
          ...post,
        })) || []
      }
      onRowClick={handlePostRowClick}
      paginationOption={{ rowsPerPage: posts?.size, totalItems: posts?.totalElements }}
    />
  );
};

export default OldStudy;
