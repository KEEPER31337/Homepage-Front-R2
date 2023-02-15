import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const FilledButton = ({ children, onClick, disabled }: OutlinedButtonProps) => {
  return (
    <Button
      variant="filled"
      className="font-base rounded-sm bg-pointBlue py-2 text-subBlack hover:opacity-80 hover:shadow-none"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
