import React from 'react';
import PostingCard, { PostingCardProps } from '@components/Card/PostingCard';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { PaginationOption } from '@components/Pagination/StandardTablePagination.interface';
import { Row } from './StandardTable.interface';

interface GridTableProps<T> {
  rows: (PostingCardProps & Row<T>)[];
  onRowClick?: ({ rowData }: { rowData: Row<T> }) => void;
  paginationOption?: PaginationOption;
}

const GridTable = <T,>({ rows, onRowClick, paginationOption }: GridTableProps<T>) => {
  return (
    <div>
      <div className="mb-1 grid grid-cols-5 gap-2">
        {rows.map((row) => (
          <PostingCard<T> row={row} onClick={onRowClick} />
        ))}
      </div>
      <StandardTablePagination {...paginationOption} />
    </div>
  );
};

export default GridTable;
