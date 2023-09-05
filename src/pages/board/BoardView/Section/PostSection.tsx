import React from 'react';
import { Button } from '@mui/material';
import { VscArrowDown, VscArrowUp, VscFile } from 'react-icons/vsc';
import { PostInfo } from '@api/dto';
import {
  useGetPostFilesQuery,
  useControlPostLikesMutation,
  useControlPostDislikesMutation,
  useDownloadFileMutation,
} from '@api/postApi';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import StandardViewer from '@components/Viewer/StandardViewer';

interface PostSectionProps {
  postId: number;
  post: PostInfo;
}

const PostSection = ({ postId, post }: PostSectionProps) => {
  const { data: files } = useGetPostFilesQuery(postId);
  const { mutate: controlLikes } = useControlPostLikesMutation();
  const { mutate: controlDislikes } = useControlPostDislikesMutation();
  const { mutate: downloadFile } = useDownloadFileMutation();

  const handleDownloadFileClick = (fileId: number, fileName: string) => {
    downloadFile({ postId, fileId, fileName });
  };

  const handleLikeButtonClick = () => {
    controlLikes(postId);
  };

  const handleDisikeButtonClick = () => {
    controlDislikes(postId);
  };

  return (
    <div className="min-h-[520px] bg-middleBlack px-14 py-10">
      <StandardViewer className="min-h-[330px]" content={post.content} />
      <div className="mb-10 mt-2 flex justify-end gap-3 text-pointBlue">
        {files &&
          files.map((file) => (
            <Button key={file.fileId} className="flex" onClick={() => handleDownloadFileClick(file.fileId, file.name)}>
              <VscFile className="mr-1" size={24} />
              <span>{file.name}</span>
            </Button>
          ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        {post.isLike ? (
          <FilledButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleLikeButtonClick}>
            <VscArrowUp className="mr-1" size={10} />
            <span>추천 ({post.likeCount})</span>
          </OutlinedButton>
        )}
        {post.isDislike ? (
          <FilledButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </FilledButton>
        ) : (
          <OutlinedButton small onClick={handleDisikeButtonClick}>
            <VscArrowDown className="mr-1" size={10} />
            <span>비추천 ({post.dislikeCount})</span>
          </OutlinedButton>
        )}
      </div>
    </div>
  );
};

export default PostSection;
