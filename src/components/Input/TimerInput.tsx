import React from 'react';
import { StandardTextFieldProps } from '@mui/material';
import { DateTime } from 'luxon';
import TextTimer from '@components/Typography/TextTimer';
import StandardInput from './StandardInput';

interface TimerInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  expirationTime: DateTime;
}

const TimerInput = ({
  ref,
  expirationTime,
  className,
  value,
  onChange,
  disabled,
  ...standardTextFieldProps
}: TimerInputProps) => {
  return (
    <StandardInput
      ref={ref}
      required
      hasBackground
      className={className}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...standardTextFieldProps}
      endAdornment={!disabled && <TextTimer expirationTime={expirationTime} />}
    />
  );
};

export default TimerInput;
