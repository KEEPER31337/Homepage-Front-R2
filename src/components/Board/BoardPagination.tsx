import React from 'react';

const BoardPagination = () => {
  return (
    <div className="flex h-[46px] flex-row items-center justify-between bg-middleBlack px-4 ">
      <div className="text-xs text-white/50">Showing 1-10 of 30 items</div>
      <div>pagination 부분</div>
    </div>
  );
};

export default BoardPagination;
