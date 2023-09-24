export interface Column<T> {
  key: keyof T | 'checkbox';
  headerName: string;
  width?: string | number;
}

export type Row<T> = T & {
  id: number;
};

export interface ChildComponent<T> {
  key: keyof T;
  value: T[keyof T];
  rowData: T;
}

export type TableType = 'List' | 'Grid';
