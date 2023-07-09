import React from 'react';
import { Typography } from '@mui/material';
import CustomBadge from '@components/Badge/CustomBadge';
import comments from '@mocks/commentApi';
import CommentCard from '../Card/CommentCard';

const CommentSection = () => {
  const commentList = comments; // TODO API 받아오기 (댓글, 대댓글 필터링 필요)
  const commentCount = comments.length;

  return (
    <div>
      <div className="mb-4 flex items-center">
        <Typography variant="h3" fontWeight="bold" marginRight={1}>
          댓글
        </Typography>
        <CustomBadge>{commentCount}</CustomBadge>
      </div>
      {commentList.map((comment) => (
        <CommentCard key={comment.commentId} commentInfo={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
