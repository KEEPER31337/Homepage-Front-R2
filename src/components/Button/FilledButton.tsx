import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const FilledButton = ({ children, onClick, disabled }: OutlinedButtonProps) => {
  return (
    <Button
      variant="contained"
      className="!h-fit !rounded-sm  !bg-pointBlue !py-2 !px-6 !text-small !font-semibold !leading-4 !text-subBlack hover:!opacity-80 hover:!shadow-none"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
