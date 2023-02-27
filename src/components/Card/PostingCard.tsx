import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';

interface PostingCardProps {
  thumbnailPath: string | null;
}

const PostingCard = ({ thumbnailPath }: PostingCardProps) => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      {thumbnailPath ? (
        <CardMedia className="h-[118px] bg-middleBlack" component="img" src={thumbnailPath} alt="썸네일" />
      ) : (
        <Logo className="m-auto h-[118px] w-28" />
      )}
      <CardContent className="h-24 !bg-mainBlack" />
    </Card>
  );
};

export default PostingCard;
