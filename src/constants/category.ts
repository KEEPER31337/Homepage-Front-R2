export interface CategoryMenu {
  id: number;
  name: string;
  path?: string;
}

export interface Category extends CategoryMenu {
  subCategories: CategoryMenu[];
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: '게시판',
    path: 'board',
    subCategories: [
      {
        id: 101,
        name: '공지사항',
        path: '공지사항',
      },
      {
        id: 102,
        name: '건의사항',
        path: '건의사항',
      },
      {
        id: 103,
        name: '정보게시판',
        path: '정보게시판',
      },
      {
        id: 104,
        name: '자유게시판',
        path: '자유게시판',
      },
      {
        id: 105,
        name: '익명게시판',
        path: '익명게시판',
      },
      {
        id: 106,
        name: '졸업생게시판',
        path: '졸업생게시판',
      },
      {
        id: 107,
        name: '시험게시판',
        path: '시험게시판',
      },
    ],
  },
  {
    id: 2,
    name: '동아리활동',
    subCategories: [
      {
        id: 201,
        name: '스터디',
        path: 'study',
      },
      {
        id: 202,
        name: '발표자료',
        path: 'board/발표자료',
      },
      {
        id: 203,
        name: '기술문서',
        path: 'board/기술문서',
      },
      {
        id: 204,
        name: '회계부',
        path: 'board/회계부',
      },
    ],
  },
  {
    id: 3,
    name: '도서/기자재',
    subCategories: [
      {
        id: 301,
        name: '도서',
        path: 'library',
      },
    ],
  },
  {
    id: 4,
    name: '참여마당',
    subCategories: [
      {
        id: 401,
        name: '세미나 출석',
        path: 'seminar',
      },
      {
        id: 402,
        name: '임원진 선거',
        path: 'election',
      },
    ],
  },
  {
    id: 5,
    name: '놀이마당',
    subCategories: [
      {
        id: 501,
        name: '랭킹',
        path: 'rank',
      },
      {
        id: 502,
        name: '게임',
        path: 'game',
      },
    ],
  },
  {
    id: 6,
    name: 'CTF',
    path: 'ctf',
    subCategories: [
      {
        id: 601,
        name: 'CTF',
        path: 'select',
      },
      {
        id: 602,
        name: 'CHALLENGES',
        path: 'challenge',
      },
      {
        id: 603,
        name: 'SCOREBOARD',
        path: 'scoreboard',
      },
      {
        id: 604,
        name: 'TEAM',
        path: 'team',
      },
      {
        id: 605,
        name: '문제관리',
        path: 'admin/challengeManage',
      },
      {
        id: 606,
        name: '제출로그',
        path: 'admin/submissions',
      },
      {
        id: 607,
        name: '대회운영',
        path: 'admin/operation',
      },
    ],
  },
  {
    id: 7,
    name: '관리자페이지',
    path: 'admin',
    subCategories: [
      {
        id: 701,
        name: '직책관리',
        path: 'dutyManage',
      },
      {
        id: 702,
        name: '선거관리',
        path: 'electionManage',
      },
      {
        id: 703,
        name: '도서관리',
        path: 'libraryManage',
      },
      {
        id: 704,
        name: '세미나관리',
        path: 'seminarManage',
      },
      {
        id: 705,
        name: '활동인원관리',
        path: 'activeMemberManage',
      },
      {
        id: 706,
        name: '상벌점관리',
        path: 'rewordPenaltyManage',
      },
    ],
  },
];

export default CATEGORIES;
