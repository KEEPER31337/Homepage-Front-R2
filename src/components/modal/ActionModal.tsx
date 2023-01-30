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
    <Dialog open={open} handler={handleOpen} className="rounded-lg bg-[#26262c]">
      <div className="mt-7 ml-10 mb-2 mr-2">
        <DialogHeader className="font-bold text-left text-[#4ceef9]">{title}</DialogHeader>
        <DialogBody className="text-base text-left text-white">
          {contents}
          <div dangerouslySetInnerHTML={{ __html: code }} />
        </DialogBody>
        <DialogFooter className="flex-end items-center gap-5">
          <Button
            variant="text"
            onClick={handleOpen}
            className="rounded-sm flex-grow-0 flex-shrink-0 text-xs font-semibold text-center text-[#4ceef9]"
          >
            <span>취소</span>
          </Button>
          <Button
            variant="outlined"
            onClick={onClick}
            className="rounded-sm flex-grow-0 flex-shrink-0 border-none text-xs font-semibold text-center text-[#26262c] bg-[#4ceef9]"
          >
            <span>{buttonName}</span>
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ActionModal;
