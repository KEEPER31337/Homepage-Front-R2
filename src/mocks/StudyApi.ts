interface StudyLinkInfo {
  title: string;
  contents: string;
}
interface StudyMemberInfo {
  id: number;
  emailAddress: string;
  nickName: string;
  realName: string;
  registerDate: string;
  point: number;
  level: number;
  rank: string;
  type: string;
  jobs: string[];
  thumbnailPath: string;
  merit: number;
  demerit: number;
  generation: number;
}
interface StudyListInfo {
  id: number;
  title: string;
  information: string;
  memberNumber: number;
  registerTime: string;
  year: number;
  season: number;
  link: StudyLinkInfo[];
  thumbnailPath: string;
  headMember: StudyMemberInfo;
  memberList: StudyMemberInfo[];
}
const studyList: StudyListInfo[] = [
  {
    id: 10,
    title: 'CTF 스터디',
    information: 'CTF 스터디입니당',
    memberNumber: 1,
    registerTime: '2023-01-12T09:07:01.000766406',
    year: 2022,
    season: 3,
    link: [
      { title: 'github', contents: 'https//~' },
      { title: 'notion', contents: 'https//~' },
      { title: 'plato', contents: 'https//~' },
    ],
    thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1038',
    headMember: {
      id: 1119,
      emailAddress: 'member6bacdcb9d2@k33p3r.com',
      nickName: '피피세바스찬',
      realName: '장서윤',
      registerDate: '2023-01-12T09:07:00.277+00:00',
      point: 1000,
      level: 0,
      rank: '일반회원',
      type: '정회원',
      jobs: ['ROLE_회원'],
      thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1034',
      merit: 0,
      demerit: 0,
      generation: 14.0,
    },
    memberList: [
      {
        id: 1119,
        emailAddress: 'member6bacdcb9d2@k33p3r.com',
        nickName: '피피세바스찬',
        realName: '장서윤',
        registerDate: '2023-01-12T09:07:00.277+00:00',
        point: 1000,
        level: 0,
        rank: '일반회원',
        type: '정회원',
        jobs: ['ROLE_회원'],
        thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1034',
        merit: 0,
        demerit: 0,
        generation: 14.0,
      },
      {
        id: 1120,
        emailAddress: 'member6bb336f39a@k33p3r.com',
        nickName: '김은지',
        realName: '김은지',
        registerDate: '2023-01-12T09:07:00.378+00:00',
        point: 1000,
        level: 0,
        rank: '일반회원',
        type: '정회원',
        jobs: ['ROLE_회원'],
        thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1035',
        merit: 0,
        demerit: 0,
        generation: 14.0,
      },
      {
        id: 1121,
        emailAddress: 'member6bb942c737@k33p3r.com',
        nickName: '아마란스',
        realName: '송세연',
        registerDate: '2023-01-12T09:07:00.480+00:00',
        point: 1000,
        level: 0,
        rank: '일반회원',
        type: '정회원',
        jobs: ['ROLE_회원'],
        thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1036',
        merit: 0,
        demerit: 0,
        generation: 14.0,
      },
      {
        id: 1122,
        emailAddress: 'member6bb942c737@k33p3r.com',
        nickName: '산다라박',
        realName: '박산다라',
        registerDate: '2023-01-12T09:07:00.480+00:00',
        point: 1000,
        level: 0,
        rank: '일반회원',
        type: '정회원',
        jobs: ['ROLE_회원'],
        thumbnailPath: 'http://localhost:8080/v1/util/thumbnail/1036',
        merit: 0,
        demerit: 0,
        generation: 14.0,
      },
    ],
  },
];
const yearList = ['2022', '2021', '2020', '2019'];

export { studyList, yearList };
export type { StudyLinkInfo, StudyMemberInfo, StudyListInfo };
