import React, { useState } from 'react';

import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { VscNewFile } from 'react-icons/vsc';
import FileUploadListTable from './FileUploadList';

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteUploadFileClick = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="space-y-4">
      {files.length > 0 && <FileUploadListTable files={files} onDeleteButtonClick={handleDeleteUploadFileClick} />}
      <div
        {...getRootProps()}
        className={`flex h-28 w-full items-center justify-center border border-dashed border-pointBlue text-pointBlue ${
          isDragActive ? 'bg-pointBlue/10' : ''
        }`}
      >
        <span className="text-center">
          <VscNewFile size={30} className="mr-2 inline" />
          <Typography className="inline">클릭 또는 드래그하여 파일을 첨부하세요</Typography>
        </span>
      </div>
    </div>
  );
};
export default FileUploader;
