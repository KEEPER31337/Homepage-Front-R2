import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import ActionModal from '@components/Modal/ActionModal';
import { useGetBookDetailQuery } from '@api/libraryManageApi';
import StandardInput from '@components/Input/StandardInput';
import ImageUploader from '@components/Uploader/ImageUploader';
import { useEditBookInfoMutation } from '@api/libraryManageApi';
import TotalBookNumberSelector from '../Selector/TotalBookNumberSelector';

interface SelectorProps {
  open: boolean;
  onClose: () => void;
  editBookId: number;
}

const EditBookModal = ({ open, onClose, editBookId }: SelectorProps) => {
  const [bookInfo, setBookInfo] = React.useState({
    title: '',
    author: '',
  });
  const { title, author } = bookInfo;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const bookDepartment = 'ETC';
  const [thumbnailPath, setThumbnailPath] = useState('');
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);

  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidAuthor, setIsInvalidAuthor] = useState(false);

  const handleEditBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const { data: bookDetail } = useGetBookDetailQuery(editBookId);
  const { mutate: editBookInfo } = useEditBookInfoMutation();

  useEffect(() => {
    if (bookDetail) {
      setBookInfo({
        title: bookDetail.title,
        author: bookDetail.author,
      });
      setTotalQuantity(bookDetail.totalQuantity);
      setThumbnailPath(bookDetail.thumbnailPath);
    }
  }, [bookDetail]);

  const validate = () => {
    setIsInvalidTitle(title === '');
    setIsInvalidAuthor(author === '');
    return title !== '' && author !== '';
  };

  const handleEditBookButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      editBookInfo(
        { bookCoreData: { title, author, totalQuantity, bookDepartment }, bookId: editBookId },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title="도서 수정"
      actionButtonName="수정"
      onActionButonClick={handleEditBookButtonClick}
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
              onChange={handleEditBookInfoChange}
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
              onChange={handleEditBookInfoChange}
              className="w-full"
            />
          </div>
          <div>
            <Typography>권수</Typography>
            <TotalBookNumberSelector value={totalQuantity} setValue={setTotalQuantity} />
          </div>
        </div>
        <div className="h-[210px] w-[128px]">
          <ImageUploader isEdit setThumbnail={setThumbnail} thumbnailPath={thumbnailPath} />
        </div>
      </div>
    </ActionModal>
  );
};

export default EditBookModal;
