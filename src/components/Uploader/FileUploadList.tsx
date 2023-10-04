import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { VscTrash } from 'react-icons/vsc';
import { formatFileSize } from '@utils/converter';

interface FileUploadListTableProps {
  files: (File & { fileId?: number })[];
  onDeleteButtonClick: (fileName: string, fileId?: number) => void;
}

const FileUploadListTable = ({ files, onDeleteButtonClick }: FileUploadListTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer className="h-52 bg-middleBlack">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>파일명</TableCell>
            {!isMobile && <TableCell>파일 크기</TableCell>}
            <TableCell>삭제</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell>
                <Typography className="w-72 truncate sm:w-full">{file.name}</Typography>
                {isMobile && <Typography variant="small">{formatFileSize(file.size)}</Typography>}
              </TableCell>
              {!isMobile && <TableCell>{formatFileSize(file.size)}</TableCell>}
              <TableCell>
                <IconButton onClick={() => onDeleteButtonClick(file.name, file.fileId)}>
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
