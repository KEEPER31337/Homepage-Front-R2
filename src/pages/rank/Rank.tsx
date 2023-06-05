import { ChildComponent } from '@components/Table/StandardTable.interface';
import { AttendRankInfo, attendColumns, attendRows, attendTop4 } from '@mocks/AttendRankApi';
import { PointRankInfo, pointColumns, pointRows, pointTop4 } from '@mocks/PointRankApi';
import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
import StandardTab from '@components/Tab/StandardTab';
import { Typography } from '@material-tailwind/react';
import TopCard from './TopCard';

const AttendRankChileComponent = ({ key, value }: ChildComponent<AttendRankInfo>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <img alt="profile" src="/img/sampleProfile.svg" className="mr-2 w-8 object-contain" />
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

const PointRankChileComponent = ({ key, value }: ChildComponent<PointRankInfo>) => {
  switch (key) {
    case 'rank':
      return `${value}등`;
    case 'name':
      return (
        <div className="flex place-items-center">
          <img alt="profile" src="/img/sampleProfile.svg" className="mr-2 w-8 object-contain" />
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
          <Typography className="mb-5 w-full text-center text-2xl font-semibold">
            {tab === 1 ? '누적 포인트 랭킹' : '일일 출석 랭킹'}
          </Typography>
          {tab === 1 ? (
            <StandardTable<PointRankInfo>
              columns={pointColumns}
              rows={pointRows}
              childComponent={PointRankChileComponent}
            />
          ) : (
            <StandardTable<AttendRankInfo>
              columns={attendColumns}
              rows={attendRows}
              childComponent={AttendRankChileComponent}
            />
          )}
        </div>
        <div className="flex min-h-[45rem] w-full flex-col px-10 lg:ml-5 lg:w-1/3 lg:px-0">
          <Typography className="mb-5 w-full text-center text-2xl font-semibold">
            {tab === 1 ? '오늘의 게임왕' : '개근왕'}
          </Typography>
          <div className="flex h-full flex-col justify-between">
            {tab === 1
              ? pointTop4.map((item, index) => (
                  <TopCard<PointRankInfo> item={item} message={`${item.point}pt 획득`} index={index} />
                ))
              : attendTop4.map((item, index) => (
                  <TopCard<AttendRankInfo> item={item} message={`${item.attend}일째 개근`} index={index} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Rank;
