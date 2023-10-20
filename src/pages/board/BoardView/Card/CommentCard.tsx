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
      {(!commentInfo.isDeleted || replyComments.length > 0) && (
        <CardContent className="mb-5 whitespace-pre-line break-all sm:!px-16">
          {!commentInfo.isDeleted && <Typography marginBottom={5}>{commentInfo.content}</Typography>}
          <div className="space-y-3">
            {replyComments.map((replyComment) => (
              <ReplyCard key={replyComment.commentId} commentInfo={replyComment} />
            ))}
          </div>
        </CardContent>
      )}
      {!commentInfo.isDeleted && <CommentCardFooter commentInfo={commentInfo} />}
    </Card>
  );
};

export default CommentCard;
