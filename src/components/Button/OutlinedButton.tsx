import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const OutlinedButton = ({ children, onClick, disabled, type, startIcon, endIcon }: OutlinedButtonProps) => {
  return (
    <Button
      variant="outlined"
      className="h-fit !rounded-sm !border-pointBlue !py-2 !px-6 !text-small !font-semibold !leading-4"
      type={type}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
