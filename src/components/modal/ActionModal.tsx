import React, { useState } from 'react';

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

interface ModalProps {
  title: string;
  contents: string;
  actionName: string;
}

/* 
  interface ModalProps {
    title: string;
    contents: string;
    actionName: string;
    children: undefined | React.ReactNode;
  }

  const ActionModal = (props: ModalProps) => {
  const { title, contents, actionName, children } = props; */

const ActionModal = ({ title, contents, actionName }: ModalProps) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{contents}</DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleOpen}>
          <span>취소</span>
        </Button>
        <Button variant="gradient" onClick={handleOpen}>
          <span>{actionName}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ActionModal;
