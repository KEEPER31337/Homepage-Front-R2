import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import utilApi from '@mocks/UtilApi';
import WarningModal from '@components/Modal/WarningModal';
import { Typography } from '@material-tailwind/react';

interface ImageUploaderProps {
  title?: string;
  isEdit: boolean;
  thumbnailPath?: string;
  setThumbnail: React.Dispatch<Blob>;
}

const validateName = (fileName: string) => {
  const extensions = ['jpeg', 'jpg', 'png'];
  const fileParts = fileName.split('.');
  let fileExtension = '';

  if (fileParts.length > 1) fileExtension = fileParts.at(-1) as string;
  let validated = false;
  if (fileExtension !== '') {
    extensions.forEach((ext) => {
      if (ext === fileExtension) validated = true;
    });
  }
  return validated;
};

const ImageUploader = ({ title, isEdit, thumbnailPath, setThumbnail }: ImageUploaderProps) => {
  const [thumbnailBase64, setThumbnailBase64] = useState<string>();
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit && thumbnailPath) {
      const list = thumbnailPath.split('/');
      const data = utilApi.getThumbnail(list[list.length - 1]);
      setThumbnail(data);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setThumbnailBase64(base64.toString);
        }
      };
      reader.readAsDataURL(data);
    }
  }, []);

  const handleToDefaultImageClick = () => {
    setThumbnailBase64('');
    setThumbnail(new Blob());
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setThumbnailBase64('');
    acceptedFiles.forEach((file: File) => {
      if (validateName(file.name)) {
        setThumbnail(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          const array = [];
          for (let i = 0; i < (reader.result as string).length; i += 1) {
            array.push((reader.result as string).charCodeAt(i));
          }
          const base64 = reader.result;
          if (base64) {
            const base64Sub = base64.toString();
            setThumbnailBase64(base64Sub);
          }
        };
        reader.readAsDataURL(file);
      } else {
        setOpenWarning(true);
      }
    });
  }, []);
  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const rootProps = {
    ...getRootProps(),
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png',
  };

  return (
    <div className="space-y-[10px]">
      <WarningModal
        open={openWarning}
        onClose={() => setOpenWarning(false)}
        actionButtonName="확인"
        onActionButonClick={() => setOpenWarning(false)}
      >
        이미지 파일(.png/.jpg/.jpeg)만 업로드 가능합니다.
      </WarningModal>
      <div className="flex items-center justify-between">
        <Typography className="text-paragraph">{title || '썸네일'}</Typography>
        <button
          className="text-small underline underline-offset-4 hover:text-pointBlue"
          type="button"
          onClick={handleToDefaultImageClick}
        >
          기본 이미지로
        </button>
      </div>
      <div
        {...rootProps}
        className={`${isDragActive ? 'bg-pointBlue/[30%] bg-opacity-50' : ''} ${
          thumbnailBase64 ? '' : 'border-[2px]'
        } flex h-32 items-center justify-center border-dashed !border-pointBlue/[30%]`}
      >
        {thumbnailBase64 ? (
          <img
            className={`${isDragActive ? 'opacity-50' : ''} h-full w-full object-cover shadow-lg`}
            src={thumbnailBase64}
            alt="thumbnail"
          />
        ) : (
          <div className="flex items-center text-pointBlue/[30%]">
            {isDragActive ? (
              <Typography className="text-center text-small">이미지를 놓으세요</Typography>
            ) : (
              <div className="mx-2 inline-block text-center">
                <MdOutlineAddPhotoAlternate className="mx-auto mb-1 h-[30px] w-[30px]" />
                <Typography className="text-small">
                  클릭 또는 드래그하여
                  <br />
                  이미지를 첨부하세요
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
