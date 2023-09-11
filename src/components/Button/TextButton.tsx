import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
  className?: string;
}

const TextButton = ({ children, onClick, disabled, type, small, className }: TextButtonProps) => {
  return (
    <Button
      variant="text"
      className={`${
        small ? '!text-small' : '!px-6'
      } h-fit !rounded-sm !font-semibold hover:!bg-pointBlue/10 active:!bg-pointBlue/30 disabled:!text-subGray ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
