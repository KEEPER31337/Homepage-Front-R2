interface BoardRow {
  id: number;
  no: number;
  title: string;
  writer: string;
  writerId: number;
  writerThumbnailPath: string | null;
  size: number;
  visitCount: number;
  commentCount: number;
  registerTime: string;
  isNotice: boolean;
  isSecret: boolean;
  isTemp: boolean;
  category: string;
  categoryId: number;
  thumbnailPath: string | null;
}

interface BoardColumn {
  key: keyof BoardRow;
  headerName: string;
}

const dummyColumn: BoardColumn[] = [
  { key: 'no', headerName: '번호' },
  { key: 'title', headerName: '제목' },
  { key: 'writer', headerName: '작성자' },
  { key: 'registerTime', headerName: '작성일' },
  { key: 'visitCount', headerName: '조회수' },
];

const dummyRow: BoardRow[] = [
  {
    id: 1,
    no: 1,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 1,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 1,
    visitCount: 1,
    commentCount: 1,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 1,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 2,
    no: 2,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 2,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 2,
    visitCount: 2,
    commentCount: 2,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 2,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 3,
    no: 3,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 3,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 3,
    visitCount: 3,
    commentCount: 3,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 3,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 4,
    no: 4,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 4,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 4,
    visitCount: 4,
    commentCount: 4,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 5,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 5,
    no: 5,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 5,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 5,
    visitCount: 5,
    commentCount: 5,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 6,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 6,
    no: 6,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 6,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 6,
    visitCount: 6,
    commentCount: 6,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 7,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 7,
    no: 7,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 7,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 7,
    visitCount: 7,
    commentCount: 7,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 7,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
  {
    id: 8,
    no: 8,
    title: '아무데이터',
    writer: '김개똥1',
    writerId: 8,
    writerThumbnailPath: 'https://avatars.githubusercontent.com/u/81643702?s=64&v=4',
    size: 8,
    visitCount: 8,
    commentCount: 8,
    registerTime: '2023-03-23T09:06:30.427106707',
    isNotice: true,
    isSecret: false,
    isTemp: false,
    category: '카테고리1',
    categoryId: 8,
    thumbnailPath:
      'https://photo.coolenjoy.co.kr/data/editor/1812/20181203170202_6507e3778c4259d4b85f127e40a9d5fe_ya7x.jpg',
  },
];

export { dummyRow, dummyColumn };
