import React from 'react';
import { TextField } from '@mui/material';

interface StandardInputProps {
  className?: string;
  label?: string;
  disabled?: boolean;
  isVaild?: boolean;
  vaildText?: string;
  inputText: string;
  handleInputText: React.ChangeEventHandler<HTMLInputElement>;
}
const StandardInput = ({
  className,
  label,
  disabled,
  isVaild,
  vaildText,
  inputText,
  handleInputText,
}: StandardInputProps) => {
  return (
    <TextField
      variant="standard"
      className={className}
      label={label}
      disabled={disabled}
      error={isVaild}
      helperText={isVaild && vaildText}
      value={inputText}
      onChange={handleInputText}
    />
  );
};

export default StandardInput;
