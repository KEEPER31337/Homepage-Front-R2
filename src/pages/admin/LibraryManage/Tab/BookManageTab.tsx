import React, { ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { VscTrash } from 'react-icons/vsc';
import { BookListSearch } from '@api/dto';
import { useGetBookManageListQuery, useDeleteBookMutation } from '@api/libraryManageApi';
import usePagination from '@hooks/usePagination';
import LibrarySearchSection from '@pages/Library/SearchSection/LibrarySearchSection';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { Column, Row, ChildComponent } from '@components/Table/StandardTable.interface';
import AddBookModal from '../Modal/AddBookModal';

interface libraryManageRow {
  no: number;
  title: string;
  author: string;
  bookQuantity: string;
  borrowers: string;
  canBorrow: boolean;
  delete: ReactElement;
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
  { key: 'delete', headerName: '삭제' },
];

const BookManageTab = () => {
  const { page, getRowNumber } = usePagination();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType') as BookListSearch['searchType'];
  const search = searchParams.get('search') as BookListSearch['search'];

  const { data: bookManageListData } = useGetBookManageListQuery({ page, searchType, search });
  const { mutate: deleteBookMutation } = useDeleteBookMutation();

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  const childComponent = ({ key, value }: ChildComponent<libraryManageRow>) => {
    switch (key) {
      case 'canBorrow':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBookRowClick = ({ rowData }: { rowData: Row<libraryManageRow> }) => {
    // TODO 도서 수정 API 호출
  };

  const handleDeleteButtonClick = (bookId: number) => {
    deleteBookMutation(bookId);
  };

  return (
    <>
      <div className="mb-5 flex justify-between space-x-2">
        <LibrarySearchSection />
        <ActionButton mode="add" onClick={() => setAddBookModalOpen(true)}>
          추가
        </ActionButton>
        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>
      <StandardTable
        columns={libraryManageColumn}
        rows={
          bookManageListData?.content.map((book, bookIndex) => ({
            id: book.bookId,
            no: getRowNumber({ size: bookManageListData.size, index: bookIndex }),
            delete: (
              <IconButton onClick={() => handleDeleteButtonClick(book.bookId)}>
                <VscTrash size={20} className="fill-subRed" />
              </IconButton>
            ),
            ...book,
          })) || []
        }
        childComponent={childComponent}
        paginationOption={{ rowsPerPage: bookManageListData?.size, totalItems: bookManageListData?.totalElement }}
        onRowClick={handleBookRowClick}
      />
    </>
  );
};

export default BookManageTab;
