import React, { useState } from 'react';
import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';

const DeleteBookButton = () => {
  const [deleteBookModal, setDeleteBookModal] = useState(false);
  const handleDeleteBookModal = () => setDeleteBookModal(!deleteBookModal);

  return (
    <div className="flex">
      <OutlinedButton onClick={() => handleDeleteBookModal()}>도서 삭제</OutlinedButton>

      <ActionModal
        opened={deleteBookModal}
        handleOpen={handleDeleteBookModal}
        title="도서삭제"
        buttonName="삭제"
        onActionButonClick={() => {
          console.log('도서 삭제 api');
        }}
      >
        N권의 도서를 삭제하시겠습니까?
      </ActionModal>
    </div>
  );
};

export default DeleteBookButton;
