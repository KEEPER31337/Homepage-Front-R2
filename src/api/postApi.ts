import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { BoardPosts, PostInfo, UploadPost } from './dto';

const useUploadPostMutation = () => {
  const fetcher = (postInfo: UploadPost) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(postInfo)], { type: 'application/json' }));

    return axios.post('/posts', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

const useGetPostListQuery = ({ categoryId }: { categoryId: number }) => {
  const fetcher = () => axios.get('/posts', { params: { categoryId } }).then(({ data }) => data);

  return useQuery<BoardPosts>(['posts'], fetcher);
};

const useGetEachPostQuery = (postId: number) => {
  const fetcher = () => axios.get(`/posts/${postId}`).then(({ data }) => data);

  return useQuery<PostInfo>(['post'], fetcher);
};

export { useUploadPostMutation, useGetPostListQuery, useGetEachPostQuery };
