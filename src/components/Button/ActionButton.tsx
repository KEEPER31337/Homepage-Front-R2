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
  const setIcon = {
    add: <VscAdd size={small ? 15 : 24} />,
    edit: <VscEdit size={small ? 15 : 24} />,
    delete: <VscTrash size={small ? 15 : 24} />,
  };
  return (
    <Button
      variant="outlined"
      className={`${
        small ? '!text-small' : '!px-6'
      } h-fit !rounded-sm !border-pointBlue !font-semibold disabled:!border-subGray`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      startIcon={setIcon[mode]}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
