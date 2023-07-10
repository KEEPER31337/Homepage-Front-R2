import React from 'react';
import { Card, CardActions, Typography } from '@mui/material';
import CustomBadge from '@components/Badge/CustomBadge';
import comments from '@mocks/commentApi';
import CommentCard from '../Card/CommentCard';
import CommentWriteCardAction from '../Card/CommentWriteCardAction';

const CommentSection = () => {
  const commentList = comments; // TODO API 받아오기 (댓글, 대댓글 필터링 필요)
  const commentCount = comments.length;

  const handleWriteCommentClick = () => {
    // TODO 댓글 작성 API 적용
  };

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
      <Card className="mt-11">
        <CardActions className="border-t border-subBlack bg-middleBlack">
          <CommentWriteCardAction
            textFieldProps={{ placeholder: '댓글...' }}
            writeButtonName="댓글 작성"
            onWriteButtonClick={handleWriteCommentClick}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default CommentSection;
