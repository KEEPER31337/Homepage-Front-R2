import React, { ReactNode } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { ChildComponent, Column, Row } from './StandardTable.interface';

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
  const isCheckboxColumn = (columnKey: Column<T>['key']) => columnKey === 'checkbox';

  return (
    <div>
      <Table>
        <TableHead className="bg-middleBlack">
          <TableRow>
            {columns.map((column) => (
              <TableCell
                padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                className="!border-subBlack !text-white"
                key={column.key as string}
              >
                {isCheckboxColumn(column.key) ? <Checkbox /> : column.headerName}
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
                  <TableCell
                    padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                    className="!border-subBlack bg-mainBlack !text-white"
                    key={column.key as string}
                  >
                    {isCheckboxColumn(column.key) ? (
                      <Checkbox />
                    ) : (
                      <div>
                        {childComponent
                          ? childComponent({
                              key: column.key,
                              value: row[column.key],
                              rowData: row,
                            })
                          : row[column.key]}
                      </div>
                    )}
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
