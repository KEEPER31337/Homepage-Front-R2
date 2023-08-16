import { CommentInfo } from '@api/dto';

const comments: CommentInfo[] = [
  {
    commentId: 1,
    writerName: '김은지',
    writerThumbnailPath: 'https://keeper.or.kr/v1/util/thumbnail/47',
    content: '댓글내용입니다.',
    registerTime: '2023-07-08T03:25:56',
    parentId: null,
    likeCount: 0,
    dislikeCount: 0,
  },
];

export default comments;
