import React from 'react';
import TableViewSwitchButton from '@components/Button/TableViewSwitchButton';
import StandardTable from '@components/Table/StandardTable';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import SearchSection from '@components/Section/SearchSection';
import { useGetPostListQuery } from '@api/postApi';
import { categoryNameToId } from '@utils/converter';
import { Column, Row } from '@components/Table/StandardTable.interface';
import usePagination from '@hooks/usePagination';

interface BoardRow {
  no: number;
  title: string;
  writerName: string;
  registerTime: string;
  visitCount: number;
}

const boardColumn: Column<BoardRow>[] = [
  { key: 'no', headerName: '번호' },
  { key: 'title', headerName: '제목' },
  { key: 'writerName', headerName: '작성자' },
  { key: 'registerTime', headerName: '작성일' },
  { key: 'visitCount', headerName: '조회수' },
];

const BoardList = () => {
  const { categoryName } = useParams();
  const { page, getRowNumber } = usePagination();
  const categoryId = categoryName ? categoryNameToId(categoryName) : null;

  if (!categoryId) {
    return null;
  }

  const navigate = useNavigate();
  const { data: posts } = useGetPostListQuery({ categoryId, page });

  if (!posts) {
    return null;
  }

  const handleWriteButtonClick = () => {
    navigate('/board/write');
  };

  const handlePostRowClick = ({ rowData }: { rowData: Row<BoardRow> }) => {
    if (!rowData.id) return;

    navigate(`/board/view/${rowData.id}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>{categoryName}</PageTitle>
        <OutlinedButton onClick={handleWriteButtonClick}>글쓰기</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        <SearchSection />
        <div className="flex gap-2">
          <TableViewSwitchButton type="List" isActive />
          <TableViewSwitchButton type="Grid" />
        </div>
      </div>
      <StandardTable
        columns={boardColumn}
        rows={posts.content.map((post, postIndex) => ({
          no: getRowNumber({ size: posts.size, index: postIndex }),
          ...post,
        }))}
        onRowClick={handlePostRowClick}
        paginationOption={{ rowsPerPage: posts.size, totalItems: posts.totalElements }}
      />
    </div>
  );
};

export default BoardList;
