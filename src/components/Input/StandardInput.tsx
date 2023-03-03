import React from 'react';
import { TextField } from '@mui/material';

interface StandardInputProps {
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  name: string;
  inputText: string;
  handleInputText: React.ChangeEventHandler<HTMLInputElement>;
}
const StandardInput = ({
  className,
  label,
  disabled,
  error,
  name,
  helperText,
  inputText,
  handleInputText,
}: StandardInputProps) => {
  return (
    <TextField
      variant="standard"
      className={className}
      label={label}
      disabled={disabled}
      error={error}
      helperText={error && helperText}
      name={name}
      value={inputText}
      onChange={handleInputText}
    />
  );
};

export default StandardInput;
