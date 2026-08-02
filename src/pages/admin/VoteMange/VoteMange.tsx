import React, { useState } from 'react';

import StandardTab from '@components/Tab/StandardTab';
import VoteCreation from './Creation/VoteCreation';
import VoteListTab from './Tab/VoteListTab';

const voteManageTabs = [
  { id: 0, label: '투표 목록' },
  { id: 1, label: '투표 생성' },
];

const VoteMange = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <StandardTab options={voteManageTabs} tab={tab} setTab={setTab} />
      <div className="mt-10">
        {tab === 0 && <VoteListTab />}
        {tab === 1 && <VoteCreation onCancel={() => setTab(0)} />}
      </div>
    </>
  );
};

export default VoteMange;
