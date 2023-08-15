import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { BoardPosts, BoardSearch, FileInfo, PostInfo, UploadPost } from './dto';

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

const useGetPostListQuery = ({ categoryId, searchType, search, page, size }: BoardSearch) => {
  const fetcher = () =>
    axios.get('/posts', { params: { categoryId, searchType, search, page, size } }).then(({ data }) => data);

  return useQuery<BoardPosts>(['posts', categoryId, searchType, search, page, size], fetcher, {
    keepPreviousData: true,
  });
};

const useGetEachPostQuery = (postId: number) => {
  const fetcher = () => axios.get(`/posts/${postId}`).then(({ data }) => data);

  return useQuery<PostInfo>(['post', postId], fetcher);
};

const useGetPostFilesQuery = (postId: number) => {
  const fetcher = () => axios.get(`/posts/${postId}/files`).then(({ data }) => data);

  return useQuery<FileInfo[]>(['post', 'files', postId], fetcher);
};

export { useUploadPostMutation, useGetPostListQuery, useGetEachPostQuery, useGetPostFilesQuery };
