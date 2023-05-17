import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDropzone } from 'react-dropzone';
import { StudyListInfo } from '@api/dto';

interface ImageUploaderProps {
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

const ImageUploader = ({ isEdit, selectedStudy, setThumbnail }: ImageUploaderProps) => {
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
    ...getRootProps({
      onClick: (event) => event.stopPropagation(),
    }),
    multiple: false,
    accept: 'image/jpg, image/jpeg, image/png',
  };

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rootProps}
      className={`${
        isDragActive ? 'bg-blue-300 bg-opacity-50' : ''
      } dark:border-slate-500 flex h-40 w-40 items-center justify-center rounded-xl border-4 border-dashed`}
    >
      {thumbnailBase64 ? (
        <>
          <div className="peer h-full w-full">
            <img
              className={`${isDragActive ? 'opacity-50' : ''}   h-full w-full rounded-xl p-1 shadow-lg`}
              src={thumbnailBase64}
              alt="thumbnail"
            />
          </div>

          {/* eslint-disable-next-line react/button-has-type */}
          <button
            className="absolute  hidden h-40 w-40 rounded-xl bg-red-300 bg-opacity-50 text-xl text-red-500 hover:inline-block peer-hover:inline-block"
            onClick={deleteClickHandler}
          >
            삭제
          </button>
        </>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isDragActive ? (
            <p className="text-slate-500 dark:text-slate-300 flex items-center text-center">
              파일을
              <br />
              놓으세요
            </p>
          ) : (
            <p className="text-slate-500 flex items-center">
              <div className=" m-1 inline-block text-center">
                <br />
                썸네일을
                <br />
                드래그 해주세요
              </div>
            </p>
          )}
        </>
      )}
    </div>
  );
};
export default ImageUploader;
