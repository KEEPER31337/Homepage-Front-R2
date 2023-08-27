import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { BoardPosts, BoardSearch, FileInfo, PostInfo, UploadPost, TrendingPostInfo } from './dto';

const useUploadPostMutation = () => {
  const fetcher = ({ request, thumbnail, files }: UploadPost) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (thumbnail) formData.append('thumbnail', thumbnail);
    files?.forEach((file) => formData.append('files', file));

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

const useGetRecentPostsQuery = () => {
  const fetcher = () => axios.get('/posts/recent').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>('recentPosts', fetcher);
};

const useGetTrendPostsQuery = () => {
  const fetcher = () => axios.get('/posts/trend').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>('trendPosts', fetcher);
};

export {
  useUploadPostMutation,
  useGetPostListQuery,
  useGetEachPostQuery,
  useGetPostFilesQuery,
  useGetRecentPostsQuery,
  useGetTrendPostsQuery,
};
