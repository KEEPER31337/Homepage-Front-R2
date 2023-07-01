import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
}

const FilledButton = ({ children, onClick, disabled, type, small }: OutlinedButtonProps) => {
  return (
    <Button
      variant="contained"
      className={`${
        small && '!text-small'
      } "h-fit !rounded-sm !py-2 !px-6 !font-semibold !text-subBlack hover:!opacity-80 hover:!shadow-none`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default FilledButton;
