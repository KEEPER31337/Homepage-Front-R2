import React, { useState } from 'react';
import { columns, rows } from '@mocks/SeminarManageApi';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import PageTitle from '@components/Typography/PageTitle';

import AddSeminarModal from './Modal/AddSeminarModal';
import DeleteSeminarModal from './Modal/DeleteSeminarModal';

const SeminarManage = () => {
  const listColumns = columns;
  const listRows = rows;
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [openAddSeminarModal, setOpenAddSeminarModal] = useState(false);
  const [openDeleteSeminarModal, setOpenDeleteSeminarModal] = useState(false);

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <div className="mb-5 flex justify-end space-x-2">
        <ActionButton mode="add" onClick={() => setOpenAddSeminarModal(true)}>
          추가
        </ActionButton>
        <ActionButton mode="delete" onClick={() => setOpenDeleteSeminarModal(true)}>
          삭제
        </ActionButton>
      </div>
      <StandardTable columns={listColumns} rows={listRows} />
      <AddSeminarModal open={openAddSeminarModal} setOpen={setOpenAddSeminarModal} />
      <DeleteSeminarModal open={openDeleteSeminarModal} setOpen={setOpenDeleteSeminarModal} />
    </div>
  );
};

export default SeminarManage;
