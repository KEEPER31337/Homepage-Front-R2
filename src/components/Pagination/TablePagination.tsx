import React, { useState } from 'react';
import { Pagination, TablePagination } from '@mui/material';

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
