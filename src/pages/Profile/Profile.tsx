import React, { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import StandardTab from '@components/Tab/StandardTab';
import ProfileSection from './Section/ProfileSection';
import AttendanceTab from './Tab/AttendanceTab/AttendanceTab';
import BoardTab from './Tab/BoardTab/BoardTab';
import BookTab from './Tab/BookTab/BookTab';
import PointTab from './Tab/PointTab/PointTab';

const Profile = () => {
  const tabList = [
    { id: 0, label: '출석부', url: 'attendance' },
    { id: 1, label: '작성글', url: 'board' },
    { id: 2, label: '도서', url: 'book' },
    { id: 3, label: '포인트 내역', url: 'point' },
  ];

  const panels = useRoutes([
    { path: 'attendance', element: <AttendanceTab /> },
    { path: 'board', element: <BoardTab /> },
    { path: 'book', element: <BookTab /> },
    { path: 'point', element: <PointTab /> },
    { path: '*', element: <Navigate to="attendance" /> },
  ]);

  const [tab, setTab] = useState(0);

  return (
    <div className="flex w-full flex-col justify-start sm:mb-40 sm:mt-header xl:flex-row xl:justify-center">
      <div className="flex w-full border border-subGray xl:h-full xl:w-80">
        <ProfileSection />
      </div>
      <div className="flex w-full max-w-container flex-col xl:h-full">
        <StandardTab options={tabList} tab={tab} setTab={setTab} />
        <div className="mt-4 flex h-full border border-subGray p-4">{panels}</div>
      </div>
    </div>
  );
};

export default Profile;
