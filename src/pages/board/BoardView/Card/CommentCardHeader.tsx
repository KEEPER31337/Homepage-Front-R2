import React from 'react';
import { Avatar, Button, CardHeader } from '@mui/material';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { VscTrash } from 'react-icons/vsc';
import { useControlCommentLikesMutation, useControlCommentDislikesMutation } from '@api/commentApi';
import { CommentInfo } from '@api/dto';
import useCheckAuth from '@hooks/useCheckAuth';
import CommentMenu from '../Menu/CommentMenu';

interface CommentCardHeaderProps {
  commentInfo: CommentInfo;
}

const CommentCardHeader = ({ commentInfo }: CommentCardHeaderProps) => {
  const { mutate: controlLikes } = useControlCommentLikesMutation();
  const { mutate: controlDislikes } = useControlCommentDislikesMutation();
  const { checkIsMyId } = useCheckAuth();

  const isReplyComment = Boolean(commentInfo.parentId);

  const handleLikeButtonClick = () => {
    controlLikes(commentInfo.commentId);
  };

  const handleDisikeButtonClick = () => {
    controlDislikes(commentInfo.commentId);
  };

  return !commentInfo.isDeleted ? (
    <CardHeader
      avatar={<Avatar className="!h-7 !w-7" alt="프로필 이미지" src={commentInfo.writerThumbnailPath ?? undefined} />}
      action={
        <div className="mr-1 space-x-2">
          <Button
            variant="outlined"
            startIcon={<MdThumbUp className={commentInfo.isLike ? 'fill-pointBlue' : 'fill-pointBlue/30'} />}
            onClick={handleLikeButtonClick}
          >
            {commentInfo.likeCount}
          </Button>
          <Button
            variant="outlined"
            startIcon={<MdThumbDown className={commentInfo.isDislike ? 'fill-pointBlue' : 'fill-pointBlue/30'} />}
            onClick={handleDisikeButtonClick}
          >
            {commentInfo.dislikeCount}
          </Button>
          {checkIsMyId(commentInfo.writerId) && <CommentMenu commentId={commentInfo.commentId} />}
        </div>
      }
      title={commentInfo.writerName}
      subheader={undefined /* TODO 경과 시간 */}
    />
  ) : (
    <CardHeader
      className="text-subGray"
      avatar={<VscTrash size={30} className="fill-subGray" />}
      title={isReplyComment ? '삭제된 대댓글입니다.' : '삭제된 댓글입니다.'}
    />
  );
};

export default CommentCardHeader;
