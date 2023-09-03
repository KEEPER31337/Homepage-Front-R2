import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { MeritTypeInfo } from '@api/dto';
import { useGetMeritLogQuery, useGetMeritTypeQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
import Selector from '@components/Selector/Selector';
import StandardTab from '@components/Tab/StandardTab';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import AddMeritModal from './Modal/AddMeritModal';
import AddMeritTypeModal from './Modal/AddMeritTypeModal';
import EditMeritTypeModal, { EditMeritTypeInfo, meritTypeChangeEnable } from './Modal/EditMeritTypeModal';

interface MeritLogRow {
  id: number;
  giveTime: string;
  awarder: string;
  score: number;
  reason: string;
}

const MeritLogColumn: Column<MeritLogRow>[] = [
  { key: 'id', headerName: '번호' },
  { key: 'giveTime', headerName: '일시' },
  { key: 'awarder', headerName: '이름 (기수)' },
  { key: 'score', headerName: '점수' },
  { key: 'reason', headerName: '사유' },
];

const MeritLogChildComponent = ({ key, value, rowData }: ChildComponent<MeritLogRow>) => {
  let color = 'white';
  if (rowData.score > 0) color = 'pointBlue';
  else if (rowData.score < 0) color = 'subRed';

  switch (key) {
    case 'giveTime':
      return (
        <Typography className={`text-${color}`}>{DateTime.fromSQL(value as string).toFormat('yyyy.MM.dd')}</Typography>
      );
    default:
      return <Typography className={`text-${color}`}>{value}</Typography>;
  }
};

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

const tabs = [
  {
    id: 0,
    label: '상벌점 내역',
  },
  {
    id: 1,
    label: '회원별 조회',
  },
  {
    id: 2,
    label: '사유 관리',
  },
];

type ScoreType = 'reword' | 'penalty' | 'all';

const MeritManage = () => {
  const [tab, setTab] = useState(0);
  const { page } = usePagination();
  const [scoreType, setScoreType] = useState<ScoreType>('all');

  const [addMeritOpen, setAddMeritOpen] = useState(false);
  const [addMeritTypeOpen, setAddMeritTypeOpen] = useState(false);
  const [editMeritType, setEditMeritType] = useState<EditMeritTypeInfo | null>(null);

  const { data: meritLog } = useGetMeritLogQuery({ page });
  const { data: meritType } = useGetMeritTypeQuery({ page });

  if (!meritLog || !meritType) return null;

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
    <>
      <StandardTab options={tabs.map((v) => ({ id: v.id, label: v.label }))} tab={tab} setTab={setTab} />
      {tab === 0 && (
        <div className="flex w-full flex-col">
          <div className="my-5 flex h-12 w-full">
            <Button
              onClick={() => setAddMeritOpen(true)}
              variant="outlined"
              className="!ml-auto h-fit !rounded-sm !border-pointBlue !px-6 !font-semibold disabled:!border-subGray"
            >
              + 추가
            </Button>
          </div>
          <StandardTable<MeritLogRow>
            columns={MeritLogColumn}
            rows={meritLog.content.map((item) => ({
              awarder: `${item.awarderName} (${parseFloat(item.awarderGeneration as string)}기)`,
              ...item,
            }))}
            childComponent={MeritLogChildComponent}
            paginationOption={{ rowsPerPage: meritLog.size, totalItems: meritLog.totalElements }}
          />
        </div>
      )}
      {tab === 2 && (
        <div className="flex w-full flex-col">
          <div className="my-5 flex h-12 w-full">
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
            <Button
              onClick={() => setAddMeritTypeOpen(true)}
              variant="outlined"
              className="!ml-auto h-fit !rounded-sm !border-pointBlue !px-6 !font-semibold disabled:!border-subGray"
            >
              + 추가
            </Button>
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
        </div>
      )}
      <AddMeritModal open={addMeritOpen} onClose={() => setAddMeritOpen(false)} meritTypes={meritType.content} />
      <AddMeritTypeModal open={addMeritTypeOpen} onClose={() => setAddMeritTypeOpen(false)} />
      <EditMeritTypeModal meritType={editMeritType} onClose={() => setEditMeritType(null)} />
    </>
  );
};

export default MeritManage;
