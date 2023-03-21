import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  modalWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  children: React.ReactNode;
}

const ConfirmModal = ({ open, onClose, modalWidth, title, children }: ConfirmModalProps) => {
  return (
    <Dialog open={open} PaperProps={{ className: 'px-2 py-1' }} fullWidth={Boolean(modalWidth)} maxWidth={modalWidth}>
      <DialogTitle className="!font-bold text-pointBlue">{title}</DialogTitle>
      <DialogContent className="min-h-[80px] min-w-[350px]">{children}</DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;