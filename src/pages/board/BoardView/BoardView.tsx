import React from 'react';
import post from '@mocks/postApi';
import CommentSection from './Section/CommentSection';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';
import PostSection from './Section/PostSection';
import BannerSection from './Section/BannerSection';

const BoardView = () => {
  const postInfo = post; // TODO API 적용

  return (
    <div className="-mt-16 space-y-16">
      <div>
        <BannerSection />
        <PostSection />
      </div>
      <AdjacentPostNavSection adjacentPosts={postInfo.adjacentPosts} />
      <CommentSection />
    </div>
  );
};

export default BoardView;
