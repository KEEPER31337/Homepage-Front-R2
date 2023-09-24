export interface Column<T> {
  key: keyof T | 'checkbox';
  headerName: string;
}

export type Row<T> = T & {
  id: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Cell<T> = unknown; /* TODO 임시로 unknown 타입 사용 */

export interface ChildComponent<T> {
  key: keyof T;
  value: T[keyof T];
  rowData: T;
}

export type TableType = 'List' | 'Grid';
