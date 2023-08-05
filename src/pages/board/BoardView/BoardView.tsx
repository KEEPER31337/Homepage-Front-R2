import React from 'react';
import { useGetEachPostQuery } from '@api/postApi';
import CommentSection from './Section/CommentSection';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';
import PostSection from './Section/PostSection';
import BannerSection from './Section/BannerSection';

const BoardView = () => {
  const postId = 2; // TODO 게시판 목록에서 받아오기
  const { data: postInfo } = useGetEachPostQuery(postId);

  if (!postInfo) return null;

  return (
    <div className="-mt-16 space-y-12">
      <div className="space-y-2">
        <BannerSection />
        <PostSection post={postInfo} />
      </div>
      <AdjacentPostNavSection previousPost={postInfo.previousPost} nextPost={postInfo.nextPost} />
      <CommentSection />
    </div>
  );
};

export default BoardView;
