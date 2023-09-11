import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
  className?: string;
}

const FilledButton = ({ children, onClick, disabled, type, small, className }: OutlinedButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`${
        small ? '!text-small' : '!px-6'
      } h-fit !rounded-sm !font-semibold !text-subBlack hover:!opacity-80 hover:!shadow-none disabled:!bg-subGray ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
