/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { InputAdornment, StandardTextFieldProps, TextField } from '@mui/material';

interface BackgroundInputProps extends StandardTextFieldProps {
  value: string;
  endAdornment?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const BackgroundInput = forwardRef(
  (
    { value, onChange, error, endAdornment, ...standardTextFieldProps }: BackgroundInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TextField
        ref={ref}
        InputProps={{
          className: `${!error && 'before:!border-pointBlue bg-pointBlue/5'} h-12`,
          endAdornment: (
            <InputAdornment position="end" sx={{ p: 1 }}>
              {endAdornment}
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={onChange}
        error={error}
        {...standardTextFieldProps}
        variant="standard"
        sx={{ '.MuiFormLabel-root[data-shrink=false]': { top: 8 } }}
      />
    );
  },
);

export default BackgroundInput;
