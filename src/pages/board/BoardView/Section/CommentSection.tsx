import React, { useState } from 'react';
import { Card, CardActions, Typography } from '@mui/material';
import { useCreateCommentMutation, useGetCommentQuery } from '@api/commentApi';
import { CommentInfo } from '@api/dto';
import CustomBadge from '@components/Badge/CustomBadge';
import CommentCard from '../Card/CommentCard';
import CommentWriteCardAction from '../Card/CommentWriteCardAction';

interface CommentSectionProps {
  categoryName: string;
  allowComment: boolean;
  postId: number;
}

const CommentSection = ({ categoryName, allowComment, postId }: CommentSectionProps) => {
  const [commentContent, setCommentContent] = useState('');

  const { data: commentList } = useGetCommentQuery(postId); // TODO postId 정상적으로 받아오지 않을 경우 처리
  const { mutate: createComment } = useCreateCommentMutation();

  const handleWriteCommentClick = () => {
    createComment({ postId, content: commentContent });
    setCommentContent('');
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
      <div className="space-y-2 sm:space-y-4">
        {getParentComment(commentList).map((comment) => (
          <CommentCard
            key={comment.commentId}
            commentInfo={comment}
            replyComments={getReplyComment(commentList, comment.commentId)}
          />
        ))}
      </div>
      <Card className={commentList.length > 0 ? 'mt-5 sm:mt-11' : ''}>
        <CardActions className="border-t border-subBlack bg-middleBlack">
          <CommentWriteCardAction
            textFieldProps={{
              value: commentContent,
              onChange: (e) => setCommentContent(e.target.value),
              placeholder: '댓글...',
            }}
            writeButtonName="댓글 작성"
            onWriteButtonClick={handleWriteCommentClick}
          />
        </CardActions>
      </Card>
      {categoryName === '익명게시판' && (
        <div className="flex justify-end">
          <Typography marginTop={1} variant="small" className="text-subOrange">
            *익명 게시판은 댓글 삭제가 불가합니다.
          </Typography>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
