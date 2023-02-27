import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';

const PostingCard = () => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      <CardMedia className="h-[118px] bg-middleBlack" component="img" alt="썸네일" />
      <CardContent className="h-24 !bg-mainBlack" />
    </Card>
  );
};

export default PostingCard;
