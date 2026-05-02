import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import {
  useGetEachPostQuery,
  useGetExamPostFilesAccessQuery,
  useGrantExamPostFilesAccessMutation,
} from '@api/postApi';
import NotFound from '@pages/NotFound/NotFound';
import SecretPostModal from './Modal/SecretPostModal';
import WarningDeductPointModal from './Modal/WarningDeductPointModal';
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
  const [warningDeductPointModalOpen, setWarningDeductPointModalOpen] = useState(false);
  const [hasExamFilesAccess, setHasExamFilesAccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const {
    data: postInfo,
    isSuccess,
    error,
  } = useGetEachPostQuery(postId, isSecret, isSecretPasswordSubmited, password);
  const isExamPost = postInfo?.categoryName === '시험게시판';
  const isExamRegularPost = Boolean(isExamPost && postInfo && !postInfo.isNotice && postInfo.fileCount > 0);
  const examPostFilesAccessQuery = useGetExamPostFilesAccessQuery(postId, isExamRegularPost);
  const { mutate: grantExamPostFilesAccess, isLoading: isGrantExamPostFilesAccessLoading } =
    useGrantExamPostFilesAccessMutation();

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

  useEffect(() => {
    setHasExamFilesAccess(null);
    setWarningDeductPointModalOpen(false);
  }, [postId]);

  useEffect(() => {
    if (!isExamRegularPost || hasExamFilesAccess !== null) return;

    if (examPostFilesAccessQuery.isSuccess) {
      setHasExamFilesAccess(true);
      return;
    }

    if (!examPostFilesAccessQuery.isError) return;

    const examPostFilesAccessError = examPostFilesAccessQuery.error as AxiosError;
    if (examPostFilesAccessError.response?.status !== 403) return;

    setHasExamFilesAccess(false);
    setWarningDeductPointModalOpen(true);
  }, [
    isExamRegularPost,
    hasExamFilesAccess,
    examPostFilesAccessQuery.isSuccess,
    examPostFilesAccessQuery.isError,
    examPostFilesAccessQuery.error,
  ]);

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
            <PostSection postId={postId} post={postInfo} canOpenFiles={!isExamRegularPost || hasExamFilesAccess === true} />
          </div>
          <AdjacentPostNavSection previousPost={postInfo.previousPost} nextPost={postInfo.nextPost} />
          <CommentSection categoryName={postInfo.categoryName} postId={postId} allowComment={postInfo.allowComment} />
          {isExamRegularPost && (
            <WarningDeductPointModal
              open={warningDeductPointModalOpen}
              onClose={() => navigate(`/board/${postInfo.categoryName}`)}
              onActionButonClick={() => {
                if (isGrantExamPostFilesAccessLoading) return;

                grantExamPostFilesAccess(postId, {
                  onSuccess: () => {
                    setHasExamFilesAccess(true);
                    setWarningDeductPointModalOpen(false);
                  },
                });
              }}
            />
          )}
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
