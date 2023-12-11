import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { TrendingPostInfo } from '@api/dto';
import { useGetRecentPostsQuery, useGetTrendPostsQuery } from '@api/postApi';
import ServerAvatar from '@components/Avatar/ServerAvatar';
import ServerImg from '@components/Image/ServerImg';

const Card = ({ post }: { post: TrendingPostInfo }) => {
  return (
    <Link to={`/board/view/${post.id}`} className="h-80 w-72 bg-black sm:h-[320px] sm:w-[300px]">
      <ServerImg
        alt="thumbnail"
        className="h-44 w-full bg-middleBlack brightness-150"
        errorClassName="h-44 w-full p-14 bg-middleBlack brightness-150"
        src={post.thumbnailPath}
      />
      <div className="px-5">
        <Typography className="pt-5 !text-paragraph text-pointBlue">{post.categoryName}</Typography>
        <Typography variant="h3" className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {post.title}
        </Typography>
        <div className="mt-5 flex flex-row">
          <ServerAvatar thumbnailPath={post.writerThumbnailPath} className="mr-3 !h-10 !w-10" />
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
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-mainBlack px-10 py-10 sm:w-full sm:px-20">
      <div className="w-full space-y-8 sm:max-w-container">
        <div className="w-full">
          <Typography variant="h3" className="!mb-3 px-2">
            트렌딩
          </Typography>
          <div className="grid w-full grid-flow-col justify-start gap-5 overflow-x-scroll px-2 pb-5">
            {trendPosts?.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <Typography variant="h3" className="!mb-3 px-2">
            최신글
          </Typography>
          <div className="grid w-full grid-flow-col justify-start gap-5 overflow-x-scroll px-2 pb-5">
            {recentPosts?.map((post) => (
              <Card key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trendings;
