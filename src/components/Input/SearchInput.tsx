import React, { KeyboardEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchInputProps {
  className?: string;
  label?: string;
  inputText: React.RefObject<HTMLInputElement>;
  onActionSearch: () => void;
}
const SearchInput = ({ className, label, inputText, onActionSearch }: SearchInputProps) => {
  const handleOnKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onActionSearch();
    }
  };

  return (
    <TextField
      className={`${className}`}
      label={label}
      inputRef={inputText}
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
