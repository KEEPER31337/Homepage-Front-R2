interface SeminarListRow {
  id: number;
  no: number;
  name: string;
}

const columns = [
  { key: 'no' as keyof SeminarListRow, headerName: '기수' },
  { key: 'name' as keyof SeminarListRow, headerName: '이름' },
  { key: 'date20230107' as keyof SeminarListRow, headerName: 'date20230107' },
  { key: 'date20230110' as keyof SeminarListRow, headerName: 'date20230110' },
];

const rows = [
  { id: 1, no: 13.5, name: '장서윤', date20230107: '출석', date20230110: '결석' },
  { id: 2, no: 11, name: '임연후', date20230107: '출석', date20230110: '출석' },
  { id: 3, no: 13, name: '송세연', date20230107: '출석', date20230110: '결석' },
];

export { columns, rows };
export type { SeminarListRow };
