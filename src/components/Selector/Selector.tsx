/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React from 'react';

interface SelectorProps {
  label?: string;
  value?: number;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  options: { id: number; content: string | number }[];
}

const Selector = ({ label, value, onChange, options, className, ...selectProps }: SelectorProps & SelectProps) => {
  return (
    <FormControl className={className} variant="standard">
      <InputLabel>{label}</InputLabel>
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
