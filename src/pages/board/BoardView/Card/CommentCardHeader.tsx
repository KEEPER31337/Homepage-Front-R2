import React from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { CommentInfo } from '@api/dto';

interface CommentCardHeaderProps {
  commentInfo: CommentInfo;
}

const CommentCardHeader = ({ commentInfo }: CommentCardHeaderProps) => {
  return (
    <CardHeader
      avatar={<Avatar className="!h-7 !w-7" alt="프로필 이미지" src={commentInfo.writerThumbnailPath ?? undefined} />}
      action={
        <div className="space-x-2">
          <OutlinedButton startIcon={<MdThumbUp />}>{commentInfo.likeCount}</OutlinedButton>
          <OutlinedButton startIcon={<MdThumbDown />}>{commentInfo.dislikeCount}</OutlinedButton>
          <IconButton>
            <GoKebabHorizontal className="fill-subGray" />
          </IconButton>
        </div>
      }
      title={commentInfo.writerName}
      subheader={undefined /* TODO 경과 시간 */}
    />
  );
};

export default CommentCardHeader;
