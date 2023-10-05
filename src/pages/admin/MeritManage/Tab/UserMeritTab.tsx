import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useGetMembersMeritQuery } from '@api/meritApi';
import usePagination from '@hooks/usePagination';
// import Selector from '@components/Selector/Selector';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import MemberMeritModal, { MemberMeritModalState } from '../Modal/MemberMeritModal';

interface MembersMeritRow {
  id: number;
  memberId: number;
  memberName: string;
  generation: string;
  merit: number;
  demerit: number;
}

const MembersMeritColumn: Column<MembersMeritRow>[] = [
  { key: 'id', headerName: '번호' },
  { key: 'generation', headerName: '기수' },
  { key: 'memberName', headerName: '이름' },
  { key: 'merit', headerName: '상점' },
  { key: 'demerit', headerName: '벌점' },
];

const MembersMeritChildComponent = ({ key, value }: ChildComponent<MembersMeritRow>) => {
  switch (key) {
    case 'generation':
      return `${parseFloat(value as string)} 기`;
    case 'merit':
      return <Typography className={`${(value as number) > 0 && 'text-pointBlue'}`}>{value}</Typography>;
    case 'demerit':
      return <Typography className={`${(value as number) > 0 && 'text-subRed'}`}>{value}</Typography>;
    default:
      return value;
  }
};

// type SortType = 'highestReword' | 'highestPenalty';

const UserMeritTab = () => {
  const { page, getRowNumber } = usePagination();
  // const [sortType, setSortType] = useState<SortType>('highestReword');
  const [memberMeritOpen, setMemberMeritOpen] = useState<MemberMeritModalState>({
    memberId: 0,
    title: '',
  });

  const { data: membersMerit } = useGetMembersMeritQuery({ page });

  if (!membersMerit) return null;

  return (
    <div className="flex w-full flex-col">
      <div className="my-5 flex h-12 w-full justify-between">
        {/* <Selector
          className="w-40"
          label="정렬"
          value={sortType}
          onChange={(e) => {
            setSortType(e.target.value as SortType);
          }}
          options={[
            { id: 'highestReword', content: '상점 높은 순' },
            { id: 'highestPenalty', content: '벌점 높은 순' },
          ]}
        /> */}
      </div>
      <StandardTable<MembersMeritRow>
        columns={MembersMeritColumn}
        rows={membersMerit.content.map((member, index) => ({
          id: getRowNumber({ size: membersMerit.size, index }),
          ...member,
        }))}
        onRowClick={({ rowData }) => {
          setMemberMeritOpen({
            memberId: rowData.memberId,
            title: `${parseFloat(rowData.generation)}기 ${rowData.memberName} 회원의 상벌점 내역`,
          });
        }}
        childComponent={MembersMeritChildComponent}
        paginationOption={{ rowsPerPage: membersMerit.size, totalItems: membersMerit.totalElements }}
      />
      <MemberMeritModal
        title={memberMeritOpen.title}
        memberId={memberMeritOpen.memberId}
        setMemberId={setMemberMeritOpen}
      />
    </div>
  );
};

export default UserMeritTab;
