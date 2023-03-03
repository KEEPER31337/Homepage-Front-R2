/* eslint-disable react/jsx-props-no-spreading */
import React, { KeyboardEvent } from 'react';
import { TextField, InputAdornment, StandardTextFieldProps } from '@mui/material';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onActionSearch: () => void;
}
const SearchInput = ({ value, onChange, onActionSearch, ...standardTextFieldProps }: SearchInputProps) => {
  const handleOnKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onActionSearch();
    }
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyPress={handleOnKeyEnterPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <MdOutlineSearch className="h-5 w-5 text-pointBlue hover:cursor-pointer" onClick={onActionSearch} />
          </InputAdornment>
        ),
      }}
      variant="standard"
      {...standardTextFieldProps}
    />
  );
};

export default SearchInput;
