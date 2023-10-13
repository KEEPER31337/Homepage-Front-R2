import React, { useState, useEffect } from 'react';
import { Typography, Tooltip } from '@mui/material';
import { ManageBookInfo } from '@api/dto';
import { useAddBookMutation, useEditBookInfoMutation, useEditBookThumbnailMutation } from '@api/libraryManageApi';
import StandardInput from '@components/Input/StandardInput';
import ActionModal from '@components/Modal/ActionModal';
import ImageUploader from '@components/Uploader/ImageUploader';
import TotalBookNumberSelector from '../Selector/TotalBookNumberSelector';

interface SelectorProps {
  open: boolean;
  onClose: () => void;
  bookDetail?: ManageBookInfo;
}

const UploadBookModal = ({ open, onClose, bookDetail }: SelectorProps) => {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
  });
  const { title, author } = bookInfo;
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidAuthor, setIsInvalidAuthor] = useState(false);

  const [titleHelperText, setTitleHelperText] = useState('');
  const [authorHelperText, setAuthorHelperText] = useState('');

  const { mutate: addBookMutation } = useAddBookMutation();
  const { mutate: editBookInfo } = useEditBookInfoMutation();
  const { mutate: editBookThumbnail } = useEditBookThumbnailMutation();

  const validate = () => {
    const titleTrim = title.trim();
    const authorTrim = author.trim();

    if (titleTrim === '') {
      setTitleHelperText('도서명을 입력해주세요');
      setIsInvalidTitle(true);
    }
    if (authorTrim === '') {
      setAuthorHelperText('저자명을 입력해주세요');
      setIsInvalidAuthor(true);
    }
    if (titleTrim.length > 30) {
      setTitleHelperText('도서명은 200자 이내여야 합니다.');
      setIsInvalidTitle(true);
    }
    if (authorTrim.length > 20) {
      setAuthorHelperText('저자명은 30자 이내여야 합니다.');
      setIsInvalidAuthor(true);
    }

    return titleTrim !== '' && authorTrim !== '' && titleTrim.length <= 200 && authorTrim.length <= 30;
  };

  const resetBookInfo = () => {
    setBookInfo({
      title: '',
      author: '',
    });
    setTotalQuantity(1);
  };

  const handleBookInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const handleAddBookButtonClick = () => {
    const isValid = validate();
    if (isValid) {
      addBookMutation(
        { bookCoreData: { title, author, bookDepartment: 'ETC', totalQuantity }, thumbnail },
        {
          onSuccess: () => {
            onClose();
            resetBookInfo();
          },
        },
      );
    }
  };
  const handleEditBookButtonClick = () => {
    const isValid = validate();
    if (isValid && bookDetail?.bookId) {
      editBookInfo(
        { bookCoreData: { title, author, totalQuantity, bookDepartment: 'ETC' }, bookId: bookDetail.bookId },
        {
          onSuccess: () => {
            if (isThumbnailChanged) {
              editBookThumbnail({ bookId: bookDetail.bookId, thumbnail });
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
      title={`도서 ${bookDetail ? '수정' : '추가'}`}
      actionButtonName={bookDetail ? '수정' : '추가'}
      onActionButonClick={bookDetail ? handleEditBookButtonClick : handleAddBookButtonClick}
    >
      <div className="flex space-x-6">
        <div className="space-y-5">
          <div>
            <Typography>도서명</Typography>
            <StandardInput
              error={isInvalidTitle}
              helperText={titleHelperText}
              name="title"
              value={title}
              onChange={handleBookInfoChange}
            />
          </div>
          <div>
            <Typography>저자</Typography>
            <StandardInput
              error={isInvalidAuthor}
              helperText={authorHelperText}
              name="author"
              value={author}
              onChange={handleBookInfoChange}
            />
          </div>
          <div className="relative">
            <div>
              <Typography>권수</Typography>
              <TotalBookNumberSelector value={totalQuantity} setValue={setTotalQuantity} />
            </div>
            <div className="absolute bottom-0 right-0">
              {bookDetail && (
                <Tooltip
                  title={`대출 현황 ${bookDetail.currentQuantity}/${bookDetail.totalQuantity}`}
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
              )}
            </div>
          </div>
        </div>
        <div className="h-[210px] w-[128px]">
          <ImageUploader
            isEditMode
            setThumbnail={setThumbnail}
            thumbnailPath={bookDetail && bookDetail.thumbnailPath}
            setIsThumbnailChanged={setIsThumbnailChanged}
          />
        </div>
      </div>
    </ActionModal>
  );
};

export default UploadBookModal;
