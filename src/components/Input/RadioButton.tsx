import React from 'react';
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';

interface RadioButtonProps extends RadioGroupProps {
  value?: string | number;
  horizontal?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { id: string | number; content: string | number }[];
}

const RadioButton = ({ value, horizontal = false, onChange, options, ...radioGroupProps }: RadioButtonProps) => {
  return (
    <RadioGroup value={value} onChange={onChange} row={horizontal} {...radioGroupProps}>
      {options.map((option) => (
        <FormControlLabel value={option.id} control={<Radio />} label={option.content} />
      ))}
    </RadioGroup>
  );
};

export default RadioButton;
