import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { VscTrash } from 'react-icons/vsc';
import { formatFileSize } from '@utils/converter';

interface FileUploadListTableProps {
  files: File[];
}

const FileUploadListTable = ({ files }: FileUploadListTableProps) => {
  return (
    <TableContainer className="h-52 bg-middleBlack">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>파일명</TableCell>
            <TableCell>파일 크기</TableCell>
            <TableCell>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{formatFileSize(file.size)}</TableCell>
              <TableCell>
                <IconButton>
                  <VscTrash size={20} className="fill-subRed" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileUploadListTable;
