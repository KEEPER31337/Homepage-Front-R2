import React from 'react';
import { Select, Option, Input, Button, Checkbox } from '@material-tailwind/react';
import StandardTable from '@components/Table/StandardTable';

interface IExampleRow {
  id: number;
  checkboxEnable: JSX.Element;
  bookTitle: string;
  bookWriter: string;
  bookStatus: string;
  bookInfo: string;
  bookEnable: JSX.Element;
}

const BookEnableText = ({ enable }: { enable: boolean }) => {
  return enable === true ? (
    <div className="h-fit w-fit text-pointBlue">대출가능</div>
  ) : (
    <div className="h-fit w-fit text-black">대출불가</div>
  );
};

const LibraryContent = () => {
  const columns = [
    { key: 'checkboxEnable' as keyof IExampleRow, headerName: '' },
    { key: 'bookTitle' as keyof IExampleRow, headerName: '도서명' },
    { key: 'bookWriter' as keyof IExampleRow, headerName: '저자' },
    { key: 'bookStatus' as keyof IExampleRow, headerName: '대출현황' },
    { key: 'bookInfo' as keyof IExampleRow, headerName: '대출정보' },
    { key: 'bookEnable' as keyof IExampleRow, headerName: '대출상태' },
  ];

  const rows: IExampleRow[] = [
    {
      id: 1,
      checkboxEnable: <Checkbox />,
      bookTitle: '해킹책1',
      bookWriter: '장서윤',
      bookStatus: '3/3',
      bookInfo: '장서윤, 김은지, 송세연',
      bookEnable: <BookEnableText enable={false} />,
    },
    {
      id: 2,
      checkboxEnable: <Checkbox />,
      bookTitle: '보안책2',
      bookWriter: '아주아주 이름 긴 김은지',
      bookStatus: '1/10',
      bookInfo: '누가 빌려갔냐!',
      bookEnable: <BookEnableText enable />,
    },
    {
      id: 3,
      checkboxEnable: <Checkbox />,
      bookTitle: '아주아주 긴 보안책',
      bookWriter: '장서윤',
      bookStatus: '1/1',
      bookInfo: '접니다',
      bookEnable: <BookEnableText enable={false} />,
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-[32px] bg-subBlack pt-[80px]">
      <p className="font-[28pt] text-pointBlue">도서검색</p>
      <div className="flex h-fit w-full justify-between">
        <div className="flex w-fit">
          <Select className="border-pointBlue text-white" variant="standard" value="도서명+저자">
            <Option>도서명+저자</Option>
            <Option>도서명</Option>
            <Option>저자</Option>
          </Select>
          <Input className="border-pointBlue !text-white" variant="standard" placeholder="검색어를 입력하세요" />
        </div>
        <div className="flex w-fit space-x-2">
          <Button className="border-pointBlue text-pointBlue" variant="outlined">
            대출관리
          </Button>
          <Button className="border-pointBlue text-pointBlue" variant="outlined">
            반납관리
          </Button>
          <div className="h-full w-0.5 bg-pointBlue opacity-30" />
          <Button className="border-pointBlue text-pointBlue" variant="outlined">
            도서추가
          </Button>
          <Button className="border-pointBlue text-pointBlue" variant="outlined">
            도서삭제
          </Button>
        </div>
      </div>
      <div className="flex w-full border border-deep-orange-300 bg-white text-white">
        <StandardTable<IExampleRow> columns={columns} rows={rows} />
      </div>
    </div>
  );
};

const LibraryManage = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] bg-gray-300">
      <div className="h-[100vh] w-[320px] border border-black bg-white">사이드 바</div>
      <div className="flex w-full justify-center bg-subBlack">
        <div className="h-full w-full max-w-[1080px] bg-subBlack">
          <LibraryContent />
        </div>
      </div>
    </div>
  );
};

export default LibraryManage;
