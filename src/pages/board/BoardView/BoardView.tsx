import React, { useEffect, useState } from 'react';
import { useGetEachPostQuery } from '@api/postApi';
import { useLocation, useParams } from 'react-router-dom';
import CommentSection from './Section/CommentSection';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';
import PostSection from './Section/PostSection';
import BannerSection from './Section/BannerSection';
import SecretPostModal from './Modal/SecretPostModal';

const BoardView = () => {
  const { postId: postIdStr } = useParams();
  const postId = Number(postIdStr);
  const {
    state: isSecret,
  }: {
    state: boolean | null;
  } = useLocation();

  const [secretPostModalOpen, setSecretPostModalOpen] = useState(isSecret ?? false);
  const [password, setPassword] = useState<string>();

  const { data: postInfo, isSuccess } = useGetEachPostQuery(postId, isSecret, password);

  useEffect(() => {
    if (!isSuccess) return;
    setSecretPostModalOpen(false);
  }, [isSuccess]);

  return (
    <div className="-mt-16 space-y-12">
      {postInfo && (
        <>
          <div className="space-y-2">
            <BannerSection postId={postId} post={postInfo} />
            <PostSection postId={postId} post={postInfo} />
          </div>
          <AdjacentPostNavSection previousPost={postInfo.previousPost} nextPost={postInfo.nextPost} />
          <CommentSection postId={postId} allowComment={postInfo.allowComment} />
        </>
      )}
      <SecretPostModal setPassword={setPassword} open={secretPostModalOpen} setOpen={setSecretPostModalOpen} />
    </div>
  );
};

export default BoardView;
