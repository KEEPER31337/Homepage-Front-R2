import React from 'react';
import { Avatar, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { AiFillLock } from 'react-icons/ai';
import { VscComment, VscEye, VscThumbsup } from 'react-icons/vsc';
import { ReactComponent as Logo } from '@assets/logo/logo_neon.svg';
import { getServerImgUrl } from '@utils/converter';
import { Row } from '@components/Table/StandardTable.interface';
import { CardDetailInfoProps, CardMainInfoProps, InteractionScoreProps } from './PostingCard.interface';

export interface PostingCardProps extends CardMainInfoProps, CardDetailInfoProps, InteractionScoreProps {
  thumbnailPath: string | null;
}

const CardMainInfo = ({ isSecret, type, title }: CardMainInfoProps) => {
  return (
    <div>
      <Typography className="!-mt-2 h-3 font-medium text-pointBlue" variant="small">
        {type ?? ''}
      </Typography>
      <Typography className="font-semibold" variant="paragraph">
        {isSecret ? '비밀글입니다.' : title}
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
      } w-52 !rounded-none !bg-middleBlack !bg-none`}
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
        <CardMainInfo isSecret={row.isSecret} type={row.type} title={row.title} />
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
