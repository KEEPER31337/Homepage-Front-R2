import React from 'react';
import PostingCard, { PostingCardProps } from '@components/Card/PostingCard';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { Row } from './StandardTable.interface';

interface GridTableProps<T> {
  rows: (PostingCardProps & Row<T>)[];
}

const GridTable = <T,>({ rows }: GridTableProps<T>) => {
  return (
    <div>
      <div className="mb-1 grid grid-cols-5 gap-2">
        {rows.map(
          ({ id, thumbnailPath, type, title, writerThumbnailPath, writer, registerTime, visitCount, commentCount }) => (
            <PostingCard
              key={id}
              type={type}
              title={title}
              writerThumbnailPath={writerThumbnailPath}
              writer={writer}
              registerTime={registerTime}
              visitCount={visitCount}
              commentCount={commentCount}
              thumbnailPath={thumbnailPath}
            />
          ),
        )}
      </div>
      <StandardTablePagination rowsPerPage={10} />
    </div>
  );
};

export default GridTable;
