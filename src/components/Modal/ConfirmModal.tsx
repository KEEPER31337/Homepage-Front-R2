import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { VscChromeClose } from 'react-icons/vsc';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  modalWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  children: React.ReactNode;
}

const ConfirmModal = ({ open, onClose, modalWidth, title, children }: ConfirmModalProps) => {
  return (
    <Dialog
      open={open}
      PaperProps={{ className: '!bg-subBlack brightness-125 !bg-none px-2 py-1' }}
      fullWidth={Boolean(modalWidth)}
      maxWidth={modalWidth}
    >
      <IconButton className="!absolute right-3 top-3" onClick={onClose}>
        <VscChromeClose className="fill-pointBlue" size={28} />
      </IconButton>
      <DialogTitle className="!font-bold text-pointBlue">{title}</DialogTitle>
      <DialogContent className="sm:min-h-[80px] sm:min-w-[350px]">{children}</DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
