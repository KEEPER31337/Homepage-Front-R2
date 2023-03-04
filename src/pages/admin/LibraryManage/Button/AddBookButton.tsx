import React, { useState } from 'react';
import { BookListInfo } from '@api/dto';

import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';

import StandardInput from '@components/Input/StandardInput';

type AddBookInfo = Pick<BookListInfo, 'title' | 'author'>;

const AddBookButton = () => {
  const [addBookModal, setAddBookModal] = useState(false);
  const handleAddBookModal = () => setAddBookModal(!addBookModal);

  const [form, setForm] = React.useState<AddBookInfo>({
    title: '',
    author: '',
  });
  const { title, author } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="flex">
      <OutlinedButton onClick={() => handleAddBookModal()}>도서 추가</OutlinedButton>

      <ActionModal
        opened={addBookModal}
        handleOpen={handleAddBookModal}
        title="도서추가"
        buttonName="추가"
        onActionButonClick={() => {
          console.log(title, author);
        }}
      >
        <div className="flex h-full w-full flex-col space-y-2 ">
          <StandardInput name="title" value={title} onChange={onChange} label="도서명" />
          <StandardInput name="author" value={author} onChange={onChange} label="저자명" />
          {/* <StandardInput name="total" value={total} onChange={onChange} label="권수" /> */}
        </div>
      </ActionModal>
    </div>
  );
};

export default AddBookButton;
