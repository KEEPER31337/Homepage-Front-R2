import React from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { CardMainInfoProps } from './PostingCard.interface';

interface PostingCardProps extends CardMainInfoProps {
  thumbnailPath: string | null;
}

const CardMainInfo = ({ type, title }: CardMainInfoProps) => {
  return (
    <div>
      <Typography className="-mt-2 h-3 font-medium text-pointBlue" variant="small">
        {type ?? ''}
      </Typography>
      <Typography className="font-semibold" variant="paragraph">
        {title}
      </Typography>
    </div>
  );
};

const PostingCard = ({ thumbnailPath, type, title }: PostingCardProps) => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      {thumbnailPath ? (
        <CardMedia className="h-[118px] bg-middleBlack" component="img" src={thumbnailPath} alt="썸네일" />
      ) : (
        <Logo className="m-auto h-[118px] w-28" />
      )}
      <CardContent className="h-24 !bg-mainBlack">
        <CardMainInfo type={type} title={title} />
      </CardContent>
    </Card>
  );
};

export default PostingCard;
