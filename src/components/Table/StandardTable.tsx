import React, { ReactNode } from 'react';
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import StandardTablePagination from '@components/Pagination/StandardTablePagination';
import { PaginationOption } from '@components/Pagination/StandardTablePagination.interface';
import { Cell, ChildComponent, Column, Row } from './StandardTable.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface StandardTableProps<T extends Record<string, any>> {
  size?: 'small' | 'medium';
  columns: Column<T>[];
  fixedRows?: Row<T>[];
  rows: Row<T>[];
  onRowClick?: ({ rowData }: { rowData: Row<T> }) => void;
  onCellClick?: ({ cellData }: { cellData: Cell<T> }) => void;
  childComponent?: ({ key, value, rowData }: ChildComponent<T>) => ReactNode;
  paginationOption?: PaginationOption;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StandardTable = <T extends Record<string, any>>({
  size = 'small',
  columns,
  fixedRows,
  rows,
  onRowClick,
  onCellClick,
  childComponent,
  paginationOption,
}: StandardTableProps<T>) => {
  const isCheckboxColumn = (columnKey: Column<T>['key']) => columnKey === 'checkbox';

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Table size={size} sx={{ '.MuiTableCell-sizeSmall': { paddingY: '14px' } }}>
        <TableHead className="bg-middleBlack">
          <TableRow>
            {columns.map((column) => (
              <TableCell
                padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                className="!border-subBlack !text-white"
                width={column.width}
                key={column.key as string}
              >
                {isCheckboxColumn(column.key) ? <Checkbox /> : column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="bg-mainBlack">
          {rows.length === 0 && (!fixedRows || fixedRows.length === 0) ? (
            <TableRow>
              <TableCell className="!border-none" colSpan={columns.length}>
                <Typography align="center" marginY={8}>
                  데이터가 없습니다.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {fixedRows &&
                fixedRows.map((row) => (
                  <TableRow
                    className={`${onRowClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'}`}
                    key={row.id}
                    onClick={onRowClick ? () => onRowClick({ rowData: row }) : undefined}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          onClick={onCellClick ? () => onCellClick({ cellData: row[column.key] }) : undefined}
                          padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                          className={`${
                            onCellClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'
                          } !border-subBlack bg-mainBlack !text-white`}
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
              {rows.map((row) => (
                <TableRow
                  className={`${onRowClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'}`}
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick({ rowData: row }) : undefined}
                >
                  {columns.map((column) => {
                    return (
                      <TableCell
                        onClick={onCellClick ? () => onCellClick({ cellData: row[column.key] }) : undefined}
                        padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                        className={`${
                          onCellClick && 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'
                        } !border-subBlack bg-mainBlack !text-white`}
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
            </>
          )}
        </TableBody>
      </Table>
      <StandardTablePagination {...paginationOption} />
    </Box>
  );
};

export default StandardTable;
