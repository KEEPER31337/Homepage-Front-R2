export interface Category {
  id: number;
  name: string;
}

const CATEGORIES: Category[] = [
  {
    id: 1,
    name: '게시판',
  },
  {
    id: 2,
    name: '동아리활동',
  },
  {
    id: 3,
    name: '도서/기자재',
  },
  {
    id: 4,
    name: '참여마당',
  },
  {
    id: 5,
    name: '놀이마당',
  },
  {
    id: 6,
    name: 'CTF',
  },
  {
    id: 7,
    name: '관리자페이지',
  },
];

export default CATEGORIES;
