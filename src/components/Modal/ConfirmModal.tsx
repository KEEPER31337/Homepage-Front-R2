import React from 'react';

import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
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
      <div className="mt-5 ml-10 mb-2 mr-10">
        <div className="absolute right-0 mr-5">
          <VscChromeClose size="19" color="#4CEEF9" onClick={handleOpen} />
        </div>
        <DialogHeader className="break-all font-bold text-pointBlue">
          <Typography variant="h3">{title}</Typography>
        </DialogHeader>
        <DialogBody className="mb-20 break-all text-white">
          <Typography variant="paragraph">{children}</Typography>
        </DialogBody>
        <DialogFooter className="absolute right-1 bottom-1">
          {showButton && <FilledButton onClick={handleOpen}>확인</FilledButton>}
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
