import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilledButton from '@components/Button/FilledButton';
import TextButton from '@components/Button/TextButton';

interface ActionModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionButtonName: string;
  onActionButonClick: () => void;
}

const ActionModal = ({ opened, onClose, title, children, actionButtonName, onActionButonClick }: ActionModalProps) => {
  return (
    <Dialog open={opened}>
      <DialogTitle className="text-pointBlue">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <TextButton onClick={onClose}>취소</TextButton>
        <FilledButton onClick={onActionButonClick}>{actionButtonName}</FilledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
