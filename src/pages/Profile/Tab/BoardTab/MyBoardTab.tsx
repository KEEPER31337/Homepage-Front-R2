import React from 'react';
import { useMeQuery } from '@api/meApi';
import MemberBoardTable from './Table/MemberBoardTable';
import TempBoardTable from './Table/TempBoardTable';

const MyBoardTab = () => {
  const { data: userInfo } = useMeQuery();

  return (
    <div className="gird-cols-2 grid h-full w-full">
      <TempBoardTable />
      <MemberBoardTable memberId={userInfo ? userInfo.memberId : 0} />
    </div>
  );
};

export default MyBoardTab;
