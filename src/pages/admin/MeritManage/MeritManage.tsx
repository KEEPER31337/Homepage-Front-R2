import React, { useState } from 'react';
import StandardTab from '@components/Tab/StandardTab';
import MeritLogTab from './Tab/MeritLogTab';
import MeritTypeTab from './Tab/MeritTypeTab';
import UserMeritTab from './Tab/UserMeritTab';

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

const MeritManage = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <StandardTab options={tabs.map((v) => ({ id: v.id, label: v.label }))} tab={tab} setTab={setTab} />
      {tab === 0 && <MeritLogTab />}
      {tab === 1 && <UserMeritTab />}
      {tab === 2 && <MeritTypeTab />}
    </>
  );
};

export default MeritManage;
