import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CommentInfo } from './dto';

const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ postId, content }: { postId: number; content: string }) =>
    axios.post(`/comments`, { postId, content }).then(({ data }) => data.comments);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const useGetCommentQuery = (postId: number) => {
  const fetcher = () => axios.get(`/comments/posts/${postId}`).then(({ data }) => data.comments);

  return useQuery<CommentInfo[]>(['comments'], fetcher);
};

export { useCreateCommentMutation, useGetCommentQuery };
