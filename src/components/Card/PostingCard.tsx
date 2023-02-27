import React from 'react';
import { Avatar, Card, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { DateTime } from 'luxon';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { CardDetailInfoProps, CardMainInfoProps } from './PostingCard.interface';

interface PostingCardProps extends CardMainInfoProps, CardDetailInfoProps {
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

const CardDetailInfo = ({ writerThumbnailPath, writer, registerTime }: CardDetailInfoProps) => {
  return (
    <div className="flex">
      <Avatar className="mr-2 !h-6 !w-6" src={writerThumbnailPath} />
      <div>
        <Typography className="font-medium" variant="small">
          {writer}
        </Typography>
        <Typography className="font-semibold text-subGray" variant="small">
          {DateTime.fromISO(registerTime).toFormat('yyyy.MM.dd')}
        </Typography>
      </div>
    </div>
  );
};

const PostingCard = ({ thumbnailPath, type, title, writerThumbnailPath, writer, registerTime }: PostingCardProps) => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      {thumbnailPath ? (
        <CardMedia className="h-[118px] bg-middleBlack" component="img" src={thumbnailPath} alt="썸네일" />
      ) : (
        <Logo className="m-auto h-[118px] w-28" />
      )}
      <CardContent className="flex h-24 flex-col justify-between !bg-mainBlack !p-3">
        <CardMainInfo type={type} title={title} />
        <CardDetailInfo writerThumbnailPath={writerThumbnailPath} writer={writer} registerTime={registerTime} />
      </CardContent>
    </Card>
  );
};

export default PostingCard;
