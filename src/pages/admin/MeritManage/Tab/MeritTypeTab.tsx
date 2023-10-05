import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { MeritTypeInfo } from '@api/dto';
import { useGetMeritTypeQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import Selector from '@components/Selector/Selector';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import SettingMeritTypeModal, { MeritTypeModalInfo, meritTypeChangeEnable } from '../Modal/SettingMeritTypeModal';

interface MeritTypeRow {
  id: number;
  detail: string;
  score: number;
}

const MeritTypeColumn: Column<MeritTypeRow>[] = [
  { key: 'id', headerName: '번호' },
  { key: 'detail', headerName: '사유' },
  { key: 'score', headerName: '점수' },
];

const MeritTypeChildComponent = ({ value, rowData }: ChildComponent<MeritTypeRow>) => {
  let color = 'white';
  if (rowData.score > 0) color = 'pointBlue';
  else if (rowData.score < 0) color = 'subRed';
  return <Typography className={`text-${color}`}>{value}</Typography>;
};

type ScoreType = 'MERIT' | 'DEMERIT' | 'ALL';

const MeritTypeTab = () => {
  const { page } = usePagination();
  const [scoreType, setScoreType] = useState<ScoreType>('ALL');

  const [addMeritTypeOpen, setAddMeritTypeOpen] = useState(false);
  const [editMeritType, setEditMeritType] = useState<MeritTypeModalInfo | undefined>();

  const { data: meritType } = useGetMeritTypeQuery({ page });

  if (!meritType) return null;

  const meritTypeFilter = (item: MeritTypeInfo) => {
    switch (scoreType) {
      case 'MERIT':
        return item.score > 0;
      case 'DEMERIT':
        return item.score < 0;
      case 'ALL':
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex h-12 w-full justify-between">
        <Selector
          className="w-40"
          label="유형"
          value={scoreType}
          onChange={(e) => {
            setScoreType(e.target.value as ScoreType);
          }}
          options={[
            { id: 'ALL', content: '전체' },
            { id: 'MERIT', content: '상점' },
            { id: 'DEMERIT', content: '벌점' },
          ]}
        />
        <ActionButton mode="add" onClick={() => setAddMeritTypeOpen(true)}>
          추가
        </ActionButton>
      </div>
      <StandardTable<MeritTypeRow>
        columns={MeritTypeColumn}
        rows={meritType.content.filter(meritTypeFilter)}
        childComponent={MeritTypeChildComponent}
        onRowClick={({ rowData }) =>
          meritTypeChangeEnable(rowData.id) &&
          setEditMeritType({
            id: rowData.id,
            type: rowData.score > 0 ? 'reword' : 'penalty',
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
