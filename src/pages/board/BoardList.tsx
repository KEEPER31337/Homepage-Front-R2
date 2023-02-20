import React from 'react';
import TableViewSwitchButton from '@components/Button/TableViewSwitchButton';
import StandardTable from '@components/Table/StandardTable';
import { useSearchParams } from 'react-router-dom';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import SearchSection from '@components/Section/SearchSection';

interface BoardRow {
  id: number;
  no: number;
  title: string;
  writer: string;
  registerDate: string;
  watched: number;
}

interface BoardColumn {
  key: keyof BoardRow;
  headerName: string;
}

const dummyColumn: BoardColumn[] = [
  { key: 'no', headerName: '번호' },
  { key: 'title', headerName: '제목' },
  { key: 'writer', headerName: '작성자' },
  { key: 'registerDate', headerName: '작성일' },
  { key: 'watched', headerName: '조회수' },
];

const dummyRow: BoardRow[] = [
  { id: 1, no: 1, title: '아무제목이나적어1', writer: '랄랄라', registerDate: '2023.02.09', watched: 12 },
  { id: 2, no: 2, title: '아무제목이나적어2', writer: '아무개', registerDate: '2023.02.08', watched: 34 },
  { id: 3, no: 3, title: '아무제목이나적어3', writer: '김개똥', registerDate: '2023.02.07', watched: 56 },
  { id: 4, no: 4, title: '아무제목이나적어4', writer: '랄랄라', registerDate: '2023.02.09', watched: 12 },
  { id: 5, no: 5, title: '아무제목이나적어5', writer: '아무개', registerDate: '2023.02.08', watched: 34 },
  { id: 6, no: 6, title: '아무제목이나적어6', writer: '김개똥', registerDate: '2023.02.07', watched: 56 },
  { id: 7, no: 7, title: '아무제목이나적어7', writer: '랄랄라', registerDate: '2023.02.09', watched: 12 },
  { id: 8, no: 8, title: '아무제목이나적어8', writer: '아무개', registerDate: '2023.02.08', watched: 34 },
];

const BoardList = () => {
  const [searchParams] = useSearchParams();
  const category: string | null = searchParams.get('category');

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>{category}</PageTitle>
        <OutlinedButton>글쓰기</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        <SearchSection />
        <div className="flex gap-2">
          <TableViewSwitchButton type="List" isActive />
          <TableViewSwitchButton type="Grid" />
        </div>
      </div>
      <StandardTable columns={dummyColumn} rows={dummyRow} />
    </div>
  );
};

export default BoardList;
