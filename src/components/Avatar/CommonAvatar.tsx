import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import BoringAvatars from 'boring-avatars';
import { ANONYMOUS_OR_VIRTUAL_USER_ID } from '@constants/member';
import { getServerImgUrl } from '@utils/converter';

interface CommonAvatarProps {
  userId: number | null;
  thumbnailPath: string | null;
  className?: string;
}

const KEEPER_AVATAR_COLORS = [
  "#4CEEF9",
  "#575E69",
  "#fff419",
  "#f0f9fc",
];

const CommonAvatar = ({ userId, thumbnailPath, className }: CommonAvatarProps) => {
  const canIdentifyUser =
    typeof userId === 'number' && Number.isInteger(userId) && userId > 0 && userId !== ANONYMOUS_OR_VIRTUAL_USER_ID;

  // MUI Avatar는 src -> children -> default 이미지 순으로 fall back함.

  // 아래 코드 구조면

  // 익명 댓글(null) 및 익명, 탈퇴 회원을 나타내는 가상 유저(ID 1) -> thubmnail undefined로 설정 children을 제거해 MUI default Avatar로 감.

  // 서버 이미지가 있으면 -> src를 사용하고
  // 서버 이미지가 없거나 로딩에 실패하면 -> userId 기반 BoringAvatars로 만들어진 SVG 프로필을 사용함.
  // 특별한 예외사항들은 children도 제거해 모두 MUI default Avatar로 감.

  return (
    <MuiAvatar
      className={className}
      src={canIdentifyUser && thumbnailPath ? getServerImgUrl(thumbnailPath) : undefined}
    >
      {canIdentifyUser && (
        <BoringAvatars
          aria-hidden
          colors={KEEPER_AVATAR_COLORS}
          focusable="false"
          name={String(userId)}
          size="100%"
          variant="beam"
        />
      )}
    </MuiAvatar>
  );
};

export default CommonAvatar;
