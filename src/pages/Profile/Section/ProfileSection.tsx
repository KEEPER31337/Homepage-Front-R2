import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { FollowInfo } from '@api/dto';
import { useGetProfileQuery, useFollowMemberMutation, useUnFollowMemberMutation } from '@api/memberApi';
import useCheckAuth from '@hooks/useCheckAuth';
import { getServerImgUrl } from '@utils/converter';
import OutlinedButton from '@components/Button/OutlinedButton';
import TextButton from '@components/Button/TextButton';
import BadgeSection from './BadgeSection';
import FollowList from './FollowList';
import EditAccountModal from '../Modal/EditAccountModal';
import EditProfileModal from '../Modal/EditProfileModal';

const ProfileSection = () => {
  const [followState, setFollowState] = useState('none');
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [editAccountModalOpen, setEditAccountModalOpen] = useState(false);

  const { memberId } = useParams();
  const { checkIsMyId } = useCheckAuth();

  const otherMemberId = Number(memberId) || 0;

  const { data: profileInfo } = useGetProfileQuery(otherMemberId);
  const { mutate: followMember } = useFollowMemberMutation(otherMemberId);
  const { mutate: unFollowMember } = useUnFollowMemberMutation(otherMemberId);

  const followInfo: { [key: string]: { state: string; list: FollowInfo[] } } = {
    follower: { state: '팔로워', list: profileInfo?.follower || [] },
    following: { state: '팔로잉', list: profileInfo?.followee || [] },
    none: { state: '', list: [] },
  };

  const isFollowed = () => {
    return profileInfo?.follower.some((follower) => checkIsMyId(follower.id));
  };

  const handleFollowStateButtonClick = (state: string) => {
    if (followState === state) setFollowState('none');
    else setFollowState(state);
  };

  const handleFollowButtonClick = () => {
    if (isFollowed()) unFollowMember();
    else followMember();
  };

  return (
    <div className="flex w-full flex-col space-y-8 p-4">
      <Avatar
        className="m-4 !h-64 !w-64 !bg-subBlack !text-white"
        src={profileInfo?.thumbnailPath ? getServerImgUrl(profileInfo?.thumbnailPath) : ''}
      />
      <div className="flex items-center justify-between">
        <Typography variant="h1" className="!font-semibold">
          {profileInfo?.realName}
        </Typography>
        <BadgeSection memberType={profileInfo?.memberType || ''} memberJobs={profileInfo?.memberJobs || []} />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <TextButton
            className={`${followState !== 'follower' && '!text-white'} !p-0 !font-medium`}
            onClick={() => handleFollowStateButtonClick('follower')}
          >
            팔로워 {followInfo.follower.list.length}
          </TextButton>
          <TextButton
            className={`${followState !== 'following' && '!text-white'} !p-0 !font-medium`}
            onClick={() => handleFollowStateButtonClick('following')}
          >
            팔로잉 {followInfo.following.list.length}
          </TextButton>
        </div>

        {followState !== 'none' &&
          (followInfo[followState].list.length !== 0 ? (
            <FollowList followlist={followInfo[followState].list} />
          ) : (
            <div className="text-center">{followInfo[followState].state} 목록이 없습니다</div>
          ))}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-full border border-pointBlue" />
        <Typography variant="h1">POINT</Typography>
        <Typography variant="h3" className="!text-pointBlue">
          {profileInfo?.point}
        </Typography>
        <div className="w-full border border-pointBlue" />
      </div>

      <div className="flex space-x-6">
        <div className="flex flex-col space-y-4">
          <Typography>기수</Typography>
          <Typography>이메일</Typography>
          <Typography>생년월일</Typography>
        </div>
        <div className="flex flex-col space-y-4">
          <Typography>{profileInfo?.generation}기</Typography>
          <Typography>{profileInfo?.emailAddress}</Typography>
          <Typography>{profileInfo?.birthday}</Typography>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {profileInfo && checkIsMyId(profileInfo.id) ? (
          <>
            <OutlinedButton className="w-full" onClick={() => setEditProfileModalOpen(true)}>
              프로필 수정
            </OutlinedButton>
            <OutlinedButton className="w-full" onClick={() => setEditAccountModalOpen(true)}>
              계정 정보 수정
            </OutlinedButton>
          </>
        ) : (
          <>
            <OutlinedButton className="w-full" onClick={handleFollowButtonClick}>
              {isFollowed() ? '언팔로우' : '팔로우'}
            </OutlinedButton>
            <OutlinedButton className="w-full">포인트 선물</OutlinedButton>
          </>
        )}
      </div>
      {profileInfo && (
        <EditProfileModal
          profileInfo={profileInfo}
          open={editProfileModalOpen}
          onClose={() => setEditProfileModalOpen(false)}
        />
      )}
      <EditAccountModal open={editAccountModalOpen} onClose={() => setEditAccountModalOpen(false)} />
    </div>
  );
};

export default ProfileSection;
