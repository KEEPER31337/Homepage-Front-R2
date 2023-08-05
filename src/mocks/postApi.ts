import { PostInfo } from '@api/dto';

const post: PostInfo = {
  categoryName: '카테고리 이름',
  title: '게시글 제목',
  writerName: 'UmbEizQdxY',
  writerThumbnailPath: null,
  visitCount: 1,
  thumbnailPath: 'keeper_files/thumbnail/2023-07-10/46683d42-5b7d-4eb7-a52e-249684557551.jpeg',
  content: '게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용',
  files: [
    {
      id: 88,
      name: 'testImage_1x1.png',
      path: 'keeper_files/files/2023-07-10/8d91f421-0519-426a-83ce-fcb25c094fc5.png',
      size: 95,
      ipAddress: '127.0.0.1',
      uploadTime: '2023-07-10 10:48:23',
    },
    {
      id: 89,
      name: '2.txt',
      path: 'keeper_files/files/2023-07-10/8d91f421-0519-426a-83ce-fcb25c094fc5.png',
      size: 95,
      ipAddress: '127.0.0.1',
      uploadTime: '2023-07-10 10:48:23',
    },
  ],
  adjacentPosts: {
    previous: {
      postId: 110,
      title: '보통 절판된 책 어디서 보나요 ㅠㅠ',
    },
    next: {
      postId: 112,
      title: '[유용한 만화] 만화로 배우는 https',
    },
  },
  likeCount: 0,
  dislikeCount: 0,
  allowComment: true,
  isNotice: false,
  isSecret: false,
  isTemp: false,
  registerTime: '2023-07-10 10:48:22',
  updateTime: '2023-07-10 10:48:23',
};

export default post;
