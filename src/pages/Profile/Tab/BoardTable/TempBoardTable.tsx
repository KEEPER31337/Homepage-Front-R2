import React from 'react';
import { Typography } from '@mui/material';
import { useGetMemberTempPostsQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';

interface TempBoardRow {
  id: number;
  num: number;
  title: string;
  categoryId: number;
  categoryName: string;
  registerTime: string;
}

const tempBoardColumns: Column<TempBoardRow>[] = [
  { key: 'num', headerName: '번호' },
  { key: 'categoryName', headerName: '카테고리' },
  { key: 'title', headerName: '제목' },
  { key: 'registerTime', headerName: '작성일' },
];

const TempBoardChildComponent = () => {
  return <div />;
};

const TempBoardTable = () => {
  const { page, getRowNumber } = usePagination();

  const { data: tempBoard } = useGetMemberTempPostsQuery({ page });

  if (!tempBoard) return null;

  return (
    <div className="h-full w-full">
      <Typography>임시 작성글</Typography>
      <StandardTable<TempBoardRow>
        columns={tempBoardColumns}
        rows={tempBoard.content.map((item, index) => ({
          num: getRowNumber({ size: tempBoard.size, index }),
          ...item,
        }))}
        childComponent={TempBoardChildComponent}
        paginationOption={{ rowsPerPage: tempBoard.size, totalItems: tempBoard.totalElements }}
      />
    </div>
  );
};

export default TempBoardTable;
