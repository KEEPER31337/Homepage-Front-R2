import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AttendRankInfo, GameRankInfo } from '@api/dto';
import {
  useGetContinuousAttendanceRank,
  useGetGameRank,
  useGetPointRank,
  useGetTodayAttendanceRank,
} from '@api/rankApi';
import usePagination from '@hooks/usePagination';
import { formatGeneration } from '@utils/converter';
import ServerAvatar from '@components/Avatar/ServerAvatar';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardTab from '@components/Tab/StandardTab';
import StandardTable from '@components/Table/StandardTable';
import { ChildComponent, Column } from '@components/Table/StandardTable.interface';
import TopCard from './TopCard';

interface AttendRankRow {
  id: number;
  rank: number;
  name: {
    realName: string;
    thumbnailPath?: string | null;
  };
  generation: string;
  totalAttendance: number;
  time: string;
}

interface PointRankRow {
  id: number;
  rank: number;
  name: {
    realName: string;
    thumbnailPath?: string | null;
  };
  generation: string;
  point: number;
}

const attendColumns: Column<AttendRankRow>[] = [
  { key: 'rank', headerName: '랭킹', width: 50 },
  { key: 'name', headerName: '이름', width: 100 },
  { key: 'generation', headerName: '기수', width: 100 },
  { key: 'totalAttendance', headerName: '총 출석일', width: 100 },
  { key: 'time', headerName: '출석 시간', width: 150 },
];

const pointColumns: Column<PointRankRow>[] = [
  { key: 'rank', headerName: '랭킹', width: 50 },
  { key: 'name', headerName: '이름', width: 100 },
  { key: 'generation', headerName: '기수', width: 100 },
  { key: 'point', headerName: '포인트', width: 100 },
];

const AttendRankChildComponent = ({ key, value }: ChildComponent<AttendRankRow>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <ServerAvatar className="mr-2 !h-6 !w-6" thumbnailPath={(value as AttendRankRow['name']).thumbnailPath} />
          {(value as AttendRankRow['name']).realName}
        </div>
      );
    case 'generation':
      return `${formatGeneration(value as string)}기`;
    case 'totalAttendance':
      return `${value}일`;
    default:
      return value;
  }
};

const PointRankChildComponent = ({ key, value }: ChildComponent<PointRankRow>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <ServerAvatar className="mr-2 !h-6 !w-6" thumbnailPath={(value as AttendRankRow['name']).thumbnailPath} />
          {(value as AttendRankRow['name']).realName}
        </div>
      );
    case 'generation':
      return `${formatGeneration(value as string)}기`;
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
              rows={attendRank.content.map((item, index) => ({
                id: getRowNumber({ size: attendRank.size, index }),
                name: {
                  realName: item.realName,
                  thumbnailPath: item.thumbnailPath,
                },
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
                name: {
                  realName: item.realName,
                  thumbnailPath: item.thumbnailPath,
                },
                ...item,
              }))}
              childComponent={PointRankChildComponent}
              paginationOption={{ rowsPerPage: pointRank.size, totalItems: pointRank.totalElements }}
            />
          )}
        </div>
        <div className="mb-16 flex w-full flex-col lg:mb-0 lg:ml-5 lg:min-h-[45rem] lg:w-1/3">
          <Typography marginBottom={2.5} variant="h3" fontWeight="semibold" className="text-center">
            {tab === 0 && '개근왕'}
            {tab === 1 && '오늘의 게임왕'}
          </Typography>
          <div className="flex flex-col justify-start">
            {tab === 0 &&
              (continuousAttendRank.length > 0 ? (
                continuousAttendRank.map((item, index) => (
                  <TopCard<AttendRankInfo>
                    key={item.rank}
                    item={item}
                    message={`${item.continuousDay}일째 개근`}
                    index={index}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <Typography marginY={5} className="text-center">
                    아직 개근왕이 없습니다.
                  </Typography>
                </div>
              ))}
            {tab === 1 &&
              (gameRank.length > 0 ? (
                gameRank.map((item, index) => (
                  <TopCard<GameRankInfo>
                    key={item.memberId}
                    item={item}
                    message={`${item.todayEarnedPoint}pt 획득`}
                    index={index}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Typography marginY={5} className="text-center">
                    아직 게임왕이 없습니다.
                  </Typography>
                  <Link to="/game">
                    <OutlinedButton>게임왕 되러 가기</OutlinedButton>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Rank;
