import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, CardActions, Typography } from '@mui/material';
import { useCreateCommentMutation } from '@api/commentApi';
import { CommentInfo } from '@api/dto';
import CommentWriteCardAction from './CommentWriteCardAction';

interface CommentCardFooterProps {
  commentInfo: CommentInfo;
}

const CommentCardFooter = ({ commentInfo }: CommentCardFooterProps) => {
  const { postId: postIdStr } = useParams();
  const postId = Number(postIdStr);

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { mutate: createReply } = useCreateCommentMutation();

  const handleReplyClick = () => {
    setReplyOpen(true);
  };

  const handleWriteReplyClick = () => {
    createReply({ postId, parentId: commentInfo.commentId, content: replyContent });
    setReplyOpen(false);
  };

  return (
    <CardActions className="border-t border-subBlack bg-middleBlack">
      {replyOpen ? (
        <CommentWriteCardAction
          textFieldProps={{
            value: replyContent,
            onChange: (e) => setReplyContent(e.target.value),
            placeholder: '대댓글...',
          }}
          writeButtonName="대댓글 작성"
          onWriteButtonClick={handleWriteReplyClick}
        />
      ) : (
        <>
          {/* TODO 현재 계정 프로필 썸네일 가져오기 */}
          <Avatar className="!h-7 !w-7" alt="프로필 이미지" src={commentInfo.writerThumbnailPath ?? undefined} />
          <button
            type="button"
            className="flex h-9 w-full items-center border border-subBlack bg-mainBlack pl-3"
            onClick={handleReplyClick}
          >
            <Typography variant="small" className="text-subGray">
              대댓글...
            </Typography>
          </button>
        </>
      )}
    </CardActions>
  );
};

export default CommentCardFooter;
