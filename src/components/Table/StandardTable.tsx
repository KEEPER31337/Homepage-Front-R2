import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StandardTableProps<T extends Record<string, any>> {
  columns: { key: keyof T; headerName: string }[];
  rows: (T & { id: number })[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StandardTable = <T extends Record<string, any>>({ columns, rows }: StandardTableProps<T>) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.key as string}>{column.headerName}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => {
              return <TableCell key={column.key as string}>{row[column.key]}</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StandardTable;
