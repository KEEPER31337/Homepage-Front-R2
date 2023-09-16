import React from 'react';
import { Pagination, TablePagination } from '@mui/material';

import './pagination.css';
import usePagination from '@hooks/usePagination';
import { PaginationOption } from './StandardTablePagination.interface';

const StandardTablePagination = ({ pageKey, rowsPerPage = 10, totalItems = -1 }: PaginationOption) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const { page, setPage } = usePagination(pageKey);

  const setoffPageDiff = (prevPage: number, reverse?: boolean) => {
    // TablePagination page의 인덱스와 Pagination page의 인덱스 간 차이(1) 상쇄를 위한 동작입니다.
    return prevPage - (reverse ? 1 : -1);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex !w-full items-center justify-between bg-middleBlack">
      <TablePagination
        component="div"
        className="!m-0 !-ml-2 !border-none !p-0 !text-subGray"
        count={totalItems}
        page={page}
        onPageChange={() => {
          /* NOTE 필수값이나 커스텀으로 인해 사용하지 않는 핸들러 */
        }}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) => `Showing ${from}-${to} of ${Math.max(count, 0)} items`}
      />
      <Pagination
        color="secondary"
        className="mr-1 !text-pointBlue"
        count={totalPages}
        shape="rounded"
        page={setoffPageDiff(page)}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default StandardTablePagination;
