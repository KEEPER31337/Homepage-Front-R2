import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

import { StudyListInfo } from '@api/dto';

interface ImageUploaderProps {
  title?: string;
  isEdit: boolean;
  selectedStudy?: StudyListInfo;
  setThumbnail: React.Dispatch<Blob>;
}

const validateName = (fileName: string) => {
  const extensions = ['jpeg', 'jpg', 'png'];
  const fparts = fileName.split('.');
  let fext = '';

  if (fparts.length > 1) fext = fparts[fparts.length - 1];
  let validated = false;
  if (fext !== '') {
    extensions.forEach((ext) => {
      if (ext === fext) validated = true;
    });
  }
  return validated;
};

const ImageUploader = ({ title, isEdit, selectedStudy, setThumbnail }: ImageUploaderProps) => {
  const [thumbnailBase64, setThumbnailBase64] = useState<string>(); // 파일 base64
  // const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    // if (isEdit) {
    //   const list = selectedStudy.thumbnailPath.split('/');
    //   utilAPI.getThumbnail({ thumbnailId: list[list.length - 1] }).then((data: Blob) => {
    //     setThumbnail(data);
    //     const reader = new FileReader();
    //     reader.onabort = () => {
    //       /* console.log('file reading was aborted'); */
    //     };
    //     reader.onerror = () => {
    //       /* console.log('file reading has failed'); */
    //     };
    //     reader.onloadend = () => {
    //       const base64 = reader.result;
    //       if (base64) {
    //         setThumbnailBase64(base64.toString);
    //       }
    //     };
    //     reader.readAsDataURL(data);
    //   });
    // }
  }, []);

  const deleteClickHandler = () => {
    setThumbnailBase64(undefined);
    setThumbnail(new Blob());
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setThumbnailBase64('');
    acceptedFiles.forEach((file: any) => {
      if (validateName(file.name)) {
        setThumbnail(file);
        const reader = new FileReader();

        reader.onabort = () => {
          /* console.log('file reading was aborted'); */
        };
        reader.onerror = () => {
          /* console.log('file reading has failed'); */
        };
        reader.onloadend = () => {
          const array = [];
          for (let i = 0; i < (reader.result as string).length; i += 1) {
            array.push(reader?.result?.toString().charCodeAt(i));
          }
          const base64 = reader.result;
          if (base64) {
            const base64Sub = base64.toString();
            setThumbnailBase64(base64Sub);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일(.png/.jpg/.jpeg)만 업로드 가능합니다.');
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
    <>
      <div className="flex items-center justify-between">
        <span className="text-paragraph">{title || '썸네일'}</span>
        <button className="text-small underline underline-offset-4" type="button" onClick={deleteClickHandler}>
          기본 이미지로
        </button>
      </div>
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rootProps}
        className={`${isDragActive ? 'bg-pointBlue/[30%] bg-opacity-50' : ''} ${
          thumbnailBase64 ? '' : 'border-[2px]'
        } flex h-32 w-32 items-center justify-center border-dashed !border-pointBlue/[30%]`}
      >
        {thumbnailBase64 ? (
          <img
            className={`${isDragActive ? 'opacity-50' : ''}   h-full w-full shadow-lg`}
            src={thumbnailBase64}
            alt="thumbnail"
          />
        ) : (
          <div className="text-small text-pointBlue/[30%]">
            {isDragActive ? (
              <p className="flex items-center text-center">이미지를 놓으세요</p>
            ) : (
              <p className="flex items-center">
                <div className="mx-2 inline-block text-center">
                  <MdOutlineAddPhotoAlternate className="mx-auto mb-1 h-[30px] w-[30px]" />
                  클릭 또는 드래그하여
                  <br />
                  이미지를 첨부하세요
                </div>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ImageUploader;
