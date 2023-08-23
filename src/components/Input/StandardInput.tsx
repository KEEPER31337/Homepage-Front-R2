/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { StandardTextFieldProps, TextField } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const StandardInput = forwardRef(
  (
    { value, onChange, error, ...standardTextFieldProps }: StandardInputProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TextField
        ref={ref}
        InputProps={error ? undefined : { className: 'before:!border-pointBlue' }}
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
