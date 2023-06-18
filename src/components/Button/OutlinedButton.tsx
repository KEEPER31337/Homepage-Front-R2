import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const OutlinedButton = ({ children, onClick, disabled, type }: OutlinedButtonProps) => {
  return (
    <Button
      variant="outlined"
      className="h-fit !rounded-sm !border-pointBlue !py-2 !px-6 !text-small !font-semibold !leading-4"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
