import React, { useReducer } from 'react';
import StandardTable from '@components/Table/StandardTable';
import { columns, rows } from '@mocks/SeminarManageApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';

import AddSeminarModal from './Modal/AddSeminarModal';

const SeminarManage = () => {
  const listColumns = columns;
  const listRows = rows;
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [openSeminarAddModal, toggleSeminarAddModal] = useReducer((prev) => !prev, false);

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <StandardTable columns={listColumns} rows={listRows} />
      <div className="mt-4 flex justify-end space-x-2">
        <OutlinedButton onClick={() => toggleSeminarAddModal()}>추가</OutlinedButton>
        <OutlinedButton>삭제</OutlinedButton>
      </div>
      <AddSeminarModal open={openSeminarAddModal} toggleOpen={toggleSeminarAddModal} />
    </div>
  );
};

export default SeminarManage;
