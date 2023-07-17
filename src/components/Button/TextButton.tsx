import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
}

const TextButton = ({ children, onClick, disabled, type, small }: TextButtonProps) => {
  return (
    <Button
      variant="text"
      className={`${
        small && '!text-small'
      } h-fit !rounded-sm !px-6 !py-2 !font-semibold hover:!bg-pointBlue/10 active:!bg-pointBlue/30 disabled:!text-subGray`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
