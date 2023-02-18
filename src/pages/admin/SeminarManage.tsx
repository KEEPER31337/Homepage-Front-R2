import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import { Button } from '@mui/material';
import { columns, rows } from '@mocks/SeminarManageApi';
import type { SeminarListRow } from '@mocks/SeminarManageApi';

const SeminarManage = () => {
  const [listColumns, setListColumns] = useState(columns);
  const [listRows, setListRows] = useState(rows);
  const [newDate, setNewDate] = useState();

  const addSeminar = () => {
    // TODO
  };

  return (
    <div className="flex h-full flex-col space-y-[32px] bg-subBlack px-20 pt-[80px]">
      <p className="font-[28pt] text-pointBlue">세미나 관리(2023년 1학기)</p>
      <div className="flex h-fit w-full justify-between">
        <div className="m-10 grow">
          <StandardTable columns={listColumns} rows={listRows} />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outlined" className="border-pointBlue text-pointBlue" onClick={addSeminar}>
              추가
            </Button>
            <Button variant="outlined" className="border-2 border-pointBlue text-pointBlue">
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarManage;
