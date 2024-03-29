import React, { ReactElement, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { VscTrash } from 'react-icons/vsc';
import { BookListSearch, ManageBookInfo } from '@api/dto';
import { useGetBookManageListQuery, useGetBookDetailQuery } from '@api/libraryManageApi';
import usePagination from '@hooks/usePagination';
import LibrarySearchSection from '@pages/Library/SearchSection/LibrarySearchSection';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { Column, Row, ChildComponent } from '@components/Table/StandardTable.interface';
import DeleteBookModal from '../Modal/DeleteBookModal';
import UploadBookModal from '../Modal/UploadBookModal';

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
  { key: 'no', headerName: '번호', width: '5%' },
  { key: 'title', headerName: '도서명', width: '35%' },
  { key: 'author', headerName: '저자', width: '30%' },
  { key: 'bookQuantity', headerName: '대출현황', width: '5%' },
  { key: 'borrowers', headerName: '대출자', width: '15%' },
  {
    key: 'canBorrow',
    headerName: '대출상태',
    width: '5%',
  },
  { key: 'delete', headerName: '삭제', width: '5%' },
];

const BookManageTab = () => {
  const { page, getRowNumber } = usePagination();
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('searchType') as BookListSearch['searchType'];
  const search = searchParams.get('search') as BookListSearch['search'];

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);
  const [deleteBook, setDeleteBook] = useState<ManageBookInfo>();

  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [editBookId, setEditBookId] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: bookManageListData } = useGetBookManageListQuery({ page, searchType, search });
  const { data: bookDetail } = useGetBookDetailQuery(editBookId);

  const childComponent = ({ key, value }: ChildComponent<libraryManageRow>) => {
    switch (key) {
      case 'canBorrow':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };

  const handleBookRowClick = ({ rowData }: { rowData: Row<libraryManageRow> }) => {
    setEditBookId(rowData.id);
    setEditBookModalOpen(true);
  };

  const handleDeleteButtonClick = (book: ManageBookInfo) => {
    setDeleteBook(book);
    setDeleteBookModalOpen(true);
  };

  return (
    <>
      <div className="mb-2 flex w-full flex-col items-start justify-between sm:mb-5 sm:flex-row sm:items-center">
        <LibrarySearchSection />
        <div className="items-ends mt-2 flex w-full justify-end space-x-4 sm:mt-0">
          <ActionButton className="w-fit" small={isMobile} mode="add" onClick={() => setAddBookModalOpen(true)}>
            추가
          </ActionButton>
        </div>
        <UploadBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>
      <StandardTable
        columns={libraryManageColumn}
        rows={
          bookManageListData?.content.map((book, bookIndex) => ({
            id: book.bookId,
            no: getRowNumber({ size: bookManageListData.size, index: bookIndex }),
            delete: (
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteButtonClick(book);
                }}
                className="!p-0"
                disabled={book.currentQuantity !== book.totalQuantity}
              >
                <VscTrash
                  size={20}
                  className={`${book.currentQuantity !== book.totalQuantity ? 'fill-subGray' : 'fill-subRed'} `}
                />
              </IconButton>
            ),
            ...book,
            bookQuantity: `${book.currentQuantity}/${book.totalQuantity}`,
          })) || []
        }
        childComponent={childComponent}
        paginationOption={{ rowsPerPage: bookManageListData?.size, totalItems: bookManageListData?.totalElement }}
        onRowClick={handleBookRowClick}
      />
      {bookDetail && (
        <UploadBookModal open={editBookModalOpen} onClose={() => setEditBookModalOpen(false)} bookDetail={bookDetail} />
      )}
      {deleteBook && (
        <DeleteBookModal
          open={deleteBookModalOpen}
          onClose={() => setDeleteBookModalOpen(false)}
          deleteBook={deleteBook}
        />
      )}
    </>
  );
};

export default BookManageTab;
