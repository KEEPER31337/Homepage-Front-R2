import React, { useState } from 'react';

import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import FilledButton from '@components/Button/FilledButton';
import { VscChromeClose } from 'react-icons/vsc';

interface ConfirmModalProps {
  opened: boolean;
  handleOpen: () => void;
  title: string;
  children: React.ReactNode;
  showButton: boolean;
}

const ConfirmModal = ({ opened, handleOpen, title, children, showButton }: ConfirmModalProps) => {
  return (
    <Dialog open={opened} handler={handleOpen} className="rounded-lg bg-subBlack">
      <div className="mt-5 ml-10 mb-2 mr-2">
        <div className="mr-5 flex items-center justify-end">
          <VscChromeClose size="19" color="#4CEEF9" onClick={handleOpen} />
        </div>
        <DialogHeader className="text-left font-bold text-pointBlue">{title}</DialogHeader>
        <DialogBody className="mb-6 text-left text-base text-white">{children}</DialogBody>
        <DialogFooter>{showButton && <FilledButton onClick={handleOpen}>확인</FilledButton>}</DialogFooter>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
