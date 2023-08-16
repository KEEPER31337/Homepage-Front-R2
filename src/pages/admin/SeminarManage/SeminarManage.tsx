import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import { columns, rows } from '@mocks/SeminarManageApi';
import PageTitle from '@components/Typography/PageTitle';

import ActionButton from '@components/Button/ActionButton';
import AddSeminarModal from './Modal/AddSeminarModal';

const SeminarManage = () => {
  const listColumns = columns;
  const listRows = rows;
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [openAddSeminarModal, setOpenAddSeminarModal] = useState(false);

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <div className="mb-5 flex justify-end space-x-2">
        <ActionButton mode="add" onClick={() => setOpenAddSeminarModal(true)}>
          추가
        </ActionButton>
        <ActionButton mode="delete">삭제</ActionButton>
      </div>
      <StandardTable columns={listColumns} rows={listRows} />
      <AddSeminarModal open={openAddSeminarModal} setOpen={setOpenAddSeminarModal} />
    </div>
  );
};

export default SeminarManage;
