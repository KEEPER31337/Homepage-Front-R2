import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const OutlinedButton = ({ children, onClick, disabled }: OutlinedButtonProps) => {
  return (
    <Button
      variant="outlined"
      className="!focus:ring-0 !h-fit !rounded-sm !border-pointBlue !py-2 !px-6 !text-small !font-semibold !leading-4 !text-pointBlue"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
