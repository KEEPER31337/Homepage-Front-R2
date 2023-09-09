import React from 'react';
import { StandardTextFieldProps } from '@mui/material';
import FilledButton from '@components/Button/FilledButton';
import StandardInput from './StandardInput';

interface EmailAuthInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  onAuthButtonClick: () => void;
}

const EmailAuthInput = ({
  ref,
  className,
  value,
  onChange,
  inputDisabled,
  buttonDisabled,
  onAuthButtonClick,
  ...standardTextFieldProps
}: EmailAuthInputProps) => {
  return (
    <StandardInput
      ref={ref}
      hasBackground
      className={className}
      required
      disabled={inputDisabled}
      name="email"
      value={value}
      onChange={onChange}
      {...standardTextFieldProps}
      endAdornment={
        <FilledButton small disabled={buttonDisabled} onClick={onAuthButtonClick}>
          인증 요청
        </FilledButton>
      }
    />
  );
};

export default EmailAuthInput;
