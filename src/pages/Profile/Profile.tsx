import React, { useState } from 'react';
import StandardTab from '@components/Tab/StandardTab';
import AttendanceTab from './Tab/AttendanceTab';
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
    <div className="flex h-full">
      <div className="w-1/4 border border-subGray">프로필</div>
      <div className="flex w-3/4 flex-col">
        <StandardTab options={tabList} tab={tab} setTab={setTab} />
        <div className="mt-4 h-full border border-subGray p-2">
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
