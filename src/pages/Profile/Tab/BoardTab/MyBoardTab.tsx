import React from 'react';
import { useAtomValue } from 'jotai';
import memberState from '@recoil/member.recoil';
import MemberBoardTable from './Table/MemberBoardTable';
import TempBoardTable from './Table/TempBoardTable';

const MyBoardTab = () => {
  const userInfo = useAtomValue(memberState);

  return (
    <div className="gird-cols-2 grid h-full w-full">
      <TempBoardTable />
      <MemberBoardTable memberId={userInfo ? userInfo.memberId : 0} />
    </div>
  );
};

export default MyBoardTab;
