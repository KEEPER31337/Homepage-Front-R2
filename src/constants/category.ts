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
    subCategories: [
      {
        id: 101,
        name: '공지사항',
        path: '#',
      },
      {
        id: 102,
        name: '건의사항',
        path: '#',
      },
      {
        id: 103,
        name: '정보게시판',
        path: '#',
      },
      {
        id: 104,
        name: '자유게시판',
        path: '#',
      },
      {
        id: 105,
        name: '익명게시판',
        path: '#',
      },
      {
        id: 106,
        name: '졸업생게시판',
        path: '#',
      },
      {
        id: 107,
        name: '시험게시판',
        path: '#',
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
        path: '#',
      },
      {
        id: 203,
        name: '기술문서',
        path: '#',
      },
      {
        id: 204,
        name: '회계부',
        path: '#',
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
        path: '#',
      },
      {
        id: 302,
        name: '기자재',
        path: '#',
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
        name: '활동인원조사',
        path: '#',
      },
      {
        id: 403,
        name: '임원진 선거',
        path: '#',
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
        path: '#',
      },
      {
        id: 502,
        name: '게임',
        path: '#',
      },
    ],
  },
  {
    id: 6,
    name: 'CTF',
    subCategories: [
      {
        id: 601,
        name: 'CTF',
        path: '#',
      },
      {
        id: 602,
        name: 'CHALLENGES',
        path: '#',
      },
      {
        id: 603,
        name: 'SCOREBOARD',
        path: '#',
      },
      {
        id: 604,
        name: 'TEAM',
        path: '#',
      },
      {
        id: 605,
        name: '문제관리',
        path: '#',
      },
      {
        id: 606,
        name: '제출로그',
        path: '#',
      },
      {
        id: 607,
        name: '대회운영',
        path: '#',
      },
    ],
  },
  {
    id: 7,
    name: '관리자페이지',
    subCategories: [
      {
        id: 701,
        name: '직책관리',
        path: '#',
      },
      {
        id: 702,
        name: '선거관리',
        path: '#',
      },
      {
        id: 703,
        name: '도서관리',
        path: 'admin/libraryManage',
      },
      {
        id: 704,
        name: '기자재관리',
        path: '#',
      },
      {
        id: 705,
        name: '세미나관리',
        path: 'admin/seminarManage',
      },
      {
        id: 706,
        name: '활동인원관리',
        path: '#',
      },
      {
        id: 707,
        name: '상벌점관리',
        path: '#',
      },
    ],
  },
];

export default CATEGORIES;
