import { PostInfo } from '@api/dto';

const post: PostInfo = {
  categoryId: 1,
  categoryName: '카테고리 이름',
  title: '게시글 제목',
  writerName: 'UmbEizQdxY',
  writerThumbnailPath: null,
  visitCount: 1,
  thumbnailPath: 'https://avatars.githubusercontent.com/u/78250089?v=4',
  content: '게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용',
  previousPost: {
    postId: 110,
    title: '보통 절판된 책 어디서 보나요 ㅠㅠ',
  },
  nextPost: {
    postId: 112,
    title: '[유용한 만화] 만화로 배우는 https',
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
