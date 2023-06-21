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
      } h-fit !rounded-sm !py-2 !px-6 !font-semibold !leading-4 hover:!bg-pointBlue/10 active:!bg-pointBlue/30`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
