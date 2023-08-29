import React from 'react';
import { useGetEachPostQuery } from '@api/postApi';
import { useParams } from 'react-router-dom';
import CommentSection from './Section/CommentSection';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';
import PostSection from './Section/PostSection';
import BannerSection from './Section/BannerSection';

const BoardView = () => {
  const { postId: postIdStr } = useParams();
  const postId = Number(postIdStr);

  const { data: postInfo } = useGetEachPostQuery(postId);

  if (!postInfo) return null;

  return (
    <div className="-mt-16 space-y-12">
      <div className="space-y-2">
        <BannerSection postId={postId} post={postInfo} />
        <PostSection postId={postId} post={postInfo} />
      </div>
      <AdjacentPostNavSection previousPost={postInfo.previousPost} nextPost={postInfo.nextPost} />
      <CommentSection postId={postId} allowComment={postInfo.allowComment} />
    </div>
  );
};

export default BoardView;
