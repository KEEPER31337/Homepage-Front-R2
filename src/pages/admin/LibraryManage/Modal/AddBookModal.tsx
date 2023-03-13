import React, { useState } from 'react';

import ActionModal from '@components/Modal/ActionModal';
import StandardInput from '@components/Input/StandardInput';
import TotalBookNumberSelector from '@pages/admin/LibraryManage/components/TotalBookNumberSelector';

import { BookListInfo } from '@api/dto';

type AddBookInfo = Pick<BookListInfo, 'title' | 'author'>;

interface AddBookModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const AddBookModal = ({ open, toggleOpen }: AddBookModalProps) => {
  const [form, setForm] = React.useState<AddBookInfo>({
    title: '',
    author: '',
  });
  const { title, author } = form;
  const [totalBookNumber, setTotalBookNumber] = useState<number | undefined>(1);
  const [validTitle, setValidTitle] = useState<boolean>(false);
  const [validAuthor, setValidAuthor] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    setValidTitle(title === '');
    setValidAuthor(author === '');
  };

  const AddBookAPI = () => {
    validate();
    if (title !== '' && author !== '') {
      // TODO 도서추가 API
      toggleOpen();
    }
  };

  return (
    <div className="flex">
      <ActionModal
        opened={open}
        handleOpen={toggleOpen}
        title="도서추가"
        buttonName="추가"
        onActionButonClick={() => {
          AddBookAPI();
        }}
      >
        <div className="flex h-full w-full flex-col space-y-2 ">
          <StandardInput
            label="도서명"
            error={validTitle}
            helperText={validTitle && '도서명을 입력해주세요'}
            name="title"
            value={title}
            onChange={onChange}
          />
          <StandardInput
            error={validAuthor}
            helperText={validAuthor && '저자명을 입력해주세요'}
            name="author"
            value={author}
            onChange={onChange}
            label="저자명"
          />
          <TotalBookNumberSelector value={totalBookNumber} setValue={setTotalBookNumber} />
        </div>
      </ActionModal>
    </div>
  );
};

export default AddBookModal;
