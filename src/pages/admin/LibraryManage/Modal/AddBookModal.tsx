import React, { useState } from 'react';

import { Typography } from '@mui/material';
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
  const [totalBookNumber, setTotalBookNumber] = useState<number>(1);

  const [isInvalidTitle, setIsInvalidTitle] = useState<boolean>(false);
  const [isInvalidAuthor, setIsInvalidAuthor] = useState<boolean>(false);

  const handleAddBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddBookInfo({
      ...addBookInfo,
      [name]: value,
    });
  };

  const resetAddBookInfo = () => {
    setAddBookInfo({
      title: '',
      author: '',
    });
    setTotalBookNumber(1);
  };

  const validate = () => {
    setIsInvalidTitle(title === '');
    setIsInvalidAuthor(author === '');
    return title !== '' && author !== '';
  };

  const handleAddBookButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      // TODO 도서추가 API
      onClose();
      resetAddBookInfo();
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="도서추가"
      modalWidth="xs"
      actionButtonName="추가"
      onActionButonClick={handleAddBookButtonClick}
    >
      <div className="space-y-5">
        <div>
          <Typography>도서명</Typography>
          <StandardInput
            error={isInvalidTitle}
            helperText={isInvalidTitle && '도서명을 입력해주세요'}
            name="title"
            value={title}
            onChange={handleAddBookInfoChange}
            className="w-full"
          />
        </div>
        <div>
          <Typography>저자</Typography>
          <StandardInput
            error={isInvalidAuthor}
            helperText={isInvalidAuthor && '저자명을 입력해주세요'}
            name="author"
            value={author}
            onChange={handleAddBookInfoChange}
            className="w-full"
          />
        </div>
        <div>
          <Typography>권수</Typography>
          <TotalBookNumberSelector value={totalBookNumber} setValue={setTotalBookNumber} />
        </div>
      </div>
    </ActionModal>
  );
};

export default AddBookModal;
