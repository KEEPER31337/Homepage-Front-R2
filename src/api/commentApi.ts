import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CommentInfo } from './dto';

const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ postId, parentId, content }: { postId: number; parentId?: number; content: string }) =>
    axios.post(`/comments`, { postId, parentId, content });

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

const useControlCommentLikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (commentId: number) => axios.patch(`/comments/${commentId}/likes`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const useControlCommentDislikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (commentId: number) => axios.patch(`/comments/${commentId}/dislikes`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const useEditCommentMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (commentId: number) => axios.put(`/comments/${commentId}`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (commentId: number) => axios.delete(`/comments/${commentId}`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export {
  useCreateCommentMutation,
  useGetCommentQuery,
  useControlCommentLikesMutation,
  useControlCommentDislikesMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
};
