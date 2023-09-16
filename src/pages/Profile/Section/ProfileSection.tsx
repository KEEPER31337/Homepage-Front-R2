import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { FollowInfo } from '@api/dto';
import { useGetProfileQuery, useFollowMemberMutation, useUnFollowMemberMutation } from '@api/memberApi';
import memberState from '@recoil/member.recoil';
import OutlinedButton from '@components/Button/OutlinedButton';
import TextButton from '@components/Button/TextButton';
import FollowList from './FollowList';

const ProfileSection = () => {
  const { memberId: otherMemberId } = useParams();
  const myMemberId = useRecoilValue(memberState)?.memberId;

  const { data: profileInfo } = useGetProfileQuery(Number(otherMemberId) || 0);
  const { mutate: FollowMember } = useFollowMemberMutation();
  const { mutate: UnFollowMember } = useUnFollowMemberMutation();

  const [followState, setFollowState] = useState('none');

  const aaa: { [key: string]: { state: string; list: FollowInfo[] } } = {
    follower: { state: '팔로워', list: profileInfo?.follower || [] },
    following: { state: '팔로잉', list: profileInfo?.followee || [] },
    none: { state: '', list: [] },
  };

  const handleFollowStateButtonClick = (state: string) => {
    if (followState === state) setFollowState('none');
    else setFollowState(state);
  };

  return (
    <div className="flex w-full flex-col space-y-8 p-4">
      <Avatar
        className="m-4 !h-64 !w-64 !bg-subBlack !text-white"
        alt="profile thumbnail"
        src={profileInfo?.thumbnailPath || ''}
      />
      <div className="flex items-center justify-between">
        <Typography variant="h1" className="!font-semibold">
          {profileInfo?.realName}
        </Typography>
        <div>뱃지</div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <TextButton
            className={`${followState !== 'follower' && '!text-white'} !p-0 !font-medium`}
            onClick={() => handleFollowStateButtonClick('follower')}
          >
            팔로워 {aaa.follower.list.length}
          </TextButton>
          <TextButton
            className={`${followState !== 'following' && '!text-white'} !p-0 !font-medium`}
            onClick={() => handleFollowStateButtonClick('following')}
          >
            팔로잉 {aaa.following.list.length}
          </TextButton>
        </div>

        {followState !== 'none' &&
          (aaa[followState].list.length !== 0 ? (
            <div className="h-[160px] overflow-auto bg-pointBlue/10">
              <FollowList followState={followState} followlist={aaa[followState].list} />
            </div>
          ) : (
            <div className="bg-pointBlue/10 text-center">{aaa[followState].state} 목록이 없습니다</div>
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

      <div className="flex space-x-5">
        <div className="flex flex-col space-y-4">
          <Typography>기수</Typography>
          <Typography>이메일</Typography>
          <Typography>생년월일</Typography>
        </div>
        <div className="flex flex-col space-y-4">
          <Typography>{profileInfo?.generation.replace('.0', '')} 기</Typography>
          <Typography>{profileInfo?.emailAddress}</Typography>
          <Typography>{profileInfo?.birthday}</Typography>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {myMemberId === profileInfo?.id ? (
          <>
            <OutlinedButton className="w-full">프로필 수정</OutlinedButton>
            <OutlinedButton className="w-full">계정 정보 수정</OutlinedButton>
          </>
        ) : (
          <>
            <OutlinedButton className="w-full" onClick={() => FollowMember(profileInfo?.id || 0)}>
              팔로우
            </OutlinedButton>
            <OutlinedButton className="w-full">포인트 선물</OutlinedButton>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
