import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilledButton from '@components/Button/FilledButton';
import TextButton from '@components/Button/TextButton';

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  modalWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  children: React.ReactNode;
  actionButtonDisabled?: boolean;
  actionButtonName: string;
  onActionButonClick: () => void;
}

const ActionModal = ({
  open,
  onClose,
  modalWidth,
  title,
  startAdornment,
  endAdornment,
  children,
  actionButtonDisabled = false,
  actionButtonName,
  onActionButonClick,
}: ActionModalProps) => {
  return (
    <Dialog
      open={open}
      PaperProps={{ className: '!bg-subBlack brightness-125 !bg-none px-2 py-1' }}
      fullWidth={Boolean(modalWidth)}
      maxWidth={modalWidth}
    >
      <DialogTitle className="flex items-center gap-x-2 !font-bold text-pointBlue">
        {startAdornment}
        {title}
        {endAdornment}
      </DialogTitle>
      <DialogContent className="min-h-[80px] min-w-[350px]">{children}</DialogContent>
      <DialogActions>
        <TextButton onClick={onClose}>취소</TextButton>
        <FilledButton disabled={actionButtonDisabled} onClick={onActionButonClick}>
          {actionButtonName}
        </FilledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
