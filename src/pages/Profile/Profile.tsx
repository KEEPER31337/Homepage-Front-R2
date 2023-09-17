import React, { useState } from 'react';
import StandardTab from '@components/Tab/StandardTab';
import ProfileSection from './Section/ProfileSection';
import AttendanceTab from './Tab/AttendanceTab/AttendanceTab';
import BoardTab from './Tab/BoardTab';
import BookTab from './Tab/BookTab';
import PointTab from './Tab/PointTab';

const Profile = () => {
  const tabList = [
    { id: 0, label: '출석부' },
    { id: 1, label: '작성글' },
    { id: 2, label: '도서' },
    { id: 3, label: '포인트 내역' },
  ];
  const [tab, setTab] = useState(0);

  return (
    <div className="mb-40 mt-header flex w-full flex-col justify-start xl:flex-row xl:justify-center">
      <div className="flex w-full border border-subGray xl:h-full xl:w-80">
        <ProfileSection />
      </div>
      <div className="flex w-full max-w-container flex-col xl:h-full">
        <StandardTab options={tabList} tab={tab} setTab={setTab} />
        <div className="mt-4 flex h-full border border-subGray p-4">
          {tab === 0 && <AttendanceTab />}
          {tab === 1 && <BoardTab />}
          {tab === 2 && <BookTab />}
          {tab === 3 && <PointTab />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
