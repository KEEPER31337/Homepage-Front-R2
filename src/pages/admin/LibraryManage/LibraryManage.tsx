import React from 'react';
import { BookListInfo } from '@api/dto';
import PageTitle from '@components/Typography/PageTitle';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ChildComponent } from '@components/Table/StandardTable.interface';

import SearchBook from './SearchBook';

interface BookListInfoColumn {
  key: keyof BookListInfo;
  headerName: string;
}

const LibraryManage = () => {
  const columns: BookListInfoColumn[] = [
    {
      key: 'no',
      headerName: '번호',
    },
    { key: 'title', headerName: '도서명' },
    { key: 'author', headerName: '저자' },
    { key: 'total', headerName: '대출현황' },
    { key: 'information', headerName: '대출정보' },
    {
      key: 'enable',
      headerName: '대출상태',
    },
  ];

  const rows: BookListInfo[] = [
    {
      id: 1,
      no: 1,
      title: '해킹책1',
      author: '장서윤',
      total: '3/3',
      information: '장서윤, 김은지, 송세연',
      enable: false,
    },
    {
      id: 2,
      no: 2,
      title: '보안책2',
      author: '아주아주 이름 긴 김은지',
      total: '1/10',
      information: '누가 빌려갔냐!',
      enable: false,
    },
    {
      id: 3,
      no: 3,
      title: '아주아주 긴 보안책',
      author: '장서윤',
      total: '1/1',
      information: '접니다',
      enable: true,
    },
  ];

  const childComponent = ({ key, value, rowData }: ChildComponent<BookListInfo>) => {
    switch (key) {
      case 'enable':
        return value ? (
          <div className="h-fit w-fit text-pointBlue">대출가능</div>
        ) : (
          <div className="h-fit w-fit text-subGray">대출불가</div>
        );
      default:
        return value;
    }
  };

  return (
    <div>
      <PageTitle>도서관리</PageTitle>
      <div className="flex h-fit w-full flex-col space-y-4">
        <div className="flex h-fit w-full justify-between">
          <SearchBook />
          <div className="flex space-x-2">
            <OutlinedButton>도서 추가</OutlinedButton>
            <OutlinedButton>도서 삭제</OutlinedButton>
            <OutlinedButton>대출 관리</OutlinedButton>
            <OutlinedButton>반납 관리</OutlinedButton>
          </div>
        </div>
        {/* 테이블 */}
        <StandardTable<BookListInfo> columns={columns} rows={rows} childComponent={childComponent} />
      </div>
    </div>
  );
};

export default LibraryManage;
