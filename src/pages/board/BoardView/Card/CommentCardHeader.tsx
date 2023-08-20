import React from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { Avatar, CardHeader } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { CommentInfo } from '@api/dto';
import { useControlCommentLikes, useControlCommentDislikes } from '@api/commentApi';
import CommentMenu from '../Menu/CommentMenu';

interface CommentCardHeaderProps {
  commentInfo: CommentInfo;
}

const CommentCardHeader = ({ commentInfo }: CommentCardHeaderProps) => {
  const { mutate: controlLikes } = useControlCommentLikes();
  const { mutate: controlDislikes } = useControlCommentDislikes();

  const handleLikeButtonClick = () => {
    controlLikes(commentInfo.commentId);
  };

  const handleDisikeButtonClick = () => {
    controlDislikes(commentInfo.commentId);
  };

  return (
    <CardHeader
      avatar={<Avatar className="!h-7 !w-7" alt="프로필 이미지" src={commentInfo.writerThumbnailPath ?? undefined} />}
      action={
        <div className="space-x-2">
          <OutlinedButton startIcon={<MdThumbUp />} onClick={handleLikeButtonClick}>
            {commentInfo.likeCount}
          </OutlinedButton>
          <OutlinedButton startIcon={<MdThumbDown />} onClick={handleDisikeButtonClick}>
            {commentInfo.dislikeCount}
          </OutlinedButton>
          <CommentMenu />
        </div>
      }
      title={commentInfo.writerName}
      subheader={undefined /* TODO 경과 시간 */}
    />
  );
};

export default CommentCardHeader;
