import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface TextButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const TextButton = ({ children, onClick, disabled }: TextButtonProps) => {
  return (
    <Button
      variant="text"
      className="!h-fit !rounded-sm !py-2 !px-6 !text-small !font-semibold !leading-4 !text-pointBlue hover:!bg-pointBlue/10 active:!bg-pointBlue/30"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default TextButton;
