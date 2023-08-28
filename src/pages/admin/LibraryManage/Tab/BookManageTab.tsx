import React, { useState } from 'react';
import usePagination from '@hooks/usePagination';
import { useGetBookManageListQuery } from '@api/libraryManageApi';
import StandardTable from '@components/Table/StandardTable';
import ActionButton from '@components/Button/ActionButton';
import { Column, Row, ChildComponent } from '@components/Table/StandardTable.interface';
import SearchSection from '@components/Section/SearchSection';
import AddBookModal from '../Modal/AddBookModal';

interface libraryManageRow {
  no: number;
  title: string;
  author: string;
  bookQuantity: string;
  borrowers: string;
  canBorrow: boolean;
}

const libraryManageColumn: Column<libraryManageRow>[] = [
  { key: 'no', headerName: '번호' },
  { key: 'title', headerName: '도서명' },
  { key: 'author', headerName: '저자' },
  { key: 'bookQuantity', headerName: '대출현황' },
  { key: 'borrowers', headerName: '대출자' },
  {
    key: 'canBorrow',
    headerName: '대출상태',
  },
];

const BookManageTab = () => {
  const { page, getRowNumber } = usePagination();
  const { data: bookManageListData } = useGetBookManageListQuery({ page });

  const selectorList = [
    { id: 'all', content: '도서명 + 저자' },
    { id: 'title', content: '도서명' },
    { id: 'author', content: '저자' },
  ];
  const [inputValue, setInputValue] = useState('');
  const [selectorValue, setSelectorValue] = useState('all');

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  const childComponent = ({ key, value }: ChildComponent<libraryManageRow>) => {
    switch (key) {
      case 'canBorrow':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };
  const handleSearchButtonClick = () => {
    // TODO 검색 API 호출
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBookRowClick = ({ rowData }: { rowData: Row<libraryManageRow> }) => {
    // TODO 도서 수정 API 호출
  };

  if (!bookManageListData) return null;

  return (
    <>
      <div className="mb-5 flex justify-between space-x-2">
        <SearchSection
          options={selectorList}
          selectorValue={selectorValue}
          setSelectorValue={setSelectorValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearchButtonClick={handleSearchButtonClick}
        />
        <ActionButton mode="add" onClick={() => setAddBookModalOpen(true)}>
          추가
        </ActionButton>
        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>
      <StandardTable
        columns={libraryManageColumn}
        rows={bookManageListData?.content.map((book, bookIndex) => ({
          no: getRowNumber({ size: bookManageListData.size, index: bookIndex }),
          ...book,
        }))}
        childComponent={childComponent}
        paginationOption={{ rowsPerPage: bookManageListData.size, totalItems: bookManageListData?.totalElement }}
        onRowClick={handleBookRowClick}
      />
    </>
  );
};

export default BookManageTab;
