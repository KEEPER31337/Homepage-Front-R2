import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import BoringAvatars from 'boring-avatars';
import { KEEPER_COLOR } from '@constants/keeperTheme';
import { getServerImgUrl } from '@utils/converter';

interface CommonAvatarProps {
  userId: number;
  thumbnailPath: string | null;
  className?: string;
}

const ANONYMOUS_USER_ID = 1;
const KEEPER_AVATAR_COLORS = [
  KEEPER_COLOR.mainBlack,
  KEEPER_COLOR.middleBlack,
  KEEPER_COLOR.subBlack,
  KEEPER_COLOR.pointBlue,
  KEEPER_COLOR.subGray,
  KEEPER_COLOR.subRed,
  KEEPER_COLOR.subOrange,
];

const CommonAvatar = ({ userId, thumbnailPath, className }: CommonAvatarProps) => {
  const canIdentifyUser = Number.isInteger(userId) && userId > 0 && userId !== ANONYMOUS_USER_ID;

  // MUI Avatar는 src -> children -> default 이미지 순으로 fall back함.
  
  // 아래 코드 구조면
  
  // 익명 유저 -> MUI default Avatar로 감.
  
  // 서버 이미지가 있으면 -> src를 사용하고
  // 서버 이미지가 없거나 로딩에 실패하면 -> userId 기반 BoringAvatars로 만들어진 SVG 프로필을 사용함.
  // user id가 이상하거나, 없는 특별한 예외사항들은 children도 제거해 모두 MUI default Avatar로 감.

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
