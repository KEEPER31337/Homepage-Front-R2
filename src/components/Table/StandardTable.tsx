import React, { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { Column, Row, ChildComponent } from './StandardTable.interface';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StandardTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  rows: Row<T>[];
  onRowClick?: ({ rowData }: { rowData: Row<T> }) => void;
  childComponent?: ({ key, value, rowData }: ChildComponent<T>) => ReactNode;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StandardTable = <T extends Record<string, any>>({
  columns,
  rows,
  onRowClick,
  childComponent,
}: StandardTableProps<T>) => {
  return (
    <div>
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
              className={`${onRowClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'}`}
              key={row.id}
              onClick={onRowClick ? () => onRowClick({ rowData: row }) : undefined}
            >
              {columns.map((column) => {
                return (
                  <TableCell className="!border-subBlack bg-mainBlack !text-white" key={column.key as string}>
                    {childComponent
                      ? childComponent({ key: column.key, value: row[column.key], rowData: row })
                      : row[column.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StandardTablePagination rowsPerPage={10} />
    </div>
  );
};

export default StandardTable;
