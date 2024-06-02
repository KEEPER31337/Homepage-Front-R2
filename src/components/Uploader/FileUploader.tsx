import React from 'react';

import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';
import { VscNewFile } from 'react-icons/vsc';
import { FILE, MAX_FILE_SIZE, ALLOWED_FILE_EXTENSIONS } from '@constants/apiResponseMessage';
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

  const onDropRejected = (rejectedFiles: { file: File; errors: { code: string; message: string }[] }[]) => {
    rejectedFiles.forEach(({ errors }) => {
      errors.forEach((error) => {
        if (error.code === 'file-too-large') {
          toast.error(FILE.error.exceedFileSize, {
            style: {
              maxWidth: 1500,
            },
          });
        } else if (error.code === 'file-invalid-type') {
          toast.error(FILE.error.disallowedFileExtension, {
            style: {
              maxWidth: 1500,
            },
          });
        }
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpg': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.bmp', '.ico'],
      'video/mp4': ['.mp4'],
      'audio/mp3': ['.mp3'],
      'audio/wav': ['.wav'],
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/zip': ['.zip'],
      'application/x-7z-compressed': ['.7z'],
      'application/vnd.hancom.hwpx': ['.hwpx'],
    },
    maxSize: MAX_FILE_SIZE,
  });

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
          <Typography className="inline">
            클릭 또는 드래그하여 파일을 첨부하세요
            <br />
            <span style={{ fontSize: '12px' }}>지원하는 파일: {ALLOWED_FILE_EXTENSIONS.join(', ')}</span>
          </Typography>
        </span>
      </div>
    </div>
  );
};
export default FileUploader;
