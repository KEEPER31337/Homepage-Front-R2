import React from 'react';
import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { VscComment, VscEye, VscThumbsup } from 'react-icons/vsc';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { getServerImgUrl } from '@utils/converter';
import { CardDetailInfoProps, CardMainInfoProps, InteractionScoreProps } from './PostingCard.interface';

export interface PostingCardProps extends CardMainInfoProps, CardDetailInfoProps, InteractionScoreProps {
  thumbnailPath: string | null;
}

const CardMainInfo = ({ type, title }: CardMainInfoProps) => {
  return (
    <div>
      <Typography className="!-mt-2 h-3 font-medium text-pointBlue" variant="small">
        {type ?? ''}
      </Typography>
      <Typography className="font-semibold" variant="paragraph">
        {title}
      </Typography>
    </div>
  );
};

const CardDetailInfo = ({ writerThumbnailPath, writerName, registerTime }: CardDetailInfoProps) => {
  return (
    <div className="flex">
      <Avatar className="mr-2 !h-6 !w-6" src={writerThumbnailPath ?? undefined} />
      <Stack>
        <Typography className="font-medium" variant="small">
          {writerName}
        </Typography>
        <Typography className="font-semibold text-subGray" variant="small">
          {registerTime}
        </Typography>
      </Stack>
    </div>
  );
};

const InteractionScore = ({ visitCount, commentCount, likeCount }: InteractionScoreProps) => {
  return (
    <div className="absolute bottom-0 right-0 flex space-x-1 text-pointBlue">
      <div className="flex items-center">
        <VscEye className="mr-0.5 fill-pointBlue" size={12} />
        <Typography variant="small">{visitCount}</Typography>
      </div>
      <div className="flex items-center">
        <VscThumbsup className="mr-0.5 fill-pointBlue" size={12} />
        <Typography variant="small">{likeCount}</Typography>
      </div>
      <div className="flex items-center">
        <VscComment className="mr-0.5 fill-pointBlue" size={12} />
        <Typography variant="small">{commentCount}</Typography>
      </div>
    </div>
  );
};

const PostingCard = ({
  thumbnailPath,
  type,
  title,
  writerThumbnailPath,
  writerName,
  registerTime,
  visitCount,
  commentCount,
  likeCount,
}: PostingCardProps) => {
  return (
    <Card className="w-52 !rounded-none !bg-middleBlack !bg-none">
      {thumbnailPath ? (
        <CardMedia
          className="h-[118px] bg-middleBlack"
          component="img"
          src={getServerImgUrl(thumbnailPath)}
          alt="썸네일"
        />
      ) : (
        <Logo className="m-auto h-[118px] w-28" />
      )}
      <CardContent className="flex h-24 flex-col justify-between !bg-mainBlack !p-3">
        <CardMainInfo type={type} title={title} />
        <div className="relative flex items-end justify-between">
          <CardDetailInfo
            writerThumbnailPath={writerThumbnailPath}
            writerName={writerName}
            registerTime={registerTime}
          />
          <InteractionScore visitCount={visitCount} commentCount={commentCount} likeCount={likeCount} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostingCard;
