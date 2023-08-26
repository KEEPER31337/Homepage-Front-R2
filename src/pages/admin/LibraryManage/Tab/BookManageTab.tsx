import React, { useState } from 'react';
import { BookListInfo } from '@api/dto';

import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ChildComponent } from '@components/Table/StandardTable.interface';
import { columns, rows } from '@mocks/LibraryManageApi';

import AddBookModal from '../Modal/AddBookModal';
import DeleteBookModal from '../Modal/DeleteBookModal';

const BookManageTab = () => {
  const childComponent = ({ key, value }: ChildComponent<BookListInfo>) => {
    switch (key) {
      case 'enable':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false);

  return (
    <>
      <div className="flex space-x-2">
        <OutlinedButton onClick={() => setAddBookModalOpen(true)}>도서 추가</OutlinedButton>
        <OutlinedButton onClick={() => setDeleteBookModalOpen(true)}>도서 삭제</OutlinedButton>

        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
        <DeleteBookModal open={deleteBookModalOpen} onClose={() => setDeleteBookModalOpen(false)} />
      </div>
      <StandardTable<BookListInfo> columns={columns} rows={rows} childComponent={childComponent} />
    </>
  );
};

export default BookManageTab;
