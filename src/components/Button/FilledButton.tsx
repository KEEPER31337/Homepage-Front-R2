import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const FilledButton = ({ children, onClick, disabled, type }: OutlinedButtonProps) => {
  return (
    <Button
      variant="contained"
      className="!rounded-sm !py-2 !px-6 !text-small !font-semibold !leading-4 !text-subBlack hover:!opacity-80 hover:!shadow-none"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
