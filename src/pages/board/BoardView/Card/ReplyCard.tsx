import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
        <CardContent className="mb-5 sm:!px-16">
          <Typography>{commentInfo.content}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default ReplyCard;
