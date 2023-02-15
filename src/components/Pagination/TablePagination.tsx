import React, { useState } from 'react';
import { Pagination, TablePagination } from '@mui/material';

import './pagination.css';

interface StandardTablePaginationProps {
  rowsPerPage?: number;
}

const StandardTablePagination = ({ rowsPerPage = 10 }: StandardTablePaginationProps) => {
  const totalItems = 100; // TODO - 임시 값
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const [page, setPage] = useState(0);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  return (
    <div className="flex !w-full items-center justify-between bg-middleBlack">
      <TablePagination
        className="!m-0 !-ml-2 !border-none !p-0 !text-subGray"
        count={totalItems}
        page={page}
        onPageChange={() => {
          /* NOTE 필수값이나 커스텀으로 인해 사용하지 않는 핸들러 */
        }}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) => `Showing ${from}-${to} of ${count} items`}
      />
      <Pagination
        color="primary"
        className="mr-1 !text-pointBlue"
        count={totalPages}
        shape="rounded"
        page={page + 1}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default StandardTablePagination;
