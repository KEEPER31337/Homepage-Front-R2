import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetMeritLogQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
import ActionButton from '@components/Button/ActionButton';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import AddMeritModal from '../Modal/AddMeritModal';

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

const MeritLogTab = () => {
  const [addMeritOpen, setAddMeritOpen] = useState(false);
  const { page } = usePagination();

  const { data: meritLog } = useGetMeritLogQuery({ page });

  if (!meritLog) return <div />;

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex h-12 w-full justify-end">
        <ActionButton mode="add" onClick={() => setAddMeritOpen(true)}>
          추가
        </ActionButton>
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
      <AddMeritModal open={addMeritOpen} onClose={() => setAddMeritOpen(false)} />
    </div>
  );
};

export default MeritLogTab;
