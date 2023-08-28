import React, { useState } from 'react';
import { Typography } from '@mui/material';
import ActionModal from '@components/Modal/ActionModal';
import StandardInput from '@components/Input/StandardInput';
import TotalBookNumberSelector from '@pages/admin/LibraryManage/Selector/TotalBookNumberSelector';
import { useAddBookMutation } from '@api/libraryManageApi';
import ImageUploader from '@components/Uploader/ImageUploader';

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
}

const AddBookModal = ({ open, onClose }: AddBookModalProps) => {
  const [addBookInfo, setAddBookInfo] = useState({
    title: '',
    author: '',
  });
  const { title, author } = addBookInfo;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);

  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidAuthor, setIsInvalidAuthor] = useState(false);

  const { mutate: addBookMutation } = useAddBookMutation();

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
    setTotalQuantity(1);
  };

  const validate = () => {
    setIsInvalidTitle(title === '');
    setIsInvalidAuthor(author === '');
    return title !== '' && author !== '';
  };

  const handleAddBookButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      addBookMutation(
        { bookCoreData: { title, author, bookDepartment: 'ETC', totalQuantity }, thumbnail },
        {
          onSuccess: () => {
            onClose();
            resetAddBookInfo();
          },
        },
      );
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
      <div className="flex space-x-6">
        <div className="relative grow space-y-5">
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
            <TotalBookNumberSelector value={totalQuantity} setValue={setTotalQuantity} />
          </div>
        </div>
        <div className="h-[210px] w-[128px]">
          <ImageUploader isEdit={false} setThumbnail={setThumbnail} />
        </div>
      </div>
    </ActionModal>
  );
};

export default AddBookModal;
