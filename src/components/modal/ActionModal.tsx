import React, { useState } from 'react';

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

interface ModalProps {
  title: string;
  contents: string;
  code: string;
  buttonName: string;
  onClick: () => void;
}

const ActionModal = ({ title, contents, code, buttonName, onClick }: ModalProps) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{contents}</DialogBody>
      <div dangerouslySetInnerHTML={{ __html: code }} />
      <DialogFooter>
        <Button variant="text" onClick={handleOpen}>
          <span>취소</span>
        </Button>
        <Button variant="gradient" onClick={onClick}>
          <span>{buttonName}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ActionModal;
