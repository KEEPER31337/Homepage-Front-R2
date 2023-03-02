import React, { KeyboardEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchInputProps {
  className?: string;
  label?: string;
  inputText: string;
  handleInputText: React.ChangeEventHandler<HTMLInputElement>;
  onActionSearch: () => void;
}
const SearchInput = ({ className, label, inputText, handleInputText, onActionSearch }: SearchInputProps) => {
  const handleOnKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onActionSearch();
    }
  };

  return (
    <TextField
      className={`${className}`}
      label={label}
      value={inputText}
      onChange={handleInputText}
      onKeyPress={handleOnKeyEnterPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MdOutlineSearch className="h-5 w-5 text-pointBlue hover:cursor-pointer" onClick={onActionSearch} />
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
  );
};

export default SearchInput;
