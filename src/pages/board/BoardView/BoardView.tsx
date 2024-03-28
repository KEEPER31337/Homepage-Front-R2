import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useGetEachPostQuery } from '@api/postApi';
import NotFound from '@pages/NotFound/NotFound';
import SecretPostModal from './Modal/SecretPostModal';
import AdjacentPostNavSection from './Section/AdjacentPostNavSection';
import BannerSection from './Section/BannerSection';
import CommentSection from './Section/CommentSection';
import PostSection from './Section/PostSection';

const BoardView = () => {
  const { postId: postIdStr } = useParams();
  const postId = Number(postIdStr);
  const {
    state: isSecret,
  }: {
    state: boolean | null;
  } = useLocation();

  const [secretPostModalOpen, setSecretPostModalOpen] = useState(false);
  const [isSecretPasswordSubmited, setIsSecretPasswordSubmited] = useState(false);
  const [password, setPassword] = useState<string>();

  const {
    data: postInfo,
    isSuccess,
    error,
  } = useGetEachPostQuery(postId, isSecret, isSecretPasswordSubmited, password);

  useEffect(() => {
    setIsSecretPasswordSubmited(false);

    if (!isSuccess) return;
    setSecretPostModalOpen(false);
  }, [isSuccess]);

  useEffect(() => {
    if (!isSecret) return;

    setSecretPostModalOpen(true);
  }, [isSecret]);

  useEffect(() => {
    return () => {
      setPassword(undefined);
    };
  }, [postId]);

  if (error) {
    if ((error as AxiosError)?.response?.status === 404) {
      return <NotFound from="Post" />;
    }
  }

  return (
    <div className="-mt-16 space-y-8 sm:space-y-12">
      {postInfo && (
        <>
          <div className="space-y-2">
            <BannerSection postId={postId} post={postInfo} password={password} />
            <PostSection postId={postId} post={postInfo} password={password} />
          </div>
          <AdjacentPostNavSection previousPost={postInfo.previousPost} nextPost={postInfo.nextPost} />
          <CommentSection categoryName={postInfo.categoryName} postId={postId} allowComment={postInfo.allowComment} />
        </>
      )}
      <SecretPostModal
        setPassword={setPassword}
        setIsSecretPasswordSubmited={setIsSecretPasswordSubmited}
        open={secretPostModalOpen}
        setOpen={setSecretPostModalOpen}
      />
    </div>
  );
};

export default BoardView;
