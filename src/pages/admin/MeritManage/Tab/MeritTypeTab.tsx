import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { MeritTypeInfo } from '@api/dto';
import { useGetMeritTypeQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import Selector from '@components/Selector/Selector';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import AddMeritTypeModal from '../Modal/AddMeritTypeModal';
import EditMeritTypeModal, { EditMeritTypeInfo, meritTypeChangeEnable } from '../Modal/EditMeritTypeModal';

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

type ScoreType = 'reword' | 'penalty' | 'all';

const MeritTypeTab = () => {
  const { page } = usePagination();
  const [scoreType, setScoreType] = useState<ScoreType>('all');

  const [addMeritTypeOpen, setAddMeritTypeOpen] = useState(false);
  const [editMeritType, setEditMeritType] = useState<EditMeritTypeInfo | null>(null);

  const { data: meritType } = useGetMeritTypeQuery({ page });

  if (!meritType) return <div />;

  const meritTypeFilter = (item: MeritTypeInfo) => {
    switch (scoreType) {
      case 'reword':
        return item.score > 0;
      case 'penalty':
        return item.score < 0;
      case 'all':
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
            { id: 'all', content: '전체' },
            { id: 'reword', content: '상점' },
            { id: 'penalty', content: '벌점' },
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
      <AddMeritTypeModal open={addMeritTypeOpen} onClose={() => setAddMeritTypeOpen(false)} />
      <EditMeritTypeModal meritType={editMeritType} onClose={() => setEditMeritType(null)} />
    </div>
  );
};

export default MeritTypeTab;
