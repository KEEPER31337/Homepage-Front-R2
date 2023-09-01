import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApiError } from '@hooks/useGetApiError';
import {
  BoardPosts,
  BoardSearch,
  FileInfo,
  PostInfo,
  PostSummaryInfo,
  UploadPost,
  UploadPostCore,
  TrendingPostInfo,
} from './dto';

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

const useEditPostMutation = () => {
  const fetcher = ({ postId, editPostInfo }: { postId: number; editPostInfo: Omit<UploadPostCore, 'categoryId'> }) =>
    axios.put(`/posts/${postId}`, editPostInfo);

  return useMutation(fetcher);
};

const useEditPostThumbnailMutation = () => {
  const fetcher = ({ postId, thumbnail }: { postId: number; thumbnail: Blob }) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);

    return axios.patch(`/posts/${postId}/thumbnail`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetcher = (postId: number) => axios.delete(`/posts/${postId}`).then(({ data }) => data);

  return useMutation(fetcher, {
    onSuccess: ({ categoryName }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      navigate(`/board/${categoryName}`);
    },
  });
};

const useControlPostLikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (postId: number) => axios.patch(`/posts/${postId}/likes`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const useControlPostDislikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (postId: number) => axios.patch(`/posts/${postId}/dislikes`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const useGetNoticePostListQuery = ({ categoryId }: { categoryId: number }) => {
  const fetcher = () => axios.get('/posts/notices', { params: { categoryId } }).then(({ data }) => data.posts);

  return useQuery<PostSummaryInfo[]>(['posts', 'notices', categoryId], fetcher, {
    keepPreviousData: true,
  });
};

const useGetEachPostQuery = (postId: number, isSecret: boolean | null, password?: string) => {
  const { handleError } = useApiError({
    403: {
      40301: () => {
        toast.error('게시글의 비밀번호가 일치하지 않습니다.');
      },
    },
  });
  const fetcher = () => axios.get(`/posts/${postId}`, { params: { password } }).then(({ data }) => data);

  return useQuery<PostInfo>(['post', postId, password], fetcher, {
    enabled: !isSecret || Boolean(isSecret && password),
    onError: (err) => handleError(err, 40301),
  });
};

const useGetPostFilesQuery = (postId: number) => {
  const fetcher = () => axios.get(`/posts/${postId}/files`).then(({ data }) => data);

  return useQuery<FileInfo[]>(['files', postId], fetcher);
};

const useGetRecentPostsQuery = () => {
  const fetcher = () => axios.get('/posts/recent').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>('recentPosts', fetcher);
};

const useGetTrendPostsQuery = () => {
  const fetcher = () => axios.get('/posts/trend').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>('trendPosts', fetcher);
};
const useDownloadFileMutation = () => {
  const fetcher = ({ postId, fileId, fileName }: { postId: number; fileId: number; fileName: string }) =>
    axios
      .get(`/posts/${postId}/files/${fileId}`, { responseType: 'blob' })
      .then(({ data }) => ({ blob: data, fileName }));

  return useMutation(fetcher, {
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();
      link.remove();
    },
  });
};

export {
  useUploadPostMutation,
  useGetPostListQuery,
  useGetRecentPostsQuery,
  useGetTrendPostsQuery,
  useEditPostMutation,
  useEditPostThumbnailMutation,
  useDeletePostMutation,
  useControlPostLikesMutation,
  useControlPostDislikesMutation,
  useGetNoticePostListQuery,
  useGetEachPostQuery,
  useGetPostFilesQuery,
  useDownloadFileMutation,
};
