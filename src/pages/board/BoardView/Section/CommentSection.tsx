import React from 'react';
import { Card, CardActions, Typography } from '@mui/material';
import CustomBadge from '@components/Badge/CustomBadge';
import { useCreateCommentMutation, useGetCommentQuery } from '@api/commentApi';
import { CommentInfo } from '@api/dto';
import CommentCard from '../Card/CommentCard';
import CommentWriteCardAction from '../Card/CommentWriteCardAction';

interface CommentSectionProps {
  allowComment: boolean;
  postId: number;
}

const CommentSection = ({ allowComment, postId }: CommentSectionProps) => {
  const { data: commentList } = useGetCommentQuery(postId); // TODO postId 정상적으로 받아오지 않을 경우 처리
  const { mutate } = useCreateCommentMutation();

  const handleWriteCommentClick = () => {
    // TODO 댓글 작성 API 적용
    mutate();
  };

  const getParentComment = (comments: CommentInfo[]) => {
    return comments.filter((comment) => comment.parentId === null);
  };

  const getReplyComment = (comments: CommentInfo[], parentId: number | null) => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  if (!commentList || !allowComment) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center">
        <Typography variant="h3" marginRight={1} className="!font-semibold">
          댓글
        </Typography>
        <CustomBadge>{commentList.length}</CustomBadge>
      </div>
      <div className="space-y-4">
        {getParentComment(commentList).map((comment) => (
          <CommentCard
            key={comment.commentId}
            commentInfo={comment}
            replyComments={getReplyComment(commentList, comment.commentId)}
          />
        ))}
      </div>
      <Card className={commentList.length > 0 ? 'mt-11' : ''}>
        <CardActions className="border-t border-subBlack bg-middleBlack">
          <CommentWriteCardAction
            textFieldProps={{ placeholder: '댓글...' }}
            writeButtonName="댓글 작성"
            onWriteButtonClick={handleWriteCommentClick}
          />
        </CardActions>
      </Card>
    </section>
  );
};

export default CommentSection;
