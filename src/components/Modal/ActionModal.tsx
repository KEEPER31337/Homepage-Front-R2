import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Typography } from '@material-tailwind/react';
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
    <Dialog open={opened} className="rounded-lg bg-subBlack">
      <div className="mt-5 ml-10 mb-2 mr-10">
        <DialogTitle component="div" className="break-all text-pointBlue">
          <Typography variant="h3">{title}</Typography>
        </DialogTitle>
        <DialogContent className="mb-20 break-all text-white">{children}</DialogContent>
        <DialogActions className="absolute right-1 bottom-1">
          <TextButton onClick={handleOpen}>취소</TextButton>
          <FilledButton onClick={onActionButonClick}>{buttonName}</FilledButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ActionModal;
