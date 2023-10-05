import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useGetMeritTypeQuery } from '@api/meritApi';
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
  { key: 'id', headerName: '번호' },
  { key: 'detail', headerName: '사유' },
  { key: 'score', headerName: '점수' },
];

const MeritTypeChildComponent = ({ value, rowData }: ChildComponent<MeritTypeRow>) => {
  let color = 'white';
  if (rowData.isMerit) color = 'pointBlue';
  else if (!rowData.isMerit) color = 'subRed';
  return <Typography className={`text-${color}`}>{value}</Typography>;
};

const MeritTypeTab = () => {
  const { page } = usePagination();

  const [addMeritTypeOpen, setAddMeritTypeOpen] = useState(false);
  const [editMeritType, setEditMeritType] = useState<MeritTypeModalInfo | undefined>();

  const { data: meritType } = useGetMeritTypeQuery({ page });

  if (!meritType) return null;

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex h-12 w-full justify-end">
        <ActionButton mode="add" onClick={() => setAddMeritTypeOpen(true)}>
          추가
        </ActionButton>
      </div>
      <StandardTable<MeritTypeRow>
        columns={MeritTypeColumn}
        rows={meritType.content}
        childComponent={MeritTypeChildComponent}
        onRowClick={({ rowData }) =>
          meritTypeChangeEnable(rowData.id) &&
          setEditMeritType({
            id: rowData.id,
            isMerit: rowData.isMerit,
            score: rowData.score,
            reason: rowData.detail,
          })
        }
        paginationOption={{ rowsPerPage: meritType.size, totalItems: meritType.totalElements }}
      />
      <SettingMeritTypeModal open={addMeritTypeOpen} onClose={() => setAddMeritTypeOpen(false)} />
      <SettingMeritTypeModal
        edit
        open={editMeritType !== undefined}
        status={editMeritType}
        onClose={() => setEditMeritType(undefined)}
      />
    </div>
  );
};

export default MeritTypeTab;
