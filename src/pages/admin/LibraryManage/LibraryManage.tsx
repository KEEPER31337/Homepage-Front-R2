import React, { useState } from 'react';
import { BookListInfo } from '@api/dto';
import PageTitle from '@components/Typography/PageTitle';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ChildComponent } from '@components/Table/StandardTable.interface';
import { columns, rows } from '@mocks/LibraryManageApi';

import SearchSection from '@components/Section/SearchSection';
import AddBookModal from './Modal/AddBookModal';
import DeleteBookModal from './Modal/DeleteBookModal';

const LibraryManage = () => {
  const childComponent = ({ key, value }: ChildComponent<BookListInfo>) => {
    switch (key) {
      case 'enable':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };
  const [addBookModalopen, setAddBookModalopen] = useState(false);
  const [deleteBookModalopen, setDeleteBookModalopen] = useState(false);
  return (
    <div>
      <PageTitle>도서관리</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <SearchSection />
        <div className="flex space-x-2">
          <OutlinedButton onClick={() => setAddBookModalopen(true)}>도서 추가</OutlinedButton>
          <OutlinedButton onClick={() => setDeleteBookModalopen(true)}>도서 삭제</OutlinedButton>
          <OutlinedButton>대출 관리</OutlinedButton>
          <OutlinedButton>반납 관리</OutlinedButton>

          <AddBookModal open={addBookModalopen} onClose={() => setAddBookModalopen(false)} />
          <DeleteBookModal open={deleteBookModalopen} onClose={() => setDeleteBookModalopen(false)} />
        </div>
      </div>
      <StandardTable<BookListInfo> columns={columns} rows={rows} childComponent={childComponent} />
    </div>
  );
};

export default LibraryManage;
