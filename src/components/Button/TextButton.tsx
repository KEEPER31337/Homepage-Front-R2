import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const TextButton = ({ children, onClick, disabled, type }: TextButtonProps) => {
  return (
    <Button
      variant="text"
      className="!rounded-sm !py-2 !px-6 !text-small !font-semibold !leading-4 hover:!bg-pointBlue/10 active:!bg-pointBlue/30"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
