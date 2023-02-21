export interface Column<T> {
  key: keyof T;
  headerName: string;
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
