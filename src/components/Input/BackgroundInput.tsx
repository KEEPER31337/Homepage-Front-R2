/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, StandardTextFieldProps } from '@mui/material';

interface BackgroundInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const BackgroundInput = ({ value, onChange, error, ...standardTextFieldProps }: BackgroundInputProps) => {
  return (
    <TextField
      InputProps={{
        className: `${!error && 'before:!border-pointBlue bg-pointBlue/5'} h-12`,
      }}
      value={value}
      onChange={onChange}
      error={error}
      {...standardTextFieldProps}
      variant="standard"
      sx={{ '.MuiFormLabel-root[data-shrink=false]': { top: 8 } }}
    />
  );
};

export default BackgroundInput;
