import React, { ReactElement, useState } from 'react';
import usePagination from '@hooks/usePagination';
import { useGetBookManageListQuery, useDeleteBookMutation } from '@api/libraryManageApi';
import StandardTable from '@components/Table/StandardTable';
import ActionButton from '@components/Button/ActionButton';
import { Column, Row, ChildComponent } from '@components/Table/StandardTable.interface';
import { IconButton } from '@mui/material';
import { VscTrash } from 'react-icons/vsc';
import { useSearchParams } from 'react-router-dom';
import { BookListSearch } from '@api/dto';
import AddBookModal from '../Modal/AddBookModal';
import EditBookModal from '../Modal/EditBookModal';
import LibraryManageSearchSection from '../SearchSection/LibraryManageSearchSection';

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
  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(0);
  const childComponent = ({ key, value }: ChildComponent<libraryManageRow>) => {
    switch (key) {
      case 'canBorrow':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };

  const handleBookRowClick = ({ rowData }: { rowData: Row<libraryManageRow> }) => {
    console.log('수정');
    setEditBookId(rowData.id);
    setEditBookModalOpen(true);
  };

  const handleDeleteButtonClick = (bookId: number) => {
    console.log('삭제');
    deleteBookMutation(bookId);
  };
  if (!bookManageListData) return null;

  return (
    <>
      <div className="mb-5 flex justify-between space-x-2">
        <LibraryManageSearchSection />
        <ActionButton mode="add" onClick={() => setAddBookModalOpen(true)}>
          추가
        </ActionButton>
        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>
      <StandardTable
        columns={libraryManageColumn}
        rows={bookManageListData?.content.map((book, bookIndex) => ({
          id: book.bookId,
          no: getRowNumber({ size: bookManageListData.size, index: bookIndex }),
          delete: (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteButtonClick(book.bookId);
              }}
            >
              <VscTrash size={20} className="fill-subRed" />
            </IconButton>
          ),
          ...book,
        }))}
        childComponent={childComponent}
        paginationOption={{ rowsPerPage: bookManageListData.size, totalItems: bookManageListData?.totalElement }}
        onRowClick={handleBookRowClick}
      />
      {!!editBookId && (
        <EditBookModal open={editBookModalOpen} onClose={() => setEditBookModalOpen(false)} editBookId={editBookId} />
      )}
    </>
  );
};

export default BookManageTab;
