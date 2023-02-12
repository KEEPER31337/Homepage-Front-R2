import React from 'react';
import { ReactComponent as DropDownIcon } from '@img/board/dropdown_icon.svg';
import { ReactComponent as SearchIcon } from '@img/board/board_search_icon.svg';

const BoardSearch = () => {
  return (
    <div className="flex basis-3/5 flex-row gap-4">
      <div className="flex basis-1/6 flex-row items-center justify-between border-b border-subBlue px-1 py-2">
        <span>제목 + 내용</span>
        <DropDownIcon />
      </div>
      <div className="flex basis-5/6 flex-row items-center justify-between border-b border-subBlue px-[9px] py-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="grow bg-subBlack placeholder:text-white focus:outline-none"
        />
        <SearchIcon width="14.58" height="14.58" />
      </div>
    </div>
  );
};

export default BoardSearch;
