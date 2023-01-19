const categoriesAll = [
  {
    id: 0,
    name: '게시판',
    subs: [
      {
        id: 100,
        name: '공지사항',
        href: 'board/공지사항',
        auth: null,
      },
      {
        id: 101,
        name: '건의사항',
        href: 'board/건의사항',
        auth: null,
      },
      {
        id: 102,
        name: '자유게시판',
        href: 'board/자유게시판',
        auth: null,
      },
      {
        id: 103,
        name: '익명게시판',
        href: 'board/익명게시판',
        auth: null,
      },
      {
        id: 104,
        name: '졸업생게시판',
        href: 'board/졸업생게시판',
        auth: null,
      },
      {
        id: 105,
        name: '정보게시판',
        href: 'board/정보게시판',
        auth: null,
      },
      {
        id: 106,
        name: '시험게시판',
        href: 'board/시험게시판',
        auth: null,
      },
    ],
  },
  {
    id: 1,
    name: '동아리활동',
    subs: [
      {
        id: 110,
        name: '스터디',
        href: 'study',
        auth: null,
      },
      {
        id: 111,
        name: '표자료',
        href: 'board/발표자료',
        auth: null,
      },
      {
        id: 112,
        name: '기술문서',
        href: 'board/기술문서',
        auth: null,
      },
      {
        id: 113,
        name: '회계부',
        href: 'board/회계부',
        auth: null,
      },
    ],
  },
  {
    id: 3,
    name: '도서/기자재',
    subs: [
      {
        id: 130,
        name: '도서 검색',
        href: 'library',
        auth: null,
      },
      {
        id: 131,
        name: '기자재 검색',
        href: 'equipment',
        auth: null,
      },
    ],
  },
  {
    id: 4,
    name: '포인트',
    subs: [
      {
        id: 140,
        name: '랭킹',
        href: 'ranking',
        auth: null,
      },
      {
        id: 141,
        name: '게임',
        href: 'game',
        auth: null,
      },
    ],
  },
  {
    id: 5,
    name: '참여마당',
    subs: [
      {
        id: 150,
        name: '세미나 출석 체크',
        href: 'seminar',
        auth: null,
      },
      {
        id: 151,
        name: '임원진 투표',
        href: 'vote',
        auth: null,
      },
      {
        id: 152,
        name: '활동인원조사',
        href: 'activemember',
        auth: null,
      },
    ],
  },
  {
    id: 6,
    name: 'CTF',
    subs: [
      {
        id: 160,
        name: 'CTF',
        href: 'ctf',
        auth: null,
      },
      {
        id: 161,
        name: 'challences',
        href: 'ctf/challenge',
        auth: null,
      },
      {
        id: 162,
        name: 'scoreboard',
        href: 'ctf/scoreboard',
        auth: null,
      },
      {
        id: 163,
        name: 'team',
        href: 'ctf/team',
        auth: null,
      },
      {
        id: 164,
        name: '문제 관리',
        href: 'ctf/admin/challengeManage',
        auth: null,
      },
      {
        id: 165,
        name: '제출 로그',
        href: 'ctf/admin/submission',
        auth: null,
      },
      {
        id: 166,
        name: '대회 운영',
        href: 'ctf/admin/operation',
        auth: null,
      },
    ],
  },
  {
    id: 7,
    name: '관리자페이지',
    subs: [
      {
        id: 170,
        name: '직책관리',
        href: 'admin/temp0',
        auth: ['ROLE_회장'],
      },
      {
        id: 171,
        name: '선거 관리',
        href: 'admin/temp1',
        auth: ['ROLE_회장', 'ROLE_부회장'],
      },
      {
        id: 172,
        name: '도서 관리',
        href: 'admin/library',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_사서'],
      },
      {
        id: 173,
        name: '기자재 관리',
        href: 'admin/equipment',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_사서'],
      },
      {
        id: 174,
        name: '세미나 관리',
        href: 'admin/seminar',
        auth: ['ROLE_회장', 'ROLE_부회장'],
      },
      {
        id: 175,
        name: '활동인원관리',
        href: 'admin/temp3',
        auth: ['ROLE_회장', 'ROLE_부회장'],
      },
      {
        id: 176,
        name: '상벌점 관리',
        href: 'admin/temp4',
        auth: ['ROLE_회장', 'ROLE_부회장'],
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
