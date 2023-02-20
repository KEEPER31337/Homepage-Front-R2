import React from 'react';
import { MdOutlineSearch, MdOutlineArrowDropDown } from 'react-icons/md';

const SearchSection = () => {
  return (
    <div className="flex basis-3/5  gap-4">
      <div className="flex basis-1/6  items-center justify-between border-b border-pointBlue px-1 py-2">
        <span>제목 + 내용</span>
        <MdOutlineArrowDropDown />
      </div>
      <div className="flex basis-5/6  items-center justify-between border-b border-pointBlue px-[9px] py-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="grow bg-subBlack placeholder:text-white focus:outline-none"
        />
        <MdOutlineSearch size="20" color="#4CEEF9" />
      </div>
    </div>
  );
};

export default SearchSection;
