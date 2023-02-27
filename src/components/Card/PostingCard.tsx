import React from 'react';
import { Avatar, Card, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@material-tailwind/react';
import { VscComment, VscEye } from 'react-icons/vsc';
import { DateTime } from 'luxon';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { CardDetailInfoProps, CardMainInfoProps, InteractionScoreProps } from './PostingCard.interface';

interface PostingCardProps extends CardMainInfoProps, CardDetailInfoProps, InteractionScoreProps {
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

const InteractionScore = ({ visitCount, commentCount }: InteractionScoreProps) => {
  return (
    <div className="flex space-x-1.5 text-pointBlue">
      <div className="flex items-center">
        <VscEye className="mr-0.5" size={12} color="#4CEEF9" />
        <Typography className="mt-0.5 font-normal" variant="small">
          {visitCount}
        </Typography>
      </div>
      <div className="flex items-center">
        <VscComment className="mr-0.5" size={12} color="#4CEEF9" />
        <Typography className="mt-0.5 font-normal" variant="small">
          {commentCount}
        </Typography>
      </div>
    </div>
  );
};

const PostingCard = ({
  thumbnailPath,
  type,
  title,
  writerThumbnailPath,
  writer,
  registerTime,
  visitCount,
  commentCount,
}: PostingCardProps) => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      {thumbnailPath ? (
        <CardMedia className="h-[118px] bg-middleBlack" component="img" src={thumbnailPath} alt="썸네일" />
      ) : (
        <Logo className="m-auto h-[118px] w-28" />
      )}
      <CardContent className="flex h-24 flex-col justify-between !bg-mainBlack !p-3">
        <CardMainInfo type={type} title={title} />
        <div className="flex items-end justify-between">
          <CardDetailInfo writerThumbnailPath={writerThumbnailPath} writer={writer} registerTime={registerTime} />
          <InteractionScore visitCount={visitCount} commentCount={commentCount} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostingCard;
