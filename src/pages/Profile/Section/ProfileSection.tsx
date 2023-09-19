import React, { useState } from 'react';
import { Avatar, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useGetProfileQuery } from '@api/memberApi';
import memberState from '@recoil/member.recoil';
import OutlinedButton from '@components/Button/OutlinedButton';
import EditProfileModal from '../Modal/EditProfileModal';
import SendPointModal from '../Modal/SendPointModal';

const ProfileSection = () => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [sendPointModalOpen, setSendPointModalOpen] = useState(false);

  const userInfo = useRecoilValue(memberState);
  const { data: profileInfo } = useGetProfileQuery(userInfo?.memberId || 0);

  return (
    <div className="flex w-full flex-col space-y-8 p-4">
      <div className="m-4">
        <Avatar
          className="!h-64 !w-64 !bg-subBlack !text-white"
          alt="profile thumbnail"
          src={userInfo?.thumbnailPath || ''}
        />
      </div>
      <div className="flex items-center justify-between">
        <Typography variant="h1" className="!font-semibold">
          {profileInfo?.realName}
        </Typography>
        <div>뱃지</div>
      </div>

      <div className="flex space-x-5">
        <Typography className="text-pointBlue ">팔로워 0</Typography>
        <Typography>팔로잉 0</Typography>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-full border border-pointBlue" />
        <Typography variant="h1">POINT</Typography>
        <Typography variant="h3" className="!text-pointBlue">
          {profileInfo?.point}
        </Typography>
        <div className="w-full border border-pointBlue" />
      </div>

      <div className="flex space-x-5">
        <div className="flex flex-col space-y-4">
          <Typography>기수</Typography>
          <Typography>이메일</Typography>
          <Typography>생년월일</Typography>
        </div>
        <div className="flex flex-col space-y-4">
          <Typography>{profileInfo?.generation} 기</Typography>
          <Typography>{profileInfo?.emailAddress}</Typography>
          <Typography>{profileInfo?.birthday}</Typography>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <OutlinedButton className="w-full" onClick={() => setEditProfileModalOpen(true)}>
          프로필 수정
        </OutlinedButton>
        <OutlinedButton className="w-full">계정 정보 수정</OutlinedButton>
        <OutlinedButton onClick={() => setSendPointModalOpen(true)} className="w-full">
          포인트 선물
        </OutlinedButton>
      </div>
      {profileInfo && (
        <EditProfileModal
          profileInfo={profileInfo}
          open={editProfileModalOpen}
          onClose={() => setEditProfileModalOpen(false)}
        />
      )}
      <SendPointModal open={sendPointModalOpen} onClose={() => setSendPointModalOpen(false)} sendTo={4} />
    </div>
  );
};

export default ProfileSection;
