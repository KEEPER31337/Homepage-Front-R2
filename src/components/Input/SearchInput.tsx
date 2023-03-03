/* eslint-disable react/jsx-props-no-spreading */
import React, { KeyboardEvent } from 'react';
import { TextField, InputAdornment, StandardTextFieldProps, IconButton } from '@mui/material';
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
            <IconButton onClick={onActionSearch}>
              <MdOutlineSearch size={20} className="fill-pointBlue" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="standard"
      {...standardTextFieldProps}
    />
  );
};

export default SearchInput;
