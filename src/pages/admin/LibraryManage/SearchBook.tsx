import React from 'react';
import { Select, Option, Input } from '@material-tailwind/react';

const SearchBook = () => {
  return (
    <div className="flex w-fit space-x-2">
      <Select className="border-pointBlue text-white " variant="standard" value="도서명+저자">
        <Option>도서명+저자</Option>
        <Option>도서명</Option>
        <Option>저자</Option>
      </Select>

      <Input label="검색어를 입력하세요" className="w-64" />
    </div>
  );
};

export default SearchBook;
