import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { AttendSeminarInfo } from '@api/dto';
import { useGetAttendSeminarListMutation, useGetSeminarListQuery } from '@api/seminarApi';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
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
        key: `date${seminar.name}` as keyof SeminarManageRow /* TODO API 변경 후 id로 적용 `date${seminar.id}` */,
        headerName: seminar.name,
      }));
      setDynamicColumn(seminarManageColumn.concat(newColumn));
    }
  }, [seminarList]);

  const childComponent = ({ key, value, rowData }: ChildComponent<SeminarManageRow>) => {
    if (key.slice(0, 4) === 'date') {
      return rowData.attendances.find((attendance) =>
        DateTime.fromISO(attendance.attendDate).equals(DateTime.fromISO(key.slice(4).replaceAll('.', '-'))),
      )?.attendanceStatus; /* TODO API 변경 후 id로 적용 `date${seminar.id}` */
    }
    return value;
  };

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
        childComponent={childComponent}
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
