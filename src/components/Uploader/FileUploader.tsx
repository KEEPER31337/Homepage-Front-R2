import React from 'react';

import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';

const FileUploader = () => {
  const onDrop = () => {
    // TODO
    // console.log(acceptedFiles)TODO
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`flex h-full w-full items-center justify-center border border-dashed !border-pointBlue/30 text-pointBlue/30 ${
        isDragActive ? 'bg-pointBlue/30' : ''
      }`}
    >
      <span className="text-center">
        <MdOutlineAddPhotoAlternate size={30} className="mr-2 inline" />
        <Typography className="inline">클릭 또는 드래그하여 파일을 첨부하세요</Typography>
      </span>
    </div>
  );
};
export default FileUploader;
