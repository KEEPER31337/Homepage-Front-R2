import React, { useState } from 'react';
import { Input } from '@material-tailwind/react';

import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';

const AddBookButton = () => {
  const [addBookModal, setAddBookModal] = useState(false);
  const handleAddBookModal = () => setAddBookModal(!addBookModal);

  return (
    <div className="flex">
      <OutlinedButton onClick={() => handleAddBookModal()}>도서 추가</OutlinedButton>

      <ActionModal
        opened={addBookModal}
        handleOpen={handleAddBookModal}
        title="도서추가"
        buttonName="추가"
        onActionButonClick={() => {
          console.log('도서 추가 api');
        }}
      >
        <div className="flex h-fit w-full flex-row space-x-2 ">
          <Input label="도서명" className="flex w-64" />
          <Input label="저자명" className="flex w-64" />
          <Input label="권수" className="flex w-14" />
        </div>
      </ActionModal>
    </div>
  );
};

export default AddBookButton;
