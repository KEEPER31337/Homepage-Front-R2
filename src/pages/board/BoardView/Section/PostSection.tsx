import React from 'react';
import StandardViewer from '@components/Viewer/StandardViewer';
import FilledButton from '@components/Button/FilledButton';
import OutlinedButton from '@components/Button/OutlinedButton';
import { VscArrowDown, VscArrowUp, VscFile } from 'react-icons/vsc';
import { PostInfo } from '@api/dto';

interface PostSectionProps {
  post: PostInfo;
}

const PostSection = ({ post }: PostSectionProps) => {
  return (
    <div className="min-h-[520px] bg-middleBlack px-14 py-10">
      <StandardViewer className="min-h-[330px]" content={post.content} />
      <div className="mb-10 mt-2 flex justify-end gap-3 text-pointBlue">
        {post.files.map((file) => (
          <div key={file.id} className="flex">
            <VscFile className="mr-1" size={24} />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <FilledButton small>
          <VscArrowUp className="mr-1" size={10} />
          <span>추천 ({post.likeCount})</span>
        </FilledButton>
        <OutlinedButton small>
          <VscArrowDown className="mr-1" size={10} />
          <span>비추천 ({post.dislikeCount})</span>
        </OutlinedButton>
      </div>
    </div>
  );
};

export default PostSection;
