import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardActions, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useCreateCommentMutation } from '@api/commentApi';
import { CommentInfo } from '@api/dto';
import memberState from '@recoil/member.recoil';
import ServerAvatar from '@components/Avatar/ServerAvatar';
import CommentWriteCardAction from './CommentWriteCardAction';

interface CommentCardFooterProps {
  commentInfo: CommentInfo;
}

const CommentCardFooter = ({ commentInfo }: CommentCardFooterProps) => {
  const { postId: postIdStr } = useParams();
  const postId = Number(postIdStr);

  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const member = useRecoilValue(memberState);
  const { mutate: createReply } = useCreateCommentMutation();

  const handleReplyClick = () => {
    setReplyOpen(true);
  };

  const handleWriteReplyClick = () => {
    createReply({ postId, parentId: commentInfo.commentId, content: replyContent });
    setReplyOpen(false);
    setReplyContent('');
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
        <div className="flex w-full items-center justify-between gap-2">
          <ServerAvatar className="!h-7 !w-7" thumbnailPath={member?.thumbnailPath} />
          <button
            type="button"
            className="flex h-9 w-full items-center border border-subBlack bg-mainBlack pl-3"
            onClick={handleReplyClick}
          >
            <Typography variant="small" className="text-subGray">
              대댓글...
            </Typography>
          </button>
        </div>
      )}
    </CardActions>
  );
};

export default CommentCardFooter;
