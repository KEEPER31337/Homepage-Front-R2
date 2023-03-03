import React from 'react';
import { TextField } from '@mui/material';

interface StandardInputProps {
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const StandardInput = ({
  className,
  label,
  disabled,
  error,
  name,
  helperText,
  value,
  onChange,
}: StandardInputProps) => {
  return (
    <TextField
      variant="standard"
      className={className}
      label={label}
      disabled={disabled}
      error={error}
      helperText={helperText}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default StandardInput;
