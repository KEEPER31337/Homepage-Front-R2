import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useRecoilValue } from 'recoil';
import { useGetMemberPostsQuery } from '@api/postApi';
import usePagination from '@hooks/usePagination';
import memberState from '@recoil/member.recoil';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';

interface MyBoardRow {
  id: number;
  num: number;
  title: string;
  categoryId: number;
  categoryName: string;
  visitCount: number;
  isSecret: boolean;
  registerTime: string;
}

const myBoardColumns: Column<MyBoardRow>[] = [
  { key: 'num', headerName: '번호' },
  { key: 'categoryName', headerName: '카테고리' },
  { key: 'title', headerName: '제목' },
  { key: 'registerTime', headerName: '작성일' },
  { key: 'visitCount', headerName: '조회수' },
];

const MyBoardChildComponent = ({ key, value }: ChildComponent<MyBoardRow>) => {
  switch (key) {
    case 'registerTime':
      return DateTime.fromSQL(value as string).toFormat('yy.MM.dd');
    default:
      return value;
  }
};

const MyBoardTable = () => {
  const userInfo = useRecoilValue(memberState);
  const navigate = useNavigate();
  const { page, getRowNumber } = usePagination();

  const { data: myBoard } = useGetMemberPostsQuery({ page, memberId: userInfo?.memberId as number });

  if (!myBoard) return null;

  return (
    <div className="h-full w-full">
      <Typography>작성글</Typography>
      <StandardTable<MyBoardRow>
        columns={myBoardColumns}
        rows={myBoard.content.map((item, index) => ({
          num: getRowNumber({ size: myBoard.size, index }),
          ...item,
        }))}
        childComponent={MyBoardChildComponent}
        onRowClick={({ rowData }) => navigate(`/board/view/${rowData.id}`)}
        paginationOption={{ rowsPerPage: myBoard.size, totalItems: myBoard.totalElements }}
      />
    </div>
  );
};

export default MyBoardTable;
