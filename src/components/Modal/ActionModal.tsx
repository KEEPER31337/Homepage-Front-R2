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
  onActionEnterKeyUp?: () => void;
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
  onActionEnterKeyUp,
}: ActionModalProps) => {
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onActionEnterKeyUp) return;

    if (e.key === 'Enter') {
      onActionEnterKeyUp();
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{ className: '!bg-subBlack brightness-125 !bg-none px-2 py-1' }}
      fullWidth={Boolean(modalWidth)}
      maxWidth={modalWidth}
      onKeyUp={onKeyUp}
    >
      <DialogTitle className="flex items-center gap-x-2 !font-bold text-pointBlue">
        {startAdornment}
        {title}
        {endAdornment}
      </DialogTitle>
      <DialogContent className="sm:min-h-[80px] sm:min-w-[350px]">{children}</DialogContent>
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
