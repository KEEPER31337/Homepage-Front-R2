const categoriesAll = [
  {
    id: 1,
    name: 'KEEPER',
    subs: [
      {
        id: 7,
        name: '동아리 소개',
        href: 'about',
        auth: null,
      },
      {
        id: null,
        name: '스터디',
        href: 'study',
        auth: null,
      },
      {
        id: null,
        name: 'CTF',
        href: 'ctf',
        auth: null,
      },
      {
        id: null,
        name: '투표',
        href: 'vote',
        auth: null,
      },
      {
        id: null,
        name: '위키',
        href: 'https://keeper.or.kr/wiki/%EB%8C%80%EB%AC%B8',
        auth: null,
        external: true,
      },
    ],
  },
  {
    id: 2,
    name: '게시판',
    subs: [
      {
        id: 105,
        name: '공지사항',
        href: 'board/공지사항',
        auth: null,
      },
      {
        id: 6105,
        name: '건의사항',
        href: 'board/건의사항',
        auth: null,
      },
      {
        id: 116,
        name: '자유게시판',
        href: 'board/자유게시판',
        auth: null,
      },
      {
        id: 63908,
        name: '익명게시판',
        href: 'board/익명게시판',
        auth: null,
      },
      {
        id: 11,
        name: '졸업생게시판',
        href: 'board/졸업생게시판',
        auth: null,
      },
    ],
  },
  {
    id: 3,
    name: '동아리활동',
    subs: [
      {
        id: 117,
        name: '발표자료',
        href: 'board/발표자료',
        auth: null,
      },
      {
        id: 5424,
        name: '스터디 발표자료',
        href: 'board/스터디발표자료',
        auth: null,
      },
      {
        id: 2996,
        name: '기술문서',
        href: 'board/기술문서',
        auth: null,
      },
      {
        id: 23400,
        name: '회계부',
        href: 'board/회계부',
        auth: null,
      },
    ],
  },
  {
    id: 4,
    name: '정보',
    subs: [
      {
        id: 5125,
        name: '정보',
        href: 'board/정보',
        auth: null,
      },
      {
        id: 1377,
        name: '시험',
        href: 'board/시험',
        auth: null,
      },
    ],
  },
  {
    id: 5,
    name: '도서/기자재',
    subs: [
      {
        id: 26,
        name: '도서 검색',
        href: 'library',
        auth: null,
      },
      {
        id: 28,
        name: '도서 관리',
        href: 'library/manage',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_사서'],
      },
    ],
  },
  {
    id: 6,
    name: '포인트',
    subs: [
      {
        id: 30,
        name: '랭킹',
        href: 'ranking',
        auth: null,
      },
      {
        id: 31,
        name: '출석부',
        href: 'attandance',
        auth: null,
      },
      {
        id: 32,
        name: '게임',
        href: 'game',
        auth: null,
      },
    ],
  },
  {
    id: 33,
    name: '세미나',
    subs: [
      {
        id: 34,
        name: '출석체크',
        href: 'autoAttend',
        auth: null,
      },
      {
        id: 35,
        name: '활동인원조사',
        href: 'research',
        auth: null,
      },
      {
        id: 36,
        name: 'admin서기',
        href: 'clerk',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'],
      },
      {
        id: 37,
        name: 'admin전산관리자',
        href: 'itManager',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_전산관리자'],
      },
    ],
  },
];

const categoriesHidden = [
  {
    id: 1,
    name: 'KEEPER',
    subs: [
      {
        id: 7,
        name: '동아리 소개',
        href: 'about',
        auth: null,
      },
    ],
  },
];

export { categoriesAll, categoriesHidden };
