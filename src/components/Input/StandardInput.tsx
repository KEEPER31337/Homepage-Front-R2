import React, { forwardRef } from 'react';
import { StandardTextFieldProps, TextField, InputAdornment } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  endAdornment?: React.ReactNode;
  hasBackground?: boolean;
}

const StandardInput = forwardRef(
  (
    { value, onChange, error, endAdornment, hasBackground = false, ...standardTextFieldProps }: StandardInputProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <TextField
        ref={ref}
        InputProps={{
          className: `${error ? '' : 'before:!border-pointBlue'} ${hasBackground ? 'bg-subGray/5 h-12' : ''}`,
          endAdornment: endAdornment && (
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
        sx={hasBackground ? { '.MuiFormLabel-root[data-shrink=false]': { top: 8 } } : undefined}
      />
    );
  },
);

export default StandardInput;
