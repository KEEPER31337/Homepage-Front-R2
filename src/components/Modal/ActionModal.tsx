import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilledButton from '@components/Button/FilledButton';
import TextButton from '@components/Button/TextButton';

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  modalWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  children: React.ReactNode;
  actionButtonName: string;
  onActionButonClick: () => void;
}

const ActionModal = ({
  open,
  onClose,
  modalWidth,
  title,
  children,
  actionButtonName,
  onActionButonClick,
}: ActionModalProps) => {
  return (
    <Dialog open={open} PaperProps={{ className: 'px-2 py-1' }} fullWidth={Boolean(modalWidth)} maxWidth={modalWidth}>
      <DialogTitle className="!font-bold text-pointBlue">{title}</DialogTitle>
      <DialogContent className="min-h-[80px] min-w-[350px]">{children}</DialogContent>
      <DialogActions>
        <TextButton onClick={onClose}>취소</TextButton>
        <FilledButton onClick={onActionButonClick}>{actionButtonName}</FilledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
