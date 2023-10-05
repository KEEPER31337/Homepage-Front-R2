import React from 'react';
import {
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
import { VscFile } from 'react-icons/vsc';
import { FileInfo } from '@api/dto';
import { formatFileSize } from '@utils/converter';

interface FileViewerProps {
  files: FileInfo[];
  onRowClick?: (fileId: number, fileName: string) => void;
}

const FileViewer = ({ files, onRowClick }: FileViewerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer className="bg-middleBlack">
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>파일명</TableCell>
            {!isMobile && <TableCell>파일 크기</TableCell>}
            {!isMobile && <TableCell>업로드 시간</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow
              className={`${onRowClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'}`}
              key={file.name}
              onClick={onRowClick ? () => onRowClick(file.fileId, file.name) : undefined}
            >
              <TableCell>
                <div className="flex items-center text-pointBlue">
                  <VscFile className="mr-1" size={16} />
                  <Typography className="w-72 truncate sm:w-full">{file.name}</Typography>
                </div>
                {isMobile && <Typography variant="small">{formatFileSize(file.size)}</Typography>}
              </TableCell>
              {!isMobile && <TableCell>{formatFileSize(file.size)}</TableCell>}
              {!isMobile && <TableCell>{file.uploadTime}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileViewer;
