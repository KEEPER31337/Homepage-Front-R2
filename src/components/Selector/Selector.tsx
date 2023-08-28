/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React from 'react';

interface SelectorProps extends SelectProps {
  label?: string;
  value?: string | number;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  options: { id: string | number; content: string | number }[];
}

const Selector = ({ label, value, onChange, options, className, ...selectProps }: SelectorProps) => {
  return (
    <FormControl className={className} variant="standard">
      {label && <InputLabel>{label}</InputLabel>}
      <Select className="before:!border-pointBlue" value={value ?? ''} onChange={onChange} {...selectProps}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.content}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
