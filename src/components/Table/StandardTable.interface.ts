export interface Column<T> {
  key: keyof T;
  headerName: string;
}

export type Row<T> = T & {
  id: number;
};
