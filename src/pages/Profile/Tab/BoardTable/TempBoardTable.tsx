import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetMemberTempPostsQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';

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

const TempBoardChildComponent = ({ key, value }: ChildComponent<TempBoardRow>) => {
  switch (key) {
    case 'registerTime':
      return DateTime.fromSQL(value as string).toFormat('yy.MM.dd');
    default:
      return value;
  }
};

const TempBoardTable = () => {
  const navigate = useNavigate();
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
        onRowClick={({ rowData }) => navigate(`/board/view/${rowData.id}`)}
        paginationOption={{ rowsPerPage: tempBoard.size, totalItems: tempBoard.totalElements }}
      />
    </div>
  );
};

export default TempBoardTable;
