// 카테고리: 0~9
// 서브카테고리: 서브 카테고리 순서*10 + 상위 카테고리 id
// 서브 카테고리 목록(회장,부회장,서기): 1000번대
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
        id: 110,
        name: '건의사항',
        href: 'board/건의사항',
        auth: null,
      },
      {
        id: 120,
        name: '자유게시판',
        href: 'board/자유게시판',
        auth: null,
      },
      {
        id: 130,
        name: '익명게시판',
        href: 'board/익명게시판',
        auth: null,
      },
      {
        id: 140,
        name: '졸업생게시판',
        href: 'board/졸업생게시판',
        auth: null,
      },
      {
        id: 150,
        name: '정보게시판',
        href: 'board/정보게시판',
        auth: null,
      },
      {
        id: 160,
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
        id: 101,
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
        id: 121,
        name: '기술문서',
        href: 'board/기술문서',
        auth: null,
      },
      {
        id: 131,
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
        id: 103,
        name: '도서 검색',
        href: 'library',
        auth: null,
      },
      {
        id: 113,
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
        id: 104,
        name: '랭킹',
        href: 'ranking',
        auth: null,
      },
      {
        id: 114,
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
        id: 105,
        name: '세미나 출석 체크',
        href: 'seminar',
        auth: null,
      },
      {
        id: 115,
        name: '임원진 투표',
        href: 'vote',
        auth: null,
      },
      {
        id: 125,
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
        id: 106,
        name: 'CTF',
        href: 'ctf',
        auth: null,
      },
      {
        id: 116,
        name: 'challences',
        href: 'ctf/challenge',
        auth: null,
      },
      {
        id: 126,
        name: 'scoreboard',
        href: 'ctf/scoreboard',
        auth: null,
      },
      {
        id: 136,
        name: 'team',
        href: 'ctf/team',
        auth: null,
      },
      {
        id: 146,
        name: '문제 관리',
        href: 'ctf/admin/challengeManage',
        auth: null,
      },
      {
        id: 156,
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
    name: '관리자',
    subs: [
      {
        id: 1000,
        name: '회장/부회장',
        href: '',
        auth: [],
      },
      {
        id: 107,
        name: '직책 관리',
        href: 'admin/temp0',
        auth: ['ROLE_회장', 'ROLE_부회장'],
      },
      {
        id: 117,
        name: '선거 관리',
        href: 'admin/temp1',
        auth: ['ROLE_회장', 'ROLE_부회장'],
      },
      {
        id: 1001,
        name: '사서',
        href: '',
        auth: [],
      },
      {
        id: 127,
        name: '도서 관리',
        href: 'admin/library',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_사서'],
      },
      {
        id: 137,
        name: '기자재 관리',
        href: 'admin/equipment',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_사서'],
      },

      {
        id: 1002,
        name: '서기',
        href: '',
        auth: [],
      },
      {
        id: 147,
        name: '세미나 관리',
        href: 'admin/seminar',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'],
      },
      {
        id: 157,
        name: '활동인원 관리',
        href: 'admin/temp3',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'],
      },
      {
        id: 167,
        name: '상벌점 관리',
        href: 'admin/temp4',
        auth: ['ROLE_회장', 'ROLE_부회장', 'ROLE_서기'],
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
