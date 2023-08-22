interface PointRankInfo {
  id: number;
  rank: number;
  name: string;
  no: number;
  point: number;
}

const pointColumns = [
  { key: 'rank' as keyof PointRankInfo, headerName: '랭킹' },
  { key: 'name' as keyof PointRankInfo, headerName: '이름' },
  { key: 'no' as keyof PointRankInfo, headerName: '기수' },
  { key: 'point' as keyof PointRankInfo, headerName: '포인트' },
];

const pointRows = [
  { id: 1, rank: 1, name: '김철수', no: 1, point: 100 },
  { id: 2, rank: 2, name: '김영희', no: 1, point: 90 },
  { id: 3, rank: 3, name: '김철수', no: 2, point: 80 },
  { id: 4, rank: 4, name: '김영희', no: 2, point: 70 },
  { id: 5, rank: 5, name: '김철수', no: 3, point: 60 },
  { id: 6, rank: 6, name: '김영희', no: 3, point: 50 },
  { id: 7, rank: 7, name: '김철수', no: 4, point: 40 },
  { id: 8, rank: 8, name: '김영희', no: 4, point: 30 },
  { id: 9, rank: 9, name: '김철수', no: 5, point: 20 },
  { id: 10, rank: 10, name: '김영희', no: 5, point: 10 },
];

const pointTop4 = [
  { id: 1, rank: 1, name: '김철수', no: 1, point: 100 },
  { id: 2, rank: 2, name: '김영희', no: 1, point: 90 },
  { id: 3, rank: 3, name: '김철수', no: 2, point: 80 },
  { id: 4, rank: 4, name: '김영희', no: 2, point: 70 },
];

export { pointColumns, pointRows, pointTop4 };
export type { PointRankInfo };
