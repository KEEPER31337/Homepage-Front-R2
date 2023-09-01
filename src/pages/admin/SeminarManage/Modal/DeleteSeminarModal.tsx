import React from 'react';
import ActionModal from '@components/Modal/ActionModal';
import Selector from '@components/Selector/Selector';

interface DeleteSeminarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteSeminarModal = ({ open, setOpen }: DeleteSeminarModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSeminarButtonClick = () => {
    // TODO
  };

  return (
    <ActionModal
      open={open}
      onClose={handleClose}
      title="세미나 일정 삭제"
      actionButtonName="삭제"
      onActionButonClick={handleDeleteSeminarButtonClick}
    >
      <div className="flex justify-center">
        <Selector
          label="세미나"
          className="w-52"
          options={[]}
          onChange={() => {
            // TODO
          }}
        />
      </div>
    </ActionModal>
  );
};

export default DeleteSeminarModal;
