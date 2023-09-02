import React from 'react';
import PostingCard, { PostingCardProps } from '@components/Card/PostingCard';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { PaginationOption } from '@components/Pagination/StandardTablePagination.interface';
import { Row } from './StandardTable.interface';

interface GridTableProps<T> {
  rows: (PostingCardProps & Row<T>)[];
  paginationOption?: PaginationOption;
}

const GridTable = <T,>({ rows, paginationOption }: GridTableProps<T>) => {
  return (
    <div>
      <div className="mb-1 grid grid-cols-5 gap-2">
        {rows.map(
          ({
            id,
            thumbnailPath,
            type,
            title,
            writerThumbnailPath,
            writerName,
            registerTime,
            visitCount,
            commentCount,
            likeCount,
          }) => (
            <PostingCard
              key={id}
              type={type}
              title={title}
              writerThumbnailPath={writerThumbnailPath}
              writerName={writerName}
              registerTime={registerTime}
              visitCount={visitCount}
              commentCount={commentCount}
              likeCount={likeCount}
              thumbnailPath={thumbnailPath}
            />
          ),
        )}
      </div>
      <StandardTablePagination {...paginationOption} />
    </div>
  );
};

export default GridTable;
