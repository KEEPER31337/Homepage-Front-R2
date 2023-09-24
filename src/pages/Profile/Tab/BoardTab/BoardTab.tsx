import React from 'react';
import MyBoardTable from './Table/MyBoardTable';
import TempBoardTable from './Table/TempBoardTable';

const BoardTab = () => {
  return (
    <div className="gird-cols-2 grid h-full w-full">
      <TempBoardTable />
      <MyBoardTable />
    </div>
  );
};

export default BoardTab;
