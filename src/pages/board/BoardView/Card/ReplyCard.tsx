import React from 'react';
import { Card, Typography } from '@mui/material';
import { CommentInfo } from '@api/dto';
import CommentCardHeader from './CommentCardHeader';

interface ReplyCardProps {
  commentInfo: CommentInfo;
}

const ReplyCard = ({ commentInfo }: ReplyCardProps) => {
  return (
    <Card className="border border-subBlack !bg-middleBlack !bg-none">
      <CommentCardHeader commentInfo={commentInfo} />
      {!commentInfo.isDeleted && (
        <Typography paddingX={8} marginBottom={5}>
          {commentInfo.content}
        </Typography>
      )}
    </Card>
  );
};

export default ReplyCard;
