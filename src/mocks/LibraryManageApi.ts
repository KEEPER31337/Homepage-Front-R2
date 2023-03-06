import { BookListInfo, BorrowBookInfo } from '@api/dto';

interface BookListInfoColumn {
  key: keyof BookListInfo;
  headerName: string;
}

interface BorrowBookInfoColumn {
  key: keyof BorrowBookInfo;
  headerName: string;
}

const columns: BookListInfoColumn[] = [
  {
    key: 'no',
    headerName: '번호',
  },
  { key: 'title', headerName: '도서명' },
  { key: 'author', headerName: '저자' },
  { key: 'borrowState', headerName: '대출현황' },
  { key: 'information', headerName: '대출정보' },
  {
    key: 'enable',
    headerName: '대출상태',
  },
];

const rows: BookListInfo[] = [
  {
    id: 1,
    no: 1,
    title: '해킹책1',
    author: '장서윤',
    borrowState: '3/3',
    information: '장서윤, 김은지, 송세연',
    enable: false,
  },
  {
    id: 2,
    no: 2,
    title: '보안책2',
    author: '아주아주 이름 긴 김은지',
    borrowState: '1/10',
    information: '누가 빌려갔냐!',
    enable: false,
  },
  {
    id: 3,
    no: 3,
    title: '아주아주 긴 보안책',
    author: '장서윤',
    borrowState: '1/1',
    information: '접니다',
    enable: true,
  },
];

const borrowBookInfoColumns: BorrowBookInfoColumn[] = [
  { key: 'borrower', headerName: '대출자' },
  { key: 'borrowDate', headerName: '대출일자' },
  { key: 'returnDate', headerName: '반납일자' },
];

const borrowBookInfoRows: BorrowBookInfo[] = [
  {
    id: 1,
    borrower: '회장님',
    borrowDate: '2022.01.07',
    returnDate: '2022.02.07',
  },
  {
    id: 2,
    borrower: '김은지',
    borrowDate: '2022.01.07',
    returnDate: '2022.02.07',
  },
];

export { columns, rows, borrowBookInfoColumns, borrowBookInfoRows };
