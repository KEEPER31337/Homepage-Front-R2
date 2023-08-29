import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const OutlinedButton = ({ children, onClick, disabled, type, small, startIcon, endIcon }: OutlinedButtonProps) => {
  return (
    <Button
      variant="outlined"
      className={`${
        small ? '!text-small' : '!px-6'
      } h-fit !rounded-sm !border-pointBlue !font-semibold disabled:!border-subGray`}
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
