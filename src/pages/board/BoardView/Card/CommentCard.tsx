import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { CommentInfo } from '@api/dto';
import ReplyCard from './ReplyCard';
import CommentCardHeader from './CommentCardHeader';
import CommentCardFooter from './CommentCardFooter';

interface CommentCardProps {
  commentInfo: CommentInfo;
}

const CommentCard = ({ commentInfo }: CommentCardProps) => {
  return (
    <Card className="!bg-mainBlack !bg-none">
      <CommentCardHeader commentInfo={commentInfo} />
      <CardContent className="mb-5 !px-16">
        <Typography marginBottom={5}>{commentInfo.content}</Typography>
        {/* TODO 필터링된 대댓글 map으로 관리 */}
        <ReplyCard commentInfo={commentInfo} />
      </CardContent>
      <CommentCardFooter commentInfo={commentInfo} />
    </Card>
  );
};

export default CommentCard;
