interface AttendRankInfo {
  id: number;
  rank: number;
  name: string;
  no: number;
  attend: number;
  attendTime: string;
}

const attendColumns = [
  { key: 'rank' as keyof AttendRankInfo, headerName: '랭킹' },
  { key: 'name' as keyof AttendRankInfo, headerName: '이름' },
  { key: 'no' as keyof AttendRankInfo, headerName: '기수' },
  { key: 'attend' as keyof AttendRankInfo, headerName: '출석' },
  { key: 'attendTime' as keyof AttendRankInfo, headerName: '출석 시간' },
];

const attendRows = [
  { id: 1, rank: 1, name: '김철수', no: 1, attend: 100, attendTime: '06:29' },
  { id: 2, rank: 2, name: '김영희', no: 1, attend: 90, attendTime: '06:30' },
  { id: 3, rank: 3, name: '김철수', no: 1, attend: 80, attendTime: '06:31' },
  { id: 4, rank: 4, name: '김영희', no: 1, attend: 70, attendTime: '06:32' },
  { id: 5, rank: 5, name: '김철수', no: 1, attend: 60, attendTime: '06:33' },
  { id: 6, rank: 6, name: '김영희', no: 1, attend: 50, attendTime: '06:34' },
  { id: 7, rank: 7, name: '김철수', no: 1, attend: 40, attendTime: '06:35' },
  { id: 8, rank: 8, name: '김영희', no: 1, attend: 30, attendTime: '06:36' },
  { id: 9, rank: 9, name: '김철수', no: 1, attend: 20, attendTime: '06:37' },
  { id: 10, rank: 10, name: '김영희', no: 1, attend: 10, attendTime: '06:38' },
];

const attendTop4 = [
  { id: 1, rank: 1, name: '김철수', no: 1, attend: 100, attendTime: '06:29' },
  { id: 2, rank: 2, name: '김영희', no: 1, attend: 90, attendTime: '06:30' },
  { id: 3, rank: 3, name: '김철수', no: 1, attend: 80, attendTime: '06:31' },
  { id: 4, rank: 4, name: '김영희', no: 1, attend: 70, attendTime: '06:32' },
];

export { attendColumns, attendRows, attendTop4 };
export type { AttendRankInfo };
