import { ChildComponent } from '@components/Table/StandardTable.interface';
import { AttendRankInfo, attendColumns, attendRows, attendTop4 } from '@mocks/AttendRankApi';
import { PointRankInfo, pointColumns, pointRows, pointTop4 } from '@mocks/PointRankApi';
import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import StandardTab from '@components/Tab/StandardTab';
import { Avatar, Typography } from '@mui/material';
import TopCard from './TopCard';

const AttendRankChildComponent = ({ key, value }: ChildComponent<AttendRankInfo>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <Avatar alt="profile" className="mr-2 !h-6 !w-6" />
          {value}
        </div>
      );
    case 'no':
      return `${value}기`;
    case 'attend':
      return `${value}일째 출석 중`;
    default:
      return value;
  }
};

const PointRankChildComponent = ({ key, value }: ChildComponent<PointRankInfo>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <Avatar alt="profile" className="mr-2 !h-6 !w-6" />
          {value}
        </div>
      );
    case 'no':
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
            <StandardTable<AttendRankInfo>
              columns={attendColumns}
              rows={attendRows}
              childComponent={AttendRankChildComponent}
            />
          )}
          {tab === 1 && (
            <StandardTable<PointRankInfo>
              columns={pointColumns}
              rows={pointRows}
              childComponent={PointRankChildComponent}
            />
          )}
        </div>
        <div className="flex min-h-[45rem] w-full flex-col px-10 lg:ml-5 lg:w-1/3 lg:px-0">
          <Typography marginBottom={2.5} variant="h3" fontWeight="semibold" className="text-center">
            {tab === 0 && '개근왕'}
            {tab === 1 && '오늘의 게임왕'}
          </Typography>
          <div className="flex h-full flex-col justify-between">
            {tab === 0 &&
              attendTop4.map((item, index) => (
                <TopCard<AttendRankInfo> key={item.id} item={item} message={`${item.attend}일째 개근`} index={index} />
              ))}
            {tab === 1 &&
              pointTop4.map((item, index) => (
                <TopCard<PointRankInfo> key={item.id} item={item} message={`${item.point}pt 획득`} index={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Rank;