import React, { useState, useEffect } from 'react';
import { Typography, Tooltip } from '@mui/material';
import { useGetBookDetailQuery, useEditBookInfoMutation, useEditBookThumbnailMutation } from '@api/libraryManageApi';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';
import TotalBookNumberSelector from '../Selector/TotalBookNumberSelector';

interface SelectorProps {
  open: boolean;
  onClose: () => void;
  editBookId: number;
}

const EditBookModal = ({ open, onClose, editBookId }: SelectorProps) => {
  const { data: bookDetail, isSuccess } = useGetBookDetailQuery(editBookId);
  const { mutate: editBookInfo } = useEditBookInfoMutation();
  const { mutate: editBookThumbnail } = useEditBookThumbnailMutation();

  const [bookInfo, setBookInfo] = React.useState({
    title: '',
    author: '',
  });
  const { title, author } = bookInfo;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const bookDepartment = 'ETC'; // 추후 삭제
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);

  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidAuthor, setIsInvalidAuthor] = useState(false);

  const validate = () => {
    setIsInvalidTitle(title === '');
    setIsInvalidAuthor(author === '');
    return title !== '' && author !== '';
  };

  const handleEditBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const handleEditBookButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      editBookInfo(
        { bookCoreData: { title, author, totalQuantity, bookDepartment }, bookId: editBookId },
        {
          onSuccess: () => {
            if (thumbnail) {
              editBookThumbnail({ bookId: editBookId, thumbnail });
            }
            onClose();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (bookDetail) {
      setBookInfo({
        title: bookDetail.title,
        author: bookDetail.author,
      });
      setTotalQuantity(bookDetail.totalQuantity);
    }
  }, [bookDetail]);

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
            />
          </div>
          <div className="relative">
            <div>
              <Typography>권수</Typography>
              <TotalBookNumberSelector value={totalQuantity} setValue={setTotalQuantity} />
            </div>
            <div className="absolute bottom-0 right-0">
              <Tooltip
                title={`대출 현황 ${bookDetail?.currentQuantity}/${bookDetail?.totalQuantity}`}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'rgba(76, 238, 249, 0.15)',
                      fontSize: '14px',
                    },
                  },
                }}
                placement="top"
              >
                <Typography className="text-pointBlue">도서 현황</Typography>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="h-[210px] w-[128px]">
          {isSuccess && <ImageUploader isEdit setThumbnail={setThumbnail} thumbnailPath={bookDetail?.thumbnailPath} />}
        </div>
      </div>
    </ActionModal>
  );
};

export default EditBookModal;
