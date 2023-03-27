/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, StandardTextFieldProps } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const StandardInput = ({ value, onChange, error, ...standardTextFieldProps }: StandardInputProps) => {
  return (
    <TextField
      InputProps={error ? undefined : { className: 'before:!border-pointBlue' }}
      value={value}
      onChange={onChange}
      error={error}
      {...standardTextFieldProps}
      variant="standard"
    />
  );
};

export default StandardInput;
