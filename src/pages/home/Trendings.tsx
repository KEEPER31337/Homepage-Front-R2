import { TrendingPostInfo } from '@api/dto';
import { useGetRecentPostsQuery, useGetTrendPostsQuery } from '@api/postApi';
import ServerImg from '@components/Image/ServerImg';
import { Avatar, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ post }: { post: TrendingPostInfo }) => {
  return (
    <Link
      to="/"
      className="h-[350px] w-[300px] border-t-[1px] border-t-pointBlue shadow-md shadow-subGray hover:shadow-pointBlue"
    >
      <ServerImg alt="thumbnail" className="h-1/2 w-full" errorClassName="h-1/2 w-full p-10" src={post.thumbnailPath} />
      <div className="px-5">
        <Typography className="py-2 text-yellow-700">{post.categoryName}</Typography>
        <Typography variant="h5" className="mb-2">
          {post.title}
        </Typography>
        <div className="mt-5 flex flex-row">
          <Avatar alt="profile" src={post.writerThumbnailPath} className="mx-3 !h-10 !w-10 object-cover" />
          <div className="flex flex-col">
            <Typography variant="h6">{post.writerName}</Typography>
            <Typography>
              {DateTime.fromSQL(post.registerTime).toRelative()} . {post.visitCount} watch
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
