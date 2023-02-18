import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const OutlinedButton = ({ children, onClick, disabled }: OutlinedButtonProps) => {
  return (
    <Button
      variant="outlined"
      className="rounded-sm border-pointBlue py-2 font-base text-pointBlue focus:ring-0"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
