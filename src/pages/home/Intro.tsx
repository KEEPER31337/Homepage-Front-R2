import React, { useState } from 'react';
import StandardTab from '@components/Tab/StandardTab';

const Intro = () => {
  const tabList = [
    { id: 0, label: '도서 관리' },
    { id: 1, label: '반납 관리' },
    { id: 2, label: '흠냐 관리' },
  ];
  const [tab, setTab] = useState(0);

  return (
    <div>
      <StandardTab options={tabList} tab={tab} setTab={setTab} />

      {tab === 0 && <div>도서</div>}
      {tab === 1 && <div>반납</div>}
      {tab === 2 && <div>흠냐</div>}
    </div>
  );
};

export default Intro;
