type CsvCell = string | number;

const escapeCsvCell = (cell: CsvCell) => `"${String(cell).replaceAll('"', '""')}"`;

export const downloadCsv = (fileName: string, headers: string[], rows: CsvCell[][]) => {
  const csv = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
};

export const createCsvFileName = (voteTitle: string, suffix: string) => {
  const safeTitle = voteTitle.replace(/[\\/:*?"<>|]/g, '_');

  return `${safeTitle}_${suffix}.csv`;
};
