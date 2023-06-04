import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const FilledButton = ({ children, onClick, disabled, type }: OutlinedButtonProps) => {
  return (
    <Button
      variant="filled"
      type={type}
      className="h-fit rounded-sm bg-pointBlue py-2 font-base text-subBlack hover:opacity-80 hover:shadow-none"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
