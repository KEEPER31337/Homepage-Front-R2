import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import StandardTablePagination from '@components/Pagination/StandardTablePagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StandardTableProps<T extends Record<string, any>> {
  columns: { key: keyof T; headerName: string }[];
  rows: (T & { id: number })[];
  onRowClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StandardTable = <T extends Record<string, any>>({ columns, rows, onRowClick }: StandardTableProps<T>) => {
  return (
    <>
      <Table>
        <TableHead className="bg-middleBlack">
          <TableRow>
            {columns.map((column) => (
              <TableCell className="!border-subBlack !text-white" key={column.key as string}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={`${onRowClick && 'hover:brightness-90 hover:drop-shadow-none'}`}
              key={row.id}
              onClick={onRowClick}
            >
              {columns.map((column) => {
                return (
                  <TableCell className="!border-subBlack bg-mainBlack !text-white" key={column.key as string}>
                    {row[column.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StandardTablePagination rowsPerPage={10} />
    </>
  );
};

export default StandardTable;
