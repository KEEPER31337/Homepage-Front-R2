import React, { useEffect, useState } from 'react';
import { AttendSeminarInfo, MemberSeminarAttendance } from '@api/dto';
import { useGetAttendSeminarListMutation, useGetSeminarListQuery } from '@api/seminarApi';
import usePagination from '@hooks/usePagination';
import SeminarAttendStatus from '@pages/senimarAttend/Status/SeminarAttendStatus';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { Cell, ChildComponent, Column } from '@components/Table/StandardTable.interface';
import PageTitle from '@components/Typography/PageTitle';

import AddSeminarModal from './Modal/AddSeminarModal';
import DeleteSeminarModal from './Modal/DeleteSeminarModal';

const seminarManageColumn: Column<AttendSeminarInfo>[] = [
  { key: 'generation', headerName: '기수' },
  { key: 'memberName', headerName: '이름' },
];

const SeminarManage = () => {
  const currentTerm = { year: 2023, season: '1학기' }; // TODO - 임시데이터
  const [openAddSeminarModal, setOpenAddSeminarModal] = useState(false);
  const [openDeleteSeminarModal, setOpenDeleteSeminarModal] = useState(false);
  const [dynamicColumn, setDynamicColumn] = useState<Column<AttendSeminarInfo>[]>([]);

  const { page } = usePagination();
  const { data: seminarList } = useGetSeminarListQuery();
  const { data: attendSeminarList } = useGetAttendSeminarListMutation({ page });

  useEffect(() => {
    if (seminarList) {
      const newColumn = seminarList.map((seminar) => ({
        key: `date${seminar.name}` /* TODO API 변경 후 id로 적용 `date${seminar.id}` */,
        headerName: seminar.name,
      }));
      setDynamicColumn(newColumn as Column<AttendSeminarInfo>[]);
    }
  }, [seminarList]);

  const childComponent = ({ key, value }: ChildComponent<AttendSeminarInfo>) => {
    if (key.slice(0, 4) === 'date' && value) {
      return <SeminarAttendStatus status={(value as MemberSeminarAttendance).attendanceStatus} hasIcon={false} />;
    }
    return value;
  };

  const onCellClick = ({ cellData }: { cellData: Cell<AttendSeminarInfo> }) => {
    // eslint-disable-next-line no-console
    console.log(cellData);
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
      <StandardTable<AttendSeminarInfo>
        columns={[...seminarManageColumn, ...dynamicColumn]}
        childComponent={childComponent}
        onCellClick={onCellClick}
        rows={
          attendSeminarList?.content.map((attendSeminar) => ({
            id: attendSeminar.memberId,
            ...attendSeminar,
          })) || []
        }
        paginationOption={{ rowsPerPage: attendSeminarList?.size, totalItems: attendSeminarList?.totalElements }}
      />
      <AddSeminarModal open={openAddSeminarModal} setOpen={setOpenAddSeminarModal} />
      <DeleteSeminarModal open={openDeleteSeminarModal} setOpen={setOpenDeleteSeminarModal} />
    </div>
  );
};

export default SeminarManage;
