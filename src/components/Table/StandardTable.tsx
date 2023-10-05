import React, { ReactNode } from 'react';
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

import { KEEPER_COLOR } from '@constants/keeperTheme';
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
    <div>
      <Box sx={{ overflow: 'auto' }}>
        <Table size={size} sx={{ '.MuiTableCell-sizeSmall': { paddingY: '14px' } }}>
          <TableHead className="bg-middleBlack">
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                  className="!truncate !border-subBlack !text-white"
                  width={column.width}
                  sx={{
                    minWidth: column.width,
                    position: column.fixed && 'sticky',
                    left: column.fixed === 'left' ? index * 100 : undefined,
                    backgroundColor: KEEPER_COLOR.middleBlack,
                  }}
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
                      {columns.map((column, index) => {
                        return (
                          <TableCell
                            onClick={
                              onCellClick && !column.fixed
                                ? () => onCellClick({ cellData: row[column.key] })
                                : undefined
                            }
                            padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                            className={`${
                              onCellClick &&
                              !column.fixed &&
                              'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'
                            } !border-subBlack bg-mainBlack !text-white`}
                            sx={{
                              position: column.fixed && 'sticky',
                              left: column.fixed === 'left' ? index * 100 : undefined,
                              backgroundColor: column.fixed && KEEPER_COLOR.middleBlack,
                            }}
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
                    {columns.map((column, index) => {
                      return (
                        <TableCell
                          onClick={
                            onCellClick && !column.fixed ? () => onCellClick({ cellData: row[column.key] }) : undefined
                          }
                          padding={isCheckboxColumn(column.key) ? 'checkbox' : undefined}
                          className={`${
                            onCellClick &&
                            !column.fixed &&
                            'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none'
                          } overflow-hidden !border-subBlack bg-mainBlack !text-white`}
                          sx={{
                            position: column.fixed && 'sticky',
                            left: column.fixed === 'left' ? index * 100 : undefined,
                            backgroundColor: column.fixed && KEEPER_COLOR.middleBlack,
                          }}
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
      </Box>
      <StandardTablePagination {...paginationOption} />
    </div>
  );
};

export default StandardTable;
