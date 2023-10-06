import React, { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import StandardTab from '@components/Tab/StandardTab';
import BookManageTab from './Tab/BookManageTab';
import BorrowingStatusTab from './Tab/BorrowingStatusTab';
import RequestManageTab from './Tab/RequestManageTab';

const LibraryManage = () => {
  const tabList = [
    { id: 0, label: '도서 관리', url: 'book' },
    { id: 1, label: '승인 요청', url: 'request' },
    { id: 2, label: '대출 현황', url: 'borrowingStatus' },
  ];

  const panels = useRoutes([
    { path: 'book', element: <BookManageTab /> },
    { path: 'request', element: <RequestManageTab /> },
    { path: 'borrowingStatus', element: <BorrowingStatusTab /> },
    { path: '*', element: <Navigate to="book" /> },
  ]);

  const [tab, setTab] = useState(0);

  return (
    <>
      <StandardTab options={tabList} tab={tab} setTab={setTab} />

      <div className="mt-10">{panels}</div>
    </>
  );
};

export default LibraryManage;
