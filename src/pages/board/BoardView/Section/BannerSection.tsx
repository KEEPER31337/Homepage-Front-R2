import React, { useState } from 'react';
import { Avatar, Chip, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';
import { PostInfo } from '@api/dto';
import { VscCalendar, VscEye } from 'react-icons/vsc';
import ServerImg from '@components/Image/ServerImg';
import { useDeletePostMutation } from '@api/postApi';
import ActionModal from '@components/Modal/ActionModal';
import { useNavigate } from 'react-router-dom';

interface BannerSectionProps {
  postId: number;
  post: PostInfo;
}

const BannerSection = ({ postId, post }: BannerSectionProps) => {
  const [warningDeleteModalopen, setWarningDeleteModalopen] = useState(false);

  const { mutate: deletePost } = useDeletePostMutation();
  const navigate = useNavigate();

  const handleEditPostClick = () => {
    navigate(`/board/write/${post.categoryName}`, { state: { postId, post } });
  };

  const handleDeletePostClick = () => {
    setWarningDeleteModalopen(true);
  };

  return (
    <>
      <div className="relative bg-mainBlack px-6 py-2">
        <div className="opacity-10">
          <ServerImg
            src={post.thumbnailPath}
            alt="post thumbnail"
            className="absolute inset-0 h-full w-full object-cover"
            errorClassName="absolute inset-0 h-2/3 w-2/3 m-auto"
          />
        </div>
        <div className="mx-auto mt-10 max-w-xl text-center">
          <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label={post.categoryName} />
          <Typography variant="h3" className="flex h-12 items-center justify-center !font-semibold">
            {post.title}
          </Typography>
          <div className="flex items-center justify-center gap-2 text-small leading-8 text-gray-300">
            <div className="flex items-center justify-center">
              <Avatar className="mr-1 !h-4 !w-4" src={post.writerThumbnailPath ?? undefined} />
              {post.writerName}
            </div>
            <div className="flex items-center justify-center">
              <VscCalendar className="mr-1 h-4 w-4" />
              {post.registerTime}
            </div>
            <div className="flex items-center justify-center">
              <VscEye className="mr-1 h-4 w-4" />
              {post.visitCount}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <OutlinedButton onClick={handleEditPostClick}>글 수정</OutlinedButton>
          <OutlinedButton onClick={handleDeletePostClick}>글 삭제</OutlinedButton>
        </div>
      </div>
      <ActionModal
        title="게시글 삭제"
        open={warningDeleteModalopen}
        onClose={() => setWarningDeleteModalopen(false)}
        actionButtonName="삭제"
        onActionButonClick={() => {
          deletePost(postId);
        }}
      >
        &quot;<b>{post.title}</b>&quot; 게시글을 삭제하시겠습니까?
      </ActionModal>
    </>
  );
};

export default BannerSection;
