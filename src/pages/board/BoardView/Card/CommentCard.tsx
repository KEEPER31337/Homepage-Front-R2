import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CommentInfo } from '@api/dto';
import CommentCardFooter from './CommentCardFooter';
import CommentCardHeader from './CommentCardHeader';
import ReplyCard from './ReplyCard';

interface CommentCardProps {
  commentInfo: CommentInfo;
  replyComments: CommentInfo[];
}

const CommentCard = ({ commentInfo, replyComments }: CommentCardProps) => {
  return (
    <Card className="!bg-mainBlack !bg-none">
      <CommentCardHeader commentInfo={commentInfo} />
      <CardContent className="mb-5 !px-16">
        {commentInfo.content && <Typography marginBottom={5}>{commentInfo.content}</Typography>}
        <div className="space-y-3">
          {replyComments.map((replyComment) => (
            <ReplyCard key={replyComment.commentId} commentInfo={replyComment} />
          ))}
        </div>
      </CardContent>
      {commentInfo.content && <CommentCardFooter commentInfo={commentInfo} />}
    </Card>
  );
};

export default CommentCard;
