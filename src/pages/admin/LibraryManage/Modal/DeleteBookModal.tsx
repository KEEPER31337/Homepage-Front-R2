import React from 'react';
import { ManageBookInfo } from '@api/dto';
import { useDeleteBookMutation } from '@api/libraryManageApi';
import ActionModal from '@components/Modal/ActionModal';

interface DeleteBookModalProps {
  open: boolean;
  onClose: () => void;
  deleteBook: ManageBookInfo;
}

const DeleteBookModal = ({ open, onClose, deleteBook }: DeleteBookModalProps) => {
  const { mutate: deleteBookMutation } = useDeleteBookMutation();

  const handleDeleteBookButtonClick = () => {
    deleteBookMutation(deleteBook.bookId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="도서삭제"
      modalWidth="xs"
      actionButtonName="삭제"
      onActionButonClick={handleDeleteBookButtonClick}
    >
      <span className="text-pointBlue">{deleteBook.title}</span> 총{' '}
      <span className="text-pointBlue">{deleteBook.bookQuantity.split('/')[1]}</span>권을 삭제하시겠습니까?
    </ActionModal>
  );
};

export default DeleteBookModal;
