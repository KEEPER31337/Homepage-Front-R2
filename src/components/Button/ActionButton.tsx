import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { VscAdd, VscEdit, VscTrash } from 'react-icons/vsc';

interface ActionButtonProps {
  mode: 'add' | 'edit' | 'delete';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  small?: boolean;
}

const ActionButton = ({ mode, children, onClick, disabled, type, small }: ActionButtonProps) => {
  return (
    <Button
      variant="outlined"
      className={`${
        small && '!text-small'
      } h-fit !rounded-sm !border-pointBlue !px-6 !py-2 !font-semibold disabled:!border-subGray`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      // eslint-disable-next-line no-nested-ternary
      startIcon={mode === 'add' ? <VscAdd /> : mode === 'edit' ? <VscEdit /> : <VscTrash />}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
