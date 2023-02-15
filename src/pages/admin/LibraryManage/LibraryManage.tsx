import React, { useState } from 'react';
import { Select, Option, Input, Checkbox } from '@material-tailwind/react';
import PageTitle from '@components/Typography/PageTitle';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';
import AddBookButton from '@components/LibraryManage/AddBookButton';
import DeleteBookButton from '@components/LibraryManage/DeleteBookButton';

interface IExampleRow {
  id: number;
  checkboxEnable: JSX.Element;
  bookTitle: string;
  bookWriter: string;
  bookStatus: string;
  bookInfo: string;
  bookEnable: JSX.Element;
}

const BookEnableText = ({ enable }: { enable: boolean }) => {
  return enable === true ? (
    <div className="h-fit w-fit text-pointBlue">대출가능</div>
  ) : (
    <div className="h-fit w-fit text-subGray">대출불가</div>
  );
};

const LibraryManage = () => {
  const columns = [
    { key: 'checkboxEnable' as keyof IExampleRow, headerName: '' },
    { key: 'bookTitle' as keyof IExampleRow, headerName: '도서명' },
    { key: 'bookWriter' as keyof IExampleRow, headerName: '저자' },
    { key: 'bookStatus' as keyof IExampleRow, headerName: '대출현황' },
    { key: 'bookInfo' as keyof IExampleRow, headerName: '대출정보' },
    { key: 'bookEnable' as keyof IExampleRow, headerName: '대출상태' },
  ];

  const rows: IExampleRow[] = [
    {
      id: 1,
      checkboxEnable: <Checkbox />,
      bookTitle: '해킹책1',
      bookWriter: '장서윤',
      bookStatus: '3/3',
      bookInfo: '장서윤, 김은지, 송세연',
      bookEnable: <BookEnableText enable={false} />,
    },
    {
      id: 2,
      checkboxEnable: <Checkbox />,
      bookTitle: '보안책2',
      bookWriter: '아주아주 이름 긴 김은지',
      bookStatus: '1/10',
      bookInfo: '누가 빌려갔냐!',
      bookEnable: <BookEnableText enable />,
    },
    {
      id: 3,
      checkboxEnable: <Checkbox />,
      bookTitle: '아주아주 긴 보안책',
      bookWriter: '장서윤',
      bookStatus: '1/1',
      bookInfo: '접니다',
      bookEnable: <BookEnableText enable={false} />,
    },
  ];

  return (
    <div>
      <PageTitle>도서관리</PageTitle>
      <div className="flex h-fit w-full flex-col space-y-4">
        {/* 상단 검색창, 버튼 */}
        <div className="flex h-full w-full justify-between">
          <div className="flex w-fit space-x-2">
            <Select className="border-pointBlue text-white " variant="standard" value="도서명+저자">
              <Option>도서명+저자</Option>
              <Option>도서명</Option>
              <Option>저자</Option>
            </Select>

            <Input label="검색어를 입력하세요" className="w-64" />
          </div>
          <div className="flex space-x-2">
            <AddBookButton />
            <DeleteBookButton />
            <OutlinedButton onClick={() => console.log('OutlinedButton')}>대출 관리</OutlinedButton>
            <OutlinedButton onClick={() => console.log('OutlinedButton')}>반납 관리</OutlinedButton>
          </div>
        </div>
        {/* 테이블 */}
        <StandardTable<IExampleRow> columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default LibraryManage;
