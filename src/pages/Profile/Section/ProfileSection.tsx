import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Typography, useMediaQuery, useTheme } from '@mui/material';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    <div className="flex w-full space-x-6 space-y-0 p-4 xl:flex-col xl:space-x-0 xl:space-y-4">
      <div className="flex w-1/2 flex-col items-center space-y-2  xl:w-full">
        <Avatar
          className="!h-40 !w-40 !bg-subBlack !text-white lg:!h-60 lg:!w-60"
          src={profileInfo?.thumbnailPath ? getServerImgUrl(profileInfo?.thumbnailPath) : ''}
        />
        <div className="flex w-full justify-between  ">
          <Typography variant={`${isMobile ? 'h3' : 'h1'}`} className="!font-semibold">
            {profileInfo?.realName}
          </Typography>
          <BadgeSection memberType={profileInfo?.memberType || ''} memberJobs={profileInfo?.memberJobs || []} />
        </div>
        <div className="flex  w-full ">
          <div className="flex flex-col space-y-2  pr-2">
            <Typography>기수</Typography>
            <Typography>이메일</Typography>
            <Typography>생년월일</Typography>
          </div>
          <div className="flex flex-col space-y-2  ">
            <Typography>{profileInfo?.generation}기</Typography>
            <Typography>{profileInfo?.emailAddress}</Typography>
            <Typography>{profileInfo?.birthday}</Typography>
          </div>
        </div>
      </div>
      <div className="flex h-full w-1/2 flex-col justify-between space-y-5 xl:w-full ">
        <div className="space-y-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full border border-pointBlue" />
            <Typography variant={`${isMobile ? 'paragraph' : 'h1'}`}>POINT</Typography>
            <Typography variant={`${isMobile ? 'paragraph' : 'h3'}`} className="!text-pointBlue">
              {profileInfo?.point}
            </Typography>
            <div className="w-full border border-pointBlue" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-center">
              <TextButton
                small={isMobile}
                className={`${followState !== 'follower' && '!text-white'} !p-0 !font-medium`}
                onClick={() => handleFollowStateButtonClick('follower')}
              >
                팔로워 {followInfo.follower.list.length}
              </TextButton>
              <TextButton
                small={isMobile}
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
                <div className="text-center text-small sm:text-paragraph">
                  {followInfo[followState].state} 목록이 없습니다
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {profileInfo && checkIsMyId(profileInfo.id) ? (
            <>
              <OutlinedButton small={isMobile} className="w-full" onClick={() => setEditProfileModalOpen(true)}>
                프로필 수정
              </OutlinedButton>
              <OutlinedButton small={isMobile} className="w-full" onClick={() => setEditAccountModalOpen(true)}>
                계정 정보 수정
              </OutlinedButton>
            </>
          ) : (
            <>
              <OutlinedButton small={isMobile} className="w-full" onClick={handleFollowButtonClick}>
                {isFollowed() ? '언팔로우' : '팔로우'}
              </OutlinedButton>
              <OutlinedButton small={isMobile} className="w-full">
                포인트 선물
              </OutlinedButton>
            </>
          )}
        </div>
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
