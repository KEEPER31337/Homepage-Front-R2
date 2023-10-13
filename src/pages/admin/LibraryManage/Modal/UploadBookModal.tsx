import React, { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Typography, Tooltip, Stack } from '@mui/material';
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
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur' });

  const [totalQuantity, setTotalQuantity] = useState(1);
  const [thumbnail, setThumbnail] = useState<Blob | null>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);

  const { mutate: addBookMutation } = useAddBookMutation();
  const { mutate: editBookInfo } = useEditBookInfoMutation();
  const { mutate: editBookThumbnail } = useEditBookThumbnailMutation();

  const handleAddBookButtonClick: SubmitHandler<FieldValues> = ({ title, author }) => {
    addBookMutation(
      { bookCoreData: { title, author, bookDepartment: 'ETC', totalQuantity }, thumbnail },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      },
    );
  };

  const handleEditBookButtonClick: SubmitHandler<FieldValues> = ({ title, author }) => {
    if (bookDetail?.bookId) {
      editBookInfo(
        { bookCoreData: { title, author, bookDepartment: 'ETC', totalQuantity }, bookId: bookDetail.bookId },
        {
          onSuccess: () => {
            if (isThumbnailChanged) {
              editBookThumbnail({ bookId: bookDetail.bookId, thumbnail });
            }
            onClose();
            reset();
          },
        },
      );
    }
  };

  return (
    <ActionModal
      open={open}
      onClose={onClose}
      title={`도서 ${bookDetail ? '수정' : '추가'}`}
      actionButtonName={bookDetail ? '수정' : '추가'}
      onActionButonClick={bookDetail ? handleSubmit(handleEditBookButtonClick) : handleSubmit(handleAddBookButtonClick)}
      actionButtonDisabled={isSubmitting || !isValid}
    >
      <div className="flex space-x-6">
        <Stack spacing={2}>
          <Controller
            name="title"
            defaultValue={bookDetail?.title || ''}
            control={control}
            rules={{
              required: '도서명을 입력해주세요.',
              maxLength: {
                value: 200,
                message: '200자 이하로 입력해주세요.',
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return <StandardInput label="도서명" {...field} error={Boolean(error)} helperText={error?.message} />;
            }}
          />
          <Controller
            name="author"
            defaultValue={bookDetail?.author || ''}
            control={control}
            rules={{
              required: '저자를 입력해주세요.',
              maxLength: {
                value: 30,
                message: '30자 이하로 입력해주세요.',
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return <StandardInput label="저자" {...field} error={Boolean(error)} helperText={error?.message} />;
            }}
          />
          <div className="relative">
            <TotalBookNumberSelector value={totalQuantity} setValue={setTotalQuantity} />
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
        </Stack>
        <div className="space-y-5">
          <div className="relative">
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
