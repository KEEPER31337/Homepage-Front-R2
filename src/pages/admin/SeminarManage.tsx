import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import { Button } from '@mui/material';
import { columns, rows } from '@mocks/SeminarManageApi';
import type { SeminarListRow } from '@mocks/SeminarManageApi';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';

const SeminarManage = () => {
  const [listColumns, setListColumns] = useState(columns);
  const [listRows, setListRows] = useState(rows);
  const [newDate, setNewDate] = useState();

  const addSeminar = () => {
    // TODO
  };

  return (
    <div>
      <PageTitle>세미나 관리(2023년 1학기)</PageTitle>
      <StandardTable columns={listColumns} rows={listRows} />
      <div className="mt-4 flex justify-end space-x-2">
        <OutlinedButton onClick={addSeminar}>추가</OutlinedButton>
        <OutlinedButton>삭제</OutlinedButton>
      </div>
    </div>
  );
};

export default SeminarManage;
