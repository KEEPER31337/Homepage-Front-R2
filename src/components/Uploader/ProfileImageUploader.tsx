import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar, Typography } from '@mui/material';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { getServerImgUrl } from '@utils/converter';
import WarningModal from '@components/Modal/WarningModal';

interface ProfileImageUploaderProps {
  title?: string;
  isEdit: boolean;
  thumbnailPath?: string;
  setThumbnail: React.Dispatch<Blob | null>;
}

type ImageWarningType = 'Multiple' | 'WrongExtension';

interface ImageWarningInfo {
  isOpen: boolean;
  type: ImageWarningType;
}

const ProfileImageUploader = ({ isEdit, thumbnailPath, setThumbnail }: ProfileImageUploaderProps) => {
  const MAX_IMAGE_COUNT = 1;
  const [thumbnailBase64, setThumbnailBase64] = useState<string>();
  const [openWarning, setOpenWarning] = useState<ImageWarningInfo>({ isOpen: false, type: 'Multiple' });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setThumbnailBase64('');
    acceptedFiles.forEach((file: File) => {
      setThumbnail(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          const base64Sub = base64.toString();
          setThumbnailBase64(base64Sub);
        }
      };
    });
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
    onDropRejected: (files) => {
      if (files.length > MAX_IMAGE_COUNT) {
        setOpenWarning({ isOpen: true, type: 'Multiple' });
      } else {
        setOpenWarning({ isOpen: true, type: 'WrongExtension' });
      }
    },
  });

  const handleToDefaultImageClick = () => {
    setThumbnailBase64('');
    setThumbnail(null);
  };

  useEffect(() => {
    if (isEdit && thumbnailPath) {
      setThumbnailBase64(getServerImgUrl(thumbnailPath));
    }
  }, []);

  return (
    <div className="relative flex h-full flex-col space-y-[10px]">
      <WarningModal
        open={openWarning.isOpen}
        onClose={() => setOpenWarning({ ...openWarning, isOpen: false })}
        actionButtonName="확인"
        onActionButonClick={() => setOpenWarning({ ...openWarning, isOpen: false })}
      >
        {openWarning.type === 'Multiple'
          ? '썸네일 이미지는 한 개만 업로드할 수 있습니다.'
          : '이미지 파일(png, jpg, jpeg, gif)만 업로드 가능합니다.'}
      </WarningModal>

      <div
        {...getRootProps()}
        className={`
          ${isDragActive ? 'bg-pointBlue/30' : ''} 
          ${thumbnailBase64 ? '' : 'border-2'} 
          relative flex h-full items-center justify-center rounded-full border-dashed !border-pointBlue/30 hover:opacity-70
        `}
      >
        {thumbnailBase64 ? (
          <Avatar
            sx={{ width: 'inherit', height: 'inherit' }}
            className={`${isDragActive ? 'opacity-50' : ''} !absolute inset-0 -z-10 m-auto`}
            src={thumbnailBase64}
          />
        ) : (
          <div className="flex items-center text-pointBlue/70">
            <Avatar
              sx={{ width: 'inherit', height: 'inherit' }}
              className="!absolute inset-0 -z-10 m-auto opacity-10"
            />
            {isDragActive ? (
              <Typography className="mx-2 text-center text-small">이미지를 놓으세요</Typography>
            ) : (
              <div className="text-center">
                <MdOutlineAddPhotoAlternate className="mx-auto mb-1 h-[30px] w-[30px]" />
                <Typography variant="small">
                  클릭 또는 드래그하여
                  <br />
                  이미지를 첨부하세요
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
      <Typography
        variant="small"
        className="absolute -bottom-3 right-0 w-fit hover:text-pointBlue hover:underline hover:underline-offset-4"
        component="button"
        onClick={handleToDefaultImageClick}
      >
        기본 이미지로
      </Typography>
    </div>
  );
};
export default ProfileImageUploader;
