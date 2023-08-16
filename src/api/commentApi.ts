import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { CommentInfo } from './dto';

const useCreateCommentMutation = () => {
  // TODO 업데이트시 조회 목록도 업데이트 되도록 처리
  // TODO 파라미터 받아오도록 처리
  const fetcher = () =>
    axios.post(`/comments`, { postId: 16, content: '댓글2작성 테스트' }).then(({ data }) => data.comments);

  return useMutation(fetcher);
};

const useGetCommentQuery = (postId: number) => {
  const fetcher = () => axios.get(`/comments/posts/${postId}`).then(({ data }) => data.comments);

  return useQuery<CommentInfo[]>(['comments'], fetcher);
};

export { useCreateCommentMutation, useGetCommentQuery };
