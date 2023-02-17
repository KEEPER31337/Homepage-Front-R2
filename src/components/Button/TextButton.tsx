import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const TextButton = ({ children, onClick, disabled }: TextButtonProps) => {
  return (
    <Button
      variant="text"
      className="rounded-sm py-2 font-base text-pointBlue hover:bg-pointBlue/10 active:bg-pointBlue/30"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
