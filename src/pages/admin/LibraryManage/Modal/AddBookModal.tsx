import React, { useState, useReducer } from 'react';

import OutlinedButton from '@components/Button/OutlinedButton';
import ActionModal from '@components/Modal/ActionModal';
import StandardInput from '@components/Input/StandardInput';
import TotalBookNumberSelector from '@pages/admin/LibraryManage/components/TotalBookNumberSelector';

import { BookListInfo } from '@api/dto';

type AddBookInfo = Pick<BookListInfo, 'title' | 'author'>;

const AddBookModal = () => {
  const [form, setForm] = React.useState<AddBookInfo>({
    title: '',
    author: '',
  });
  const [totalBookNumber, setTotalBookNumber] = useState<number | undefined>(1);

  const [open, toggleOpen] = useReducer((prev) => !prev, false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="flex">
      <OutlinedButton onClick={() => toggleOpen()}>도서 추가</OutlinedButton>

      <ActionModal
        opened={open}
        handleOpen={toggleOpen}
        title="도서추가"
        buttonName="추가"
        onActionButonClick={() => {
          toggleOpen();
        }}
      >
        <div className="flex h-full w-full flex-col space-y-2 ">
          <StandardInput name="title" value={form.title} onChange={onChange} label="도서명" />
          <StandardInput name="author" value={form.author} onChange={onChange} label="저자명" />
          <TotalBookNumberSelector value={totalBookNumber} setValue={setTotalBookNumber} />
        </div>
      </ActionModal>
    </div>
  );
};

export default AddBookModal;
