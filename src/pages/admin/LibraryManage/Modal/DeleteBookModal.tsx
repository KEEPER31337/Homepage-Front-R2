import React from 'react';
import ActionModal from '@components/Modal/ActionModal';

interface DeleteBookModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const DeleteBookModal = ({ open, toggleOpen }: DeleteBookModalProps) => {
  return (
    <div className="flex">
      <ActionModal
        opened={open}
        handleOpen={toggleOpen}
        title="도서삭제"
        buttonName="삭제"
        onActionButonClick={() => {
          toggleOpen();
        }}
      >
        N권의 도서를 삭제하시겠습니까?
      </ActionModal>
    </div>
  );
};

export default DeleteBookModal;
