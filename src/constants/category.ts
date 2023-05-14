export interface CategoryMenu {
  id: number;
  name: string;
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
      },
      {
        id: 102,
        name: '건의사항',
      },
      {
        id: 103,
        name: '정보게시판',
      },
      {
        id: 104,
        name: '자유게시판',
      },
      {
        id: 105,
        name: '익명게시판',
      },
      {
        id: 106,
        name: '졸업생게시판',
      },
      {
        id: 107,
        name: '시험게시판',
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
      },
      {
        id: 202,
        name: '발표자료',
      },
      {
        id: 203,
        name: '기술문서',
      },
      {
        id: 204,
        name: '회계부',
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
      },
      {
        id: 302,
        name: '기자재',
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
      },
      {
        id: 402,
        name: '활동인원조사',
      },
      {
        id: 403,
        name: '임원진 선거',
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
      },
      {
        id: 502,
        name: '게임',
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
      },
      {
        id: 602,
        name: 'CHALLENGES',
      },
      {
        id: 603,
        name: 'SCOREBOARD',
      },
      {
        id: 604,
        name: 'TEAM',
      },
      {
        id: 605,
        name: '문제관리',
      },
      {
        id: 606,
        name: '제출로그',
      },
      {
        id: 607,
        name: '대회운영',
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
      },
      {
        id: 702,
        name: '선거관리',
      },
      {
        id: 703,
        name: '도서관리',
      },
      {
        id: 704,
        name: '기자재관리',
      },
      {
        id: 705,
        name: '세미나관리',
      },
      {
        id: 706,
        name: '활동인원관리',
      },
      {
        id: 707,
        name: '상벌점관리',
      },
    ],
  },
];

export default CATEGORIES;
