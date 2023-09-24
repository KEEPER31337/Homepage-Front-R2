import React, { useEffect, useState } from 'react';
import { AttendSeminarInfo } from '@api/dto';
import { useGetAttendSeminarListMutation, useGetSeminarListQuery } from '@api/seminarApi';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { Column } from '@components/Table/StandardTable.interface';
import PageTitle from '@components/Typography/PageTitle';

import AddSeminarModal from './Modal/AddSeminarModal';
import DeleteSeminarModal from './Modal/DeleteSeminarModal';

type SeminarId = number;

interface SeminarManageRow extends AttendSeminarInfo {
  [key: `date${SeminarId}`]: string;
}

const seminarManageColumn: Column<SeminarManageRow>[] = [
  { key: 'generation', headerName: '기수' },
  { key: 'memberName', headerName: '이름' },
];

const SeminarManage = () => {
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [openAddSeminarModal, setOpenAddSeminarModal] = useState(false);
  const [openDeleteSeminarModal, setOpenDeleteSeminarModal] = useState(false);
  const [dynamicColumn, setDynamicColumn] = useState(seminarManageColumn);

  const { page } = usePagination();
  const { data: seminarList } = useGetSeminarListQuery();
  const { data: attendSeminarList } = useGetAttendSeminarListMutation({ page });

  useEffect(() => {
    if (seminarList) {
      const newColumn = seminarList.map((seminar) => ({
        key: `date${seminar.id}` as keyof SeminarManageRow,
        headerName: seminar.name,
      }));
      setDynamicColumn(seminarManageColumn.concat(newColumn));
    }
  }, [seminarList]);

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
      <StandardTable<SeminarManageRow>
        columns={dynamicColumn}
        rows={
          attendSeminarList?.content.map((attendSeminar) => ({ id: attendSeminar.memberId, ...attendSeminar })) || []
        }
        paginationOption={{ rowsPerPage: attendSeminarList?.size, totalItems: attendSeminarList?.totalElements }}
      />
      <AddSeminarModal open={openAddSeminarModal} setOpen={setOpenAddSeminarModal} />
      <DeleteSeminarModal open={openDeleteSeminarModal} setOpen={setOpenDeleteSeminarModal} />
    </div>
  );
};

export default SeminarManage;
