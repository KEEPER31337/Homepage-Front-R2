import React from 'react';
import { Chip, Typography } from '@mui/material';
import OutlinedButton from '@components/Button/OutlinedButton';

const BannerSection = () => {
  return (
    <div className="relative bg-mainBlack px-6 py-2">
      <img
        src="https://avatars.githubusercontent.com/u/78250089?v=4"
        alt="post thumbnail"
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="mx-auto mt-10 max-w-xl text-center">
        <Chip className="mb-4 !rounded-md !bg-pointBlue/50" label="자유게시판" />
        <Typography variant="h3" className="flex h-12 items-center justify-center !font-semibold">
          게시글 제목입니다.
        </Typography>
        <p className="text-small leading-8 text-gray-300">작성자-작성시간-조회수</p>
      </div>
      <div className="flex justify-end space-x-2">
        <OutlinedButton>글 수정</OutlinedButton>
        <OutlinedButton>글 삭제</OutlinedButton>
      </div>
    </div>
  );
};

export default BannerSection;
