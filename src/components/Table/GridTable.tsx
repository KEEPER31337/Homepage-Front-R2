import React from 'react';
import FixedPostingCard from '@components/Card/FixedPostingCard';
import PostingCard, { PostingCardProps } from '@components/Card/PostingCard';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { PaginationOption } from '@components/Pagination/StandardTablePagination.interface';
import { Row } from './StandardTable.interface';

interface GridTableProps<T> {
  fixedRows?: (PostingCardProps & Row<T>)[];
  rows: (PostingCardProps & Row<T>)[];
  onRowClick?: ({ rowData }: { rowData: Row<T> }) => void;
  paginationOption?: PaginationOption;
}

const GridTable = <T,>({ fixedRows, rows, onRowClick, paginationOption }: GridTableProps<T>) => {
  return (
    <div className="flex flex-col justify-center">
      {fixedRows && fixedRows.length > 0 && <FixedPostingCard<T> fixedRows={fixedRows} onClick={onRowClick} />}
      <div className="mb-1 grid grid-cols-5 gap-2">
        {rows.map((row) => (
          <PostingCard<T> key={row.id} row={row} onClick={onRowClick} />
        ))}
      </div>
      <StandardTablePagination {...paginationOption} />
    </div>
  );
};

export default GridTable;
