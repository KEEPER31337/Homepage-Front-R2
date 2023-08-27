import React, { useState } from 'react';
import { BookListInfo } from '@api/dto';
import usePagination from '@hooks/usePagination';
import { useGetBookManageListQuery } from '@api/libraryManageApi';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { Column, Row, ChildComponent } from '@components/Table/StandardTable.interface';

import SearchSection from '@components/Section/SearchSection';
import AddBookModal from '../Modal/AddBookModal';
import DeleteBookModal from '../Modal/DeleteBookModal';

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
  const size = 10;
  const { page, getRowNumber } = usePagination();

  const { data: bookListData } = useGetBookManageListQuery({ page, size });

  console.log(bookListData);
  const selectorList = [
    { id: 'all', content: '도서명 + 저자' },
    { id: 'title', content: '도서명' },
    { id: 'author', content: '저자' },
  ];
  const [inputValue, setInputValue] = useState('');
  const [selectorValue, setSelectorValue] = useState('all');

  const handleSearchButtonClick = () => {
    console.log(selectorValue, inputValue, '검색 api 호출');
  };

  const childComponent = ({ key, value }: ChildComponent<libraryManageRow>) => {
    switch (key) {
      case 'canBorrow':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);

  const handlePostRowClick = ({ rowData }: { rowData: Row<libraryManageRow> }) => {
    console.log(rowData.id, rowData);
  };

  if (!bookListData) return null;

  return (
    <>
      <div className="flex justify-between space-x-2">
        <SearchSection
          options={selectorList}
          selectorValue={selectorValue}
          setSelectorValue={setSelectorValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearchButtonClick={handleSearchButtonClick}
        />
        <OutlinedButton onClick={() => setAddBookModalOpen(true)}>도서 추가</OutlinedButton>
        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>
      {/* <OutlinedButton onClick={() => setDeleteBookModalOpen(true)}>도서 삭제</OutlinedButton>
      <DeleteBookModal open={deleteBookModalOpen} onClose={() => setDeleteBookModalOpen(false)} /> */}
      <StandardTable
        columns={libraryManageColumn}
        rows={bookListData?.content.map((post, postIndex) => ({
          no: getRowNumber({ size, index: postIndex }),
          ...post,
        }))}
        childComponent={childComponent}
        paginationOption={{ rowsPerPage: size, totalItems: bookListData?.totalElement }}
        onRowClick={handlePostRowClick}
      />
    </>
  );
};

export default BookManageTab;
