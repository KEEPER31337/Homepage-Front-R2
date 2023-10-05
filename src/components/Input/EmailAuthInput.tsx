import React, { forwardRef } from 'react';
import { CircularProgress, StandardTextFieldProps } from '@mui/material';
import { VscCheck } from 'react-icons/vsc';
import FilledButton from '@components/Button/FilledButton';
import StandardInput from './StandardInput';

interface EmailAuthInputProps extends StandardTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isLoading?: boolean;
  isSuccess?: boolean;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  onAuthButtonClick: () => void;
}

const EmailAuthInput = forwardRef(
  (
    {
      className,
      value,
      onChange,
      isLoading,
      isSuccess,
      inputDisabled,
      buttonDisabled,
      onAuthButtonClick,
      ...standardTextFieldProps
    }: EmailAuthInputProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const renderEndAdornment = () => {
      if (isLoading) {
        return <CircularProgress size={24} />;
      }
      if (isSuccess) {
        return <VscCheck size={24} className="fill-pointBlue" />;
      }
      return (
        <FilledButton small disabled={buttonDisabled} onClick={onAuthButtonClick}>
          인증 요청
        </FilledButton>
      );
    };

    return (
      <StandardInput
        ref={ref}
        hasBackground
        className={className}
        disabled={inputDisabled}
        name="email"
        value={value}
        onChange={onChange}
        {...standardTextFieldProps}
        endAdornment={renderEndAdornment()}
      />
    );
  },
);

export default EmailAuthInput;
