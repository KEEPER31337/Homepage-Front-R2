import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StandardTableProps<T extends Record<string, any>> {
  columns: { key: keyof T; headerName: string }[];
  rows: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StandardTable = <T extends Record<string, any>>({ columns, rows }: StandardTableProps<T>) => {
  return (
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
          <TableRow>
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
  );
};

export default StandardTable;
