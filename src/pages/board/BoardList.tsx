import React from 'react';
import TableViewSwitchButton from '@components/Button/TableViewSwitchButton';
import StandardTable from '@components/Table/StandardTable';
import { useSearchParams } from 'react-router-dom';
import PageTitle from '@components/Typography/PageTitle';
import OutlinedButton from '@components/Button/OutlinedButton';
import SearchSection from '@components/Section/SearchSection';
import { useRecoilState } from 'recoil';
import { TableType } from '@components/Table/StandardTable.interface';
import tableTypeState from '@atoms/TableAtoms';
import GridTable from '@components/Table/GridTable';
import { dummyColumn, dummyRow } from '@mocks/BoardListApi';

const BoardList = () => {
  const [tableType] = useRecoilState<TableType>(tableTypeState);
  const [searchParams] = useSearchParams();
  const category: string | null = searchParams.get('category');

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle>{category}</PageTitle>
        <OutlinedButton>글쓰기</OutlinedButton>
      </div>
      <div className="flex items-center justify-between pb-5">
        <SearchSection />
        <div className="flex gap-2">
          <TableViewSwitchButton type="List" />
          <TableViewSwitchButton type="Grid" />
        </div>
      </div>
      {tableType === 'List' ? <StandardTable columns={dummyColumn} rows={dummyRow} /> : <GridTable rows={dummyRow} />}
    </div>
  );
};

export default BoardList;
