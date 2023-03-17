/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, StandardTextFieldProps } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const StandardInput = ({ value, onChange, ...standardTextFieldProps }: StandardInputProps) => {
  return (
    <TextField
      sx={{
        '& .MuiInput-underline:before': {
          borderBottomColor: '#4CEEF9 !important',
        },
      }}
      value={value}
      onChange={onChange}
      {...standardTextFieldProps}
      variant="standard"
    />
  );
};

export default StandardInput;
