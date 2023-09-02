import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { TrendingPostInfo } from '@api/dto';
import { useGetRecentPostsQuery, useGetTrendPostsQuery } from '@api/postApi';
import ServerImg from '@components/Image/ServerImg';

const Card = ({ post }: { post: TrendingPostInfo }) => {
  return (
    <Link to={`/board/view/${post.id}`} className="h-[350px] w-[300px] bg-black">
      <ServerImg
        alt="thumbnail"
        className="h-[200px] w-full bg-[#212121]"
        errorClassName="h-[200px] w-full p-10 bg-[#212121]"
        src={post.thumbnailPath}
      />
      <div className="px-5">
        <Typography className="pt-5 !text-paragraph text-pointBlue">{post.categoryName}</Typography>
        <Typography variant="h3" className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {post.title}
        </Typography>
        <div className="mt-5 flex flex-row">
          <Avatar alt="profile" src={post.writerThumbnailPath} className="mr-3 !h-10 !w-10 object-cover" />
          <div className="flex flex-col">
            <Typography variant="paragraph">{post.writerName}</Typography>
            <Typography className="!text-[12px] text-subGray">
              {DateTime.fromSQL(post.registerTime).toRelative()} • {post.visitCount} watch
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Trendings = () => {
  const { data: trendPosts } = useGetTrendPostsQuery();
  const { data: recentPosts } = useGetRecentPostsQuery();

  return (
    <div className="flex w-full flex-col bg-mainBlack px-20">
      <div className="my-10 flex w-full flex-col">
        <Typography variant="h3" className="!mb-3 px-2">
          트렌딩
        </Typography>
        <div className="grid w-[calc(100vw-480px)] grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {trendPosts?.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="my-10 w-full">
        <Typography variant="h3" className="!mb-3 px-2">
          최신글
        </Typography>
        <div className="grid w-[calc(100vw-480px)] grid-flow-col justify-start gap-20 overflow-x-scroll px-2 pb-5">
          {recentPosts?.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trendings;
