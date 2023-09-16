import React from 'react';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useGetPointLogQuery } from '@api/pointApi';
import usePagination from '@hooks/usePagination';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';

interface PointLogRow {
  id: number;
  point: number;
  description: string;
  date: string;
}

const pointLogColumns: Column<PointLogRow>[] = [
  { key: 'id', headerName: '번호' },
  { key: 'point', headerName: '포인트' },
  { key: 'description', headerName: '정보' },
  { key: 'date', headerName: '일자' },
];

const PointLogChildComponent = ({ key, value, rowData }: ChildComponent<PointLogRow>) => {
  let color = 'white';
  if (rowData.point > 0) color = 'pointBlue';
  else if (rowData.point < 0) color = 'subRed';

  switch (key) {
    case 'id':
      return value;
    case 'point':
      return <Typography className={`text-${color}`}>{value}</Typography>;
    case 'description':
      return value;
    case 'date':
      return DateTime.fromSQL(value as string).toFormat('yyyy.MM.dd');
    default:
      return value;
  }
};

const PointTab = () => {
  const { page, getRowNumber } = usePagination();

  const { data: pointLog } = useGetPointLogQuery({ page });

  if (!pointLog) return null;

  return (
    <div className="w-full">
      <StandardTable<PointLogRow>
        columns={pointLogColumns}
        rows={pointLog.content.map((item, index) => ({
          id: getRowNumber({ size: pointLog.size, index }),
          ...item,
        }))}
        childComponent={PointLogChildComponent}
        paginationOption={{ rowsPerPage: pointLog.size, totalItems: pointLog.totalElements }}
      />
    </div>
  );
};

export default PointTab;
