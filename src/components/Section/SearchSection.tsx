import React from 'react';
import Selector from '@components/Selector/Selector';
import SearchInput from '@components/Input/SearchInput';
import { SelectChangeEvent } from '@mui/material';

interface SearchSectionProps {
  options: { id: string | number; content: string | number }[];
  selectorValue: string | number;
  onChangeSelector: (event: SelectChangeEvent<unknown>) => void;

  placeholder?: string;
  inputValue: string;
  onchangeInput: React.ChangeEventHandler<HTMLInputElement>;
  onSearchButtonClick: () => void;
}

const SearchSection = ({
  options,
  selectorValue,
  onChangeSelector,

  placeholder,
  inputValue,
  onchangeInput,
  onSearchButtonClick,
}: SearchSectionProps) => {
  return (
    <div className="flex items-end space-x-2">
      <Selector className="w-32" options={options} value={selectorValue} onChange={onChangeSelector} />
      <SearchInput
        placeholder={placeholder}
        className="w-80"
        value={inputValue}
        onChange={onchangeInput}
        onSearchButtonClick={onSearchButtonClick}
      />
    </div>
  );
};

export default SearchSection;
