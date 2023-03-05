/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, StandardTextFieldProps } from '@mui/material';

interface StandardInputProps extends StandardTextFieldProps {
  name?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const StandardInput = ({ name, value, onChange, ...standardTextFieldProps }: StandardInputProps) => {
  return <TextField name={name} value={value} onChange={onChange} {...standardTextFieldProps} variant="standard" />;
};

export default StandardInput;
