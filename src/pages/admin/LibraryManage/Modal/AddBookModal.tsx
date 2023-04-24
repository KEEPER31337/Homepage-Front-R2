import React, { useState } from 'react';

import ActionModal from '@components/Modal/ActionModal';
import StandardInput from '@components/Input/StandardInput';
import TotalBookNumberSelector from '@pages/admin/LibraryManage/components/TotalBookNumberSelector';

import { BookListInfo } from '@api/dto';

type AddBookInfo = Pick<BookListInfo, 'title' | 'author'>;

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
}

const AddBookModal = ({ open, onClose }: AddBookModalProps) => {
  const [addBookInfo, setAddBookInfo] = useState<AddBookInfo>({
    title: '',
    author: '',
  });
  const { title, author } = addBookInfo;
  const [totalBookNumber, setTotalBookNumber] = useState<number | undefined>(1);

  const [validTitle, setValidTitle] = useState<boolean>(false);
  const [validAuthor, setValidAuthor] = useState<boolean>(false);

  const handleAddBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddBookInfo({
      ...addBookInfo,
      [name]: value,
    });
  };

  const onReset = () => {
    setAddBookInfo({
      title: '',
      author: '',
    });
    setTotalBookNumber(1);
  };

  const validate = () => {
    setValidTitle(title === '');
    setValidAuthor(author === '');
  };

  const handleAddBookButtonClick = () => {
    validate();
    if (title !== '' && author !== '') {
      // TODO 도서추가 API
      onClose();
      onReset();
    }
  };

  return (
    <div className="flex">
      <ActionModal
        open={open}
        onClose={onClose}
        title="도서추가"
        modalWidth="xs"
        actionButtonName="추가"
        onActionButonClick={handleAddBookButtonClick}
      >
        <div className="flex h-full w-full flex-col space-y-5">
          <div className="flex flex-col">
            도서명
            <StandardInput
              error={validTitle}
              helperText={validTitle && '도서명을 입력해주세요'}
              name="title"
              value={title}
              onChange={handleAddBookInfoChange}
            />
          </div>

          <div className="flex flex-col">
            저자
            <StandardInput
              error={validAuthor}
              helperText={validAuthor && '저자명을 입력해주세요'}
              name="author"
              value={author}
              onChange={handleAddBookInfoChange}
            />
          </div>

          <div className="flex flex-col">
            권수 <TotalBookNumberSelector className="w-fit" value={totalBookNumber} setValue={setTotalBookNumber} />
          </div>
        </div>
      </ActionModal>
    </div>
  );
};

export default AddBookModal;
