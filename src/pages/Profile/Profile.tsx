import React, { useState } from 'react';
import { Navigate, useParams, useRoutes } from 'react-router-dom';
import useCheckAuth from '@hooks/useCheckAuth';
import StandardTab from '@components/Tab/StandardTab';
import ProfileSection from './Section/ProfileSection';
import AttendanceTab from './Tab/AttendanceTab/AttendanceTab';
import AttendanceChartSection from './Tab/AttendanceTab/Section/AttendanceChartSection';
import AttendanceInfoSection from './Tab/AttendanceTab/Section/AttendanceInfoSection';
import MyBoardTab from './Tab/BoardTab/MyBoardTab';
import MemberBoardTable from './Tab/BoardTab/Table/MemberBoardTable';
import BookTab from './Tab/BookTab/BookTab';
import PointTab from './Tab/PointTab/PointTab';

const Profile = () => {
  const { memberId } = useParams();
  const profileId = Number(memberId) || 0;

  const { checkIsMyId } = useCheckAuth();

  const tabList = [
    { id: 0, label: '출석부', url: 'attendance' },
    { id: 1, label: '작성글', url: 'board' },
    { id: 2, label: '도서', url: 'book' },
    { id: 3, label: '포인트 내역', url: 'point' },
  ];

  const panels = useRoutes([
    { path: 'attendance', element: <AttendanceTab /> },
    { path: 'board', element: <MyBoardTab /> },
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
        {checkIsMyId(profileId) && (
          <>
            <StandardTab options={tabList} tab={tab} setTab={setTab} />
            <div className="mt-4 flex h-full border border-subGray p-4">{panels}</div>
          </>
        )}
        {!checkIsMyId(profileId) && (
          <div className="h-full w-full border border-subGray md:px-10 md:py-6 lg:px-12 lg:py-8">
            <AttendanceChartSection memberId={profileId} />
            <div className="mx-2 mb-10 flex flex-col gap-4 xl:flex-row">
              <AttendanceInfoSection summary memberId={profileId} />
            </div>
            <MemberBoardTable memberId={profileId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
