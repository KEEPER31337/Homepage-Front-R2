import React, { useState } from 'react';

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

interface ActionModalProps {
  title: string;
  contents: string;
  code: string;
  buttonName: string;
  onClick: () => void;
}

const ActionModal = ({ title, contents, code, buttonName, onClick }: ActionModalProps) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);

  return (
    <Dialog open={open} handler={handleOpen} className="rounded-lg bg-[#26262c]">
      <div className="mt-7 ml-10 mb-2 mr-2">
        <DialogHeader className="text-left font-bold text-[#4ceef9]">{title}</DialogHeader>
        <DialogBody className="text-left text-base text-white">
          {contents}
          <div dangerouslySetInnerHTML={{ __html: code }} />
        </DialogBody>
        <DialogFooter className="flex-end items-center gap-5">
          <Button
            variant="text"
            onClick={handleOpen}
            className="flex-shrink-0 flex-grow-0 rounded-sm text-center text-xs font-semibold text-[#4ceef9]"
          >
            취소
          </Button>
          <Button
            variant="outlined"
            onClick={onClick}
            className="flex-shrink-0 flex-grow-0 rounded-sm border-none bg-[#4ceef9] text-center text-xs font-semibold text-[#26262c]"
          >
            {buttonName}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
};

export default ActionModal;
