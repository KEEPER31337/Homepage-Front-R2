import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilledButton from '@components/Button/FilledButton';
import TextButton from '@components/Button/TextButton';

interface ActionModalProps {
  opened: boolean;
  handleOpen: () => void;
  title: string;
  children: React.ReactNode;
  buttonName: string;
  onActionButonClick: () => void;
}

const ActionModal = ({ opened, handleOpen, title, children, buttonName, onActionButonClick }: ActionModalProps) => {
  return (
    <Dialog open={opened}>
      <DialogTitle className="text-pointBlue">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <TextButton onClick={handleOpen}>취소</TextButton>
        <FilledButton onClick={onActionButonClick}>{buttonName}</FilledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
