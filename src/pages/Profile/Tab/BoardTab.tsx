import React from 'react';
import MyBoardTable from './BoardTable/MyBoardTable';
import TempBoardTable from './BoardTable/TempBoardTable';

const BoardTab = () => {
  return (
    <div className="gird-cols-2 grid h-full w-full">
      <TempBoardTable />
      <MyBoardTable />
    </div>
  );
};

export default BoardTab;
