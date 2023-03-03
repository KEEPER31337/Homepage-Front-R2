import React, { ReactNode } from 'react';
import { Button } from '@material-tailwind/react';

interface SeminarButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
const SeminarButton = ({ children, onClick, disabled }: SeminarButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="font-small mx-auto mb-[19px] block flex h-[34px] w-[71px] items-center whitespace-nowrap bg-pointBlue text-mainBlack"
    >
      {children}
    </Button>
  );
};
export default SeminarButton;
