import React from 'react';
import { Avatar, Chip, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { PostInfo } from '@api/dto';
import { VscCalendar, VscEye } from 'react-icons/vsc';
import ServerImg from '@components/Image/ServerImg';

interface BannerSectionProps {
  post: PostInfo;
}

const BannerSection = ({ post }: BannerSectionProps) => {
  return (
    <div className="relative bg-mainBlack px-6 py-2">
      <div className="opacity-10">
        <ServerImg
          src={post.thumbnailPath}
          alt="post thumbnail"
          className="absolute inset-0 h-full w-full object-cover"
          errorClassName="absolute inset-0 h-2/3 w-2/3 m-auto"
        />
      </div>
      <div className="mx-auto mt-10 max-w-xl text-center">
        <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label={post.categoryName} />
        <Typography variant="h3" className="flex h-12 items-center justify-center !font-semibold">
          {post.title}
        </Typography>
        <div className="flex items-center justify-center gap-2 text-small leading-8 text-gray-300">
          <div className="flex items-center justify-center">
            <Avatar className="mr-1 !h-4 !w-4" src={post.writerThumbnailPath ?? undefined} />
            {post.writerName}
          </div>
          <div className="flex items-center justify-center">
            <VscCalendar className="mr-1 h-4 w-4" />
            {post.registerTime}
          </div>
          <div className="flex items-center justify-center">
            <VscEye className="mr-1 h-4 w-4" />
            {post.visitCount}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton>글 수정</OutlinedButton>
        <OutlinedButton>글 삭제</OutlinedButton>
      </div>
    </div>
  );
};

export default BannerSection;
