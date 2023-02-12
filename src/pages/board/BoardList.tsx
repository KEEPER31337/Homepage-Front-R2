import React from 'react';
import BoardPagination from '@components/Board/BoardPagination';
import BoardSearch from '@components/Board/BoardSearch';
import StandardTable from '@components/Table/StandardTable';
import { ReactComponent as ListViewIcon } from '@img/board/listview_icon.svg';
import { ReactComponent as GridViewIcon } from '@img/board/gridview_icon.svg';
import { useSearchParams } from 'react-router-dom';

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
    <div className="flex h-screen flex-col items-center bg-subBlack pt-24">
      <div className="w-full text-white">
        <div className="flex flex-row justify-between">
          <div className="text-h3 text-subBlue">{category}</div>
          <div className="rounded-sm border border-subBlue px-6 py-2 text-sm font-semibold text-subBlue">글쓰기</div>
        </div>
        <div className="flex flex-row items-center justify-between pt-12 pb-5">
          <BoardSearch />
          <div className="flex flex-row justify-between gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-subBlue">
              <ListViewIcon width="15" height="11" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-white">
              <GridViewIcon width="13" height="13" />
            </div>
          </div>
        </div>
        <StandardTable columns={dummyColumn} rows={dummyRow} />
        <BoardPagination />
      </div>
    </div>
  );
};

export default BoardList;
