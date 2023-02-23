import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
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
    <Dialog open={opened} handler={handleOpen} className="rounded-lg bg-[#26262c]">
      <div className="mt-7 ml-10 mb-2 mr-2">
        <DialogHeader className="text-left font-bold text-[#4ceef9]">{title}</DialogHeader>
        <DialogBody className="text-left text-base text-white">{children}</DialogBody>
        <DialogFooter className="flex-end items-center gap-5">
          <TextButton onClick={handleOpen}>취소</TextButton>
          <FilledButton onClick={onActionButonClick}>{buttonName}</FilledButton>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ActionModal;
