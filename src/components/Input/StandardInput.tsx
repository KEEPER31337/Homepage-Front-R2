/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, InputProps } from '@mui/material';

interface StandardInputProps extends InputProps {
  label?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

const StandardInput = ({
  label,
  value,
  onChange,
  error,
  helperText,
  className,
  ...standardTextFieldProps
}: StandardInputProps) => {
  return (
    <FormControl className={className} variant="standard">
      <InputLabel>{label}</InputLabel>
      <Input
        className={error ? '' : 'before:!border-b-pointBlue'}
        value={value}
        onChange={onChange}
        error={error}
        {...standardTextFieldProps}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default StandardInput;
