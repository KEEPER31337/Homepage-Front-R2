import React from 'react';
import { Typography } from '@mui/material';
import { useGetMeritTypeQuery } from '@api/meritApi';
import useModal from '@hooks/useModal';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import SettingMeritTypeModal, { MeritTypeModalInfo, meritTypeChangeEnable } from '../Modal/SettingMeritTypeModal';

interface MeritTypeRow {
  id: number;
  detail: string;
  score: number;
  isMerit: boolean;
}

const MeritTypeColumn: Column<MeritTypeRow>[] = [
  { key: 'id', headerName: '번호', width: 100 },
  { key: 'detail', headerName: '사유', width: 300 },
  { key: 'score', headerName: '점수', width: 100 },
];

const MeritTypeChildComponent = ({ value, rowData }: ChildComponent<MeritTypeRow>) => {
  let color = 'white';
  if (rowData.isMerit) color = 'pointBlue';
  else if (!rowData.isMerit) color = 'subRed';
  return <Typography className={`text-${color}`}>{value}</Typography>;
};

const MeritTypeTab = () => {
  const { page } = usePagination();

  const addMeritTypeModal = useModal();
  const editMeritTypeModal = useModal<MeritTypeModalInfo>();

  const { data: meritType } = useGetMeritTypeQuery({ page });

  if (!meritType) return null;

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex h-12 w-full justify-end">
        <ActionButton mode="add" onClick={() => addMeritTypeModal.open()}>
          추가
        </ActionButton>
      </div>
      <StandardTable<MeritTypeRow>
        columns={MeritTypeColumn}
        rows={meritType.content}
        childComponent={MeritTypeChildComponent}
        onRowClick={({ rowData }) =>
          meritTypeChangeEnable(rowData.id) &&
          editMeritTypeModal.open({
            id: rowData.id,
            isMerit: rowData.isMerit,
            score: rowData.score,
            reason: rowData.detail,
          })
        }
        paginationOption={{ rowsPerPage: meritType.size, totalItems: meritType.totalElements }}
      />
      {addMeritTypeModal.isMounted && (
        <SettingMeritTypeModal
          key={addMeritTypeModal.key}
          open={addMeritTypeModal.isOpen}
          onClose={addMeritTypeModal.close}
        />
      )}
      {editMeritTypeModal.isMounted && editMeritTypeModal.data && (
        <SettingMeritTypeModal
          key={editMeritTypeModal.key}
          edit
          open={editMeritTypeModal.isOpen}
          status={editMeritTypeModal.data}
          onClose={editMeritTypeModal.close}
        />
      )}
    </div>
  );
};

export default MeritTypeTab;
