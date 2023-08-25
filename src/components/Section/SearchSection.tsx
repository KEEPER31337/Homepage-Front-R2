import React from 'react';
import Selector from '@components/Selector/Selector';
import SearchInput from '@components/Input/SearchInput';
import { SelectChangeEvent } from '@mui/material';

interface SearchSectionProps {
  options: { id: string | number; content: string | number }[];
  selectorValue: string | number;
  setSelectorValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSearchButtonClick: () => void;
}

const SearchSection = ({
  options,
  selectorValue,
  setSelectorValue,
  inputValue,
  setInputValue,
  onSearchButtonClick,
}: SearchSectionProps) => {
  const handleSelectorChange = (event: SelectChangeEvent<unknown>) => {
    setSelectorValue(event.target.value as string);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="flex items-end space-x-2">
      <Selector className="w-32" options={options} value={selectorValue} onChange={handleSelectorChange} />
      <SearchInput
        className="w-80"
        placeholder="검색어를 입력하세요."
        value={inputValue}
        onChange={handleInputChange}
        onSearchButtonClick={onSearchButtonClick}
      />
    </div>
  );
};

export default SearchSection;
