import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetMemberPostsQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';

interface MemberBoardRow {
  id: number;
  num: number;
  title: string;
  categoryId: number;
  categoryName: string;
  visitCount: number;
  isSecret: boolean;
  registerTime: string;
}

const myBoardColumns: Column<MemberBoardRow>[] = [
  { key: 'num', headerName: '번호' },
  { key: 'categoryName', headerName: '카테고리' },
  { key: 'title', headerName: '제목' },
  { key: 'registerTime', headerName: '작성일' },
  { key: 'visitCount', headerName: '조회수' },
];

const MyBoardChildComponent = ({ key, value }: ChildComponent<MemberBoardRow>) => {
  switch (key) {
    case 'registerTime':
      return DateTime.fromSQL(value as string).toFormat('yy.MM.dd');
    default:
      return value;
  }
};

const rowCnt = 5;

interface MemberBoardTableProps {
  memberId: number;
}

const MemberBoardTable = ({ memberId }: MemberBoardTableProps) => {
  const navigate = useNavigate();
  const { page, getRowNumber } = usePagination(`memberBoardPage_${memberId}`);

  const { data: memberBoard } = useGetMemberPostsQuery({ page, size: rowCnt, memberId });

  if (!memberBoard) return null;

  return (
    <div className="h-full w-full">
      <Typography>작성글</Typography>
      <StandardTable<MemberBoardRow>
        columns={myBoardColumns}
        rows={memberBoard.content.map((item, index) => ({
          num: getRowNumber({ size: memberBoard.size, index }),
          ...item,
        }))}
        childComponent={MyBoardChildComponent}
        onRowClick={({ rowData }) => navigate(`/board/view/${rowData.id}`)}
        paginationOption={{
          pageKey: `memberBoardPage_${memberId}`,
          rowsPerPage: memberBoard.size,
          totalItems: memberBoard.totalElements,
        }}
      />
    </div>
  );
};

export default MemberBoardTable;
