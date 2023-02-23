import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
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
    <Dialog open={opened} handler={handleOpen} className="rounded-lg bg-subBlack">
      <div className="mt-7 ml-10 mb-2 mr-2">
        <DialogHeader className="text-left font-bold text-pointBlue">
          <Typography variant="h3">{title}</Typography>
        </DialogHeader>
        <DialogBody className="text-left text-base text-white">
          <Typography variant="paragraph">{children}</Typography>
        </DialogBody>
        <DialogFooter className="flex-end items-center gap-5">
          <TextButton onClick={handleOpen}>취소</TextButton>
          <FilledButton onClick={onActionButonClick}>{buttonName}</FilledButton>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ActionModal;
