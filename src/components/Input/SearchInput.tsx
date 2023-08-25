/* eslint-disable react/jsx-props-no-spreading */
import React, { KeyboardEvent } from 'react';
import { IconButton, StandardTextFieldProps } from '@mui/material';
import { MdOutlineSearch } from 'react-icons/md';
import StandardInput from './StandardInput';

interface SearchInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearchButtonClick: () => void;
}

const SearchInput = ({ value, onChange, onSearchButtonClick, ...standardTextFieldProps }: SearchInputProps) => {
  const handleOnKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchButtonClick();
    }
  };

  return (
    <StandardInput
      value={value}
      onChange={onChange}
      onKeyDown={handleOnKeyEnterPress}
      endAdornment={
        <IconButton onClick={onSearchButtonClick}>
          <MdOutlineSearch size={20} className="fill-pointBlue" />
        </IconButton>
      }
      {...standardTextFieldProps}
    />
  );
};

export default SearchInput;
