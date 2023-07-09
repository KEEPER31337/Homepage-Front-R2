import React, { useState } from 'react';
import { Avatar, CardActions, TextField, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { CommentInfo } from '@api/dto';

interface CommentCardFooterProps {
  commentInfo: CommentInfo;
}

const CommentCardFooter = ({ commentInfo }: CommentCardFooterProps) => {
  const [replyOpen, setReplyOpen] = useState(false);

  const handleReplyClick = () => {
    setReplyOpen(true);
  };

  const handleWriteReplyClick = () => {
    // TODO 대댓글 생성 API 적용
    setReplyOpen(false);
  };

  return (
    <CardActions className="border-t border-subBlack bg-middleBlack">
      {replyOpen ? (
        <div className="w-full space-y-4 p-1">
          <TextField
            className="bg-mainBlack"
            placeholder="대댓글..."
            fullWidth
            multiline
            rows={4}
            onClick={handleReplyClick}
          />
          <div className="flex justify-end">
            <OutlinedButton onClick={handleWriteReplyClick}>대댓글 작성</OutlinedButton>
          </div>
        </div>
      ) : (
        <>
          <Avatar alt="프로필 이미지" src={commentInfo.writerThumbnailPath ?? undefined} />
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
