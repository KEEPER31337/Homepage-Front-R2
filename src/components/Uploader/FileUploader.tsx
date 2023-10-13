import React from 'react';

import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import { VscNewFile } from 'react-icons/vsc';
import FileUploadListTable from './FileUploadList';

interface FileUploaderProps {
  existingFiles?: (File & { fileId: number })[];
  setExistingFiles?: React.Dispatch<React.SetStateAction<(File & { fileId: number })[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setFileIdsToDelete?: React.Dispatch<React.SetStateAction<number[]>>;
}

const FileUploader = ({
  existingFiles = [],
  setExistingFiles,
  files: filesToAdd,
  setFiles: setFilesToAdd,
  setFileIdsToDelete,
}: FileUploaderProps) => {
  const onDrop = (acceptedFiles: File[]) => {
    setFilesToAdd((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteUploadFileClick = (fileName: string, fileId?: number) => {
    if (fileId && setFileIdsToDelete && setExistingFiles) {
      setFileIdsToDelete((prevFileIds) => [...prevFileIds, fileId]);
      setExistingFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
      return;
    }

    setFilesToAdd((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="space-y-4">
      {existingFiles.length + filesToAdd.length > 0 && (
        <FileUploadListTable
          files={[...existingFiles, ...filesToAdd]}
          onDeleteButtonClick={handleDeleteUploadFileClick}
        />
      )}
      <div
        {...getRootProps()}
        className={`flex h-28 w-full items-center justify-center border border-dashed border-pointBlue text-pointBlue ${
          isDragActive ? 'bg-pointBlue/10' : ''
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-center">
          <VscNewFile size={30} className="mr-2 inline" />
          <Typography className="inline">클릭 또는 드래그하여 파일을 첨부하세요</Typography>
        </span>
      </div>
    </div>
  );
};
export default FileUploader;
