import { ChildComponent } from '@components/Table/StandardTable.interface';
import { AttendRankInfo, attendColumns, attendRows, attendTop4 } from '@mocks/AttendRankApi';
import { PointRankInfo, pointColumns, pointRows, pointTop4 } from '@mocks/PointRankApi';
import React, { useState } from 'react';
import StandardTable from '@components/Table/StandardTable';
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

const Rank = () => {
  const [tab, setTab] = useState('attend');

  return (
    <div>
      <div className="mb-10 flex w-full">
        <div className="flex w-2/3 flex-col">
          <p className="mb-5 w-full text-center text-2xl font-semibold">
            {tab === 'point' ? '누적 포인트 랭킹' : '일일 출석 랭킹'}
          </p>
          {tab === 'point' ? (
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
        <div className="ml-5 flex min-h-[45rem] w-1/3 flex-col">
          <p className="mb-5 w-full text-center text-2xl font-semibold">
            {tab === 'point' ? '오늘의 게임왕' : '개근왕'}
          </p>
          <div className="flex h-full flex-col justify-between">
            {tab === 'point'
              ? pointTop4.map((item, index) => (
                  <TopCard<PointRankInfo> item={item} message={`${item.point}pt 획득`} index={index} />
                ))
              : attendTop4.map((item, index) => (
                  <TopCard<AttendRankInfo> item={item} message={`${item.attend}일째 개근`} index={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rank;
