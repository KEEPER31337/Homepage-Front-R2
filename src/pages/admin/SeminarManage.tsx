import React from 'react';
import StandardTable from '@components/Table/StandardTable';
import { columns, rows } from '@mocks/SeminarManageApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';

const SeminarManage = () => {
  const listColumns = columns;
  const listRows = rows;
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터

  const handleSeminarAddButtonClick = () => {
    // TODO
  };

  return (
    <div>
      <PageTitle>세미나 관리 {`(${currentTerm.year}년 ${currentTerm.season})`}</PageTitle>
      <StandardTable columns={listColumns} rows={listRows} />
      <div className="mt-4 flex justify-end space-x-2">
        <OutlinedButton onClick={handleSeminarAddButtonClick}>추가</OutlinedButton>
        <OutlinedButton>삭제</OutlinedButton>
      </div>
    </div>
  );
};

export default SeminarManage;
