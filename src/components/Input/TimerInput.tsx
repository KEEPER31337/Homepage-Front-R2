import React, { forwardRef } from 'react';
import { StandardTextFieldProps } from '@mui/material';
import { DateTime } from 'luxon';
import TextTimer from '@components/Typography/TextTimer';
import StandardInput from './StandardInput';

interface TimerInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  expirationTime: DateTime | null;
}

const TimerInput = forwardRef(
  (
    { expirationTime, className, value, onChange, disabled, ...standardTextFieldProps }: TimerInputProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <StandardInput
        ref={ref}
        hasBackground
        className={className}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...standardTextFieldProps}
        endAdornment={!disabled && expirationTime && <TextTimer expirationTime={expirationTime} />}
      />
    );
  },
);

export default TimerInput;
