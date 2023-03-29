import React from 'react';
import ActionModal from '@components/Modal/ActionModal';

interface DeleteBookModalProps {
  open: boolean;
  onClose: () => void;
}

const DeleteBookModal = ({ open, onClose }: DeleteBookModalProps) => {
  return (
    <div className="flex">
      <ActionModal
        open={open}
        onClose={onClose}
        title="도서삭제"
        modalWidth="xs"
        actionButtonName="삭제"
        onActionButonClick={() => {
          onClose();
        }}
      >
        N권의 도서를 삭제하시겠습니까?
      </ActionModal>
    </div>
  );
};

export default DeleteBookModal;
