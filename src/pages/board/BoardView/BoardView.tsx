import React from 'react';
import post from '@mocks/postApi';
import CommentSection from './Section/CommentSection';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';

const BoardView = () => {
  const postInfo = post; // TODO API 적용

  return (
    <div className="space-y-16">
      <AdjacentPostNavSection adjacentPosts={postInfo.adjacentPosts} />
      <CommentSection />
    </div>
  );
};

export default BoardView;
