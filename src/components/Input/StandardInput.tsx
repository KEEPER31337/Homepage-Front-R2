/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { StandardTextFieldProps, TextField, InputAdornment } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  endAdornment?: React.ReactNode;
}

const StandardInput = forwardRef(
  (
    { value, onChange, error, endAdornment, ...standardTextFieldProps }: StandardInputProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TextField
        ref={ref}
        InputProps={
          error
            ? undefined
            : {
                className: 'before:!border-pointBlue',
                endAdornment: (
                  <InputAdornment position="end" sx={{ p: 1 }}>
                    {endAdornment}
                  </InputAdornment>
                ),
              }
        }
        value={value}
        onChange={onChange}
        error={error}
        {...standardTextFieldProps}
        variant="standard"
      />
    );
  },
);

export default StandardInput;
