import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import { Button } from '@mui/material';


const SeminarContent = () => {
  const [listColumns, setListColumns] = useState([
  ]);
  const [listRows, setListRows] = useState([
  ]);
  const [newDate, setNewDate] = useState();
  const addSeminar = () => {
    setListColumns([
      ...listColumns,
      {
        key: `date${newDate}` as keyof SeminarListRow,
        headerName: `${newDate}`,
      },
    ]);
    setListRows(
      listRows.map((row) => {
        return { ...row, [`date${newDate}`]: '출석 전' };
      }),
    );
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

const SeminarManage = () => {
  return (
    <div>
      <div>Keeper Title</div>
      <div className="flex h-[100vh] w-[100vw] bg-gray-300">
        <div className="h-[100vh] w-[320px] border border-black bg-white">사이드 바</div>
        <div className="flex w-full justify-center">
          <div className="h-full w-full max-w-[1080px] border border-black bg-white">
            <SeminarContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarManage;
