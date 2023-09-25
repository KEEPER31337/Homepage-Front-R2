import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { AttendRankInfo, GameRankInfo } from '@api/dto';
import {
  useGetContinuousAttendanceRank,
  useGetGameRank,
  useGetPointRank,
  useGetTodayAttendanceRank,
} from '@api/rankApi';
import usePagination from '@hooks/usePagination';
import StandardTab from '@components/Tab/StandardTab';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import TopCard from './TopCard';

interface AttendRankRow {
  id: number;
  rank: number;
  realName: string;
  generation: string;
  continuousDay: number;
  time: string;
}

interface PointRankRow {
  id: number;
  rank: number;
  realName: string;
  generation: string;
  point: number;
}

const attendColumns: Column<AttendRankRow>[] = [
  { key: 'rank', headerName: '랭킹' },
  { key: 'realName', headerName: '이름' },
  { key: 'generation', headerName: '기수' },
  { key: 'continuousDay', headerName: '총 출석일' },
  { key: 'time', headerName: '출석 시간' },
];

const pointColumns: Column<PointRankRow>[] = [
  { key: 'rank', headerName: '랭킹' },
  { key: 'realName', headerName: '이름' },
  { key: 'generation', headerName: '기수' },
  { key: 'point', headerName: '포인트' },
];

const AttendRankChildComponent = ({ key, value }: ChildComponent<AttendRankRow>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'realName':
      return (
        <div className="flex place-items-center">
          <Avatar alt="profile" className="mr-2 !h-6 !w-6" />
          {value}
        </div>
      );
    case 'generation':
      return `${value}기`;
    case 'continuousDay':
      return `${value}일`;
    default:
      return value;
  }
};

const PointRankChildComponent = ({ key, value }: ChildComponent<PointRankRow>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'realName':
      return (
        <div className="flex place-items-center">
          <Avatar alt="profile" className="mr-2 !h-6 !w-6" />
          {value}
        </div>
      );
    case 'generation':
      return `${value}기`;
    default:
      return value;
  }
};

const tapOptions = [
  { id: 0, label: '출석랭킹' },
  { id: 1, label: '포인트 랭킹' },
];

const Rank = () => {
  const [tab, setTab] = useState(0);
  const { page, getRowNumber } = usePagination();

  const { data: attendRank } = useGetTodayAttendanceRank({ page });
  const { data: pointRank } = useGetPointRank({ page });
  const { data: continuousAttendRank } = useGetContinuousAttendanceRank();
  const { data: gameRank } = useGetGameRank();

  if (!attendRank || !pointRank || !continuousAttendRank || !gameRank) return null;

  return (
    <>
      <StandardTab options={tapOptions} tab={tab} setTab={setTab} />
      <div className="my-10 flex w-full flex-col-reverse lg:flex-row">
        <div className="flex w-full flex-col lg:w-2/3">
          <Typography marginBottom={2.5} variant="h3" fontWeight="semibold" className="text-center">
            {tab === 0 && '일일 출석 랭킹'}
            {tab === 1 && '누적 포인트 랭킹'}
          </Typography>
          {tab === 0 && (
            <StandardTable<AttendRankRow>
              columns={attendColumns}
              rows={attendRank.content.map((item) => ({
                id: item.rank,
                ...item,
              }))}
              childComponent={AttendRankChildComponent}
              paginationOption={{ rowsPerPage: attendRank.size, totalItems: attendRank.totalElements }}
            />
          )}
          {tab === 1 && (
            <StandardTable<PointRankRow>
              columns={pointColumns}
              rows={pointRank.content.map((item, index) => ({
                id: getRowNumber({ size: pointRank.size, index }),
                rank: getRowNumber({ size: pointRank.size, index }),
                ...item,
              }))}
              childComponent={PointRankChildComponent}
              paginationOption={{ rowsPerPage: pointRank.size, totalItems: pointRank.totalElements }}
            />
          )}
        </div>
        <div className="mb-48 flex w-full flex-col px-10 lg:mb-0 lg:ml-5 lg:min-h-[45rem] lg:w-1/3 lg:px-0">
          <Typography marginBottom={2.5} variant="h3" fontWeight="semibold" className="text-center">
            {tab === 0 && '개근왕'}
            {tab === 1 && '오늘의 게임왕'}
          </Typography>
          <div className="flex h-full flex-col justify-between">
            {tab === 0 &&
              continuousAttendRank.map((item, index) => (
                <TopCard<AttendRankInfo>
                  key={item.rank}
                  item={item}
                  message={`${item.continuousDay}일째 개근`}
                  index={index}
                />
              ))}
            {tab === 1 &&
              gameRank.map((item, index) => (
                <TopCard<GameRankInfo>
                  key={item.memberId}
                  item={item}
                  message={`${item.todayEarnedPoint}pt 획득`}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Rank;
