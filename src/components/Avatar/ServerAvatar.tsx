import React from 'react';
import { Avatar } from '@mui/material';
import { getServerImgUrl } from '@utils/converter';

interface ServerAvatarProps {
  className?: string;
  thumbnailPath?: string | null;
}

const ServerAvatar = ({ className, thumbnailPath }: ServerAvatarProps) => {
  return <Avatar className={className} src={thumbnailPath ? getServerImgUrl(thumbnailPath) : ''} />;
};

export default ServerAvatar;
