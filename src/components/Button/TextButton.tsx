import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

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
      type={type}
      className="h-fit rounded-sm py-2 font-base text-pointBlue hover:bg-pointBlue/10 active:bg-pointBlue/30"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
