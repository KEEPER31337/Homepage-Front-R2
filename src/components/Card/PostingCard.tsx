import React from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { AiFillLock } from 'react-icons/ai';
import { VscComment, VscEye, VscThumbsup } from 'react-icons/vsc';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { getServerImgUrl } from '@utils/converter';
import ServerAvatar from '@components/Avatar/ServerAvatar';
import { Row } from '@components/Table/StandardTable.interface';
import { CardDetailInfoProps, CardMainInfoProps, InteractionScoreProps } from './PostingCard.interface';

export interface PostingCardProps extends CardMainInfoProps, CardDetailInfoProps, InteractionScoreProps {
  thumbnailPath: string | null;
}

export const CardMainInfo = ({ title, registerTime }: CardMainInfoProps) => {
  return (
    <div className="flex justify-between">
      <Typography className="w-11/12 truncate font-semibold" variant="paragraph">
        {title}
      </Typography>
      {DateTime.fromISO(registerTime) >= DateTime.now().plus({ days: -1 }).startOf('day') && (
        <span className="m-auto h-4 w-4 rounded-sm bg-pointBlue text-center text-small leading-4 text-mainBlack">
          N
        </span>
      )}
    </div>
  );
};

export const CardDetailInfo = ({ writerThumbnailPath, writerName, registerTime }: CardDetailInfoProps) => {
  return (
    <div className="flex">
      <ServerAvatar className="mr-2 !h-6 !w-6" thumbnailPath={writerThumbnailPath} />
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

export const InteractionScore = ({ visitCount, commentCount, likeCount }: InteractionScoreProps) => {
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

const PostingCard = <T,>({
  row,
  onClick,
}: {
  row: PostingCardProps & Row<T>;
  onClick?: ({ rowData }: { rowData: Row<T> }) => void;
}) => {
  return (
    <Card
      className={`${
        onClick ? 'hover:cursor-pointer hover:brightness-[.8] hover:drop-shadow-none' : ''
      } w-full !rounded-none !bg-middleBlack !bg-none sm:w-52`}
      onClick={onClick ? () => onClick({ rowData: row }) : undefined}
    >
      {row.isSecret && <AiFillLock size={50} className="m-auto h-[118px] fill-pointBlue/30" />}
      {!row.isSecret &&
        (row.thumbnailPath ? (
          <CardMedia
            className="h-[118px] bg-middleBlack"
            component="img"
            src={getServerImgUrl(row.thumbnailPath)}
            alt="썸네일"
          />
        ) : (
          <Logo className="m-auto h-[118px] w-28" />
        ))}
      <CardContent className="flex h-24 flex-col justify-between !bg-mainBlack !p-3">
        <CardMainInfo isSecret={row.isSecret} title={row.title} registerTime={row.registerTime} />
        <div className="relative flex items-end justify-between">
          <CardDetailInfo
            writerThumbnailPath={row.writerThumbnailPath}
            writerName={row.writerName}
            registerTime={row.registerTime}
          />
          <InteractionScore visitCount={row.visitCount} commentCount={row.commentCount} likeCount={row.likeCount} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostingCard;
