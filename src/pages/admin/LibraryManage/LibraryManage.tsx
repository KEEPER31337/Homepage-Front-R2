import React, { useState } from 'react';
import StandardTab from '@components/Tab/StandardTab';
import BookManageTab from './Tab/BookManageTab';
import BorrowingStatusTab from './Tab/BorrowingStatusTab';
import RequestManageTab from './Tab/RequestManageTab';

const LibraryManage = () => {
  const tabList = [
    { id: 0, label: '도서 관리' },
    { id: 1, label: '승인 요청' },
    { id: 2, label: '대출 현황' },
  ];
  const [tab, setTab] = useState(0);

  return (
    <>
      <StandardTab options={tabList} tab={tab} setTab={setTab} />
      <div className="mt-10">
        {tab === 0 && <BookManageTab />}
        {tab === 1 && <RequestManageTab />}
        {tab === 2 && <BorrowingStatusTab />}
      </div>
    </>
  );
};

export default LibraryManage;
