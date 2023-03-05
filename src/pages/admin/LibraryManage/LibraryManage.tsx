import React, { useReducer, useState } from 'react';
import { BookListInfo } from '@api/dto';
import PageTitle from '@components/Typography/PageTitle';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ChildComponent, Row } from '@components/Table/StandardTable.interface';
import { columns, rows } from '@mocks/LibraryManageApi';

import SearchSection from '@components/Section/SearchSection';
import AddBookModal from './Modal/AddBookModal';
import DeleteBookModal from './Modal/DeleteBookModal';
import EditBookInfoModal from './Modal/EditBookInfoModal';

const LibraryManage = () => {
  const childComponent = ({ key, value }: ChildComponent<BookListInfo>) => {
    switch (key) {
      case 'enable':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };

  const [openEditModal, toggleOpenEditModal] = useReducer((prev) => !prev, false);
  const [EditModalRowData, setEditModalRowData] = useState<Row<BookListInfo>>({} as Row<BookListInfo>);

  const handleClick = ({ rowData }: { rowData: Row<BookListInfo> }) => {
    toggleOpenEditModal();
    console.log(rowData);
    setEditModalRowData(rowData);
  };

  return (
    <div>
      <PageTitle>도서관리</PageTitle>
      <div className="mb-5 flex w-full items-center justify-between">
        <SearchSection />
        <div className="flex space-x-2">
          <AddBookModal />
          <DeleteBookModal />
          <OutlinedButton>대출 관리</OutlinedButton>
          <OutlinedButton>반납 관리</OutlinedButton>
        </div>
      </div>
      <StandardTable<BookListInfo>
        columns={columns}
        rows={rows}
        childComponent={childComponent}
        onRowClick={handleClick}
      />
      <EditBookInfoModal
        openEditModal={openEditModal}
        toggleOpenEditModal={toggleOpenEditModal}
        EditModalRowData={EditModalRowData}
      />
    </div>
  );
};

export default LibraryManage;
