import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { BOARD } from '@constants/apiResponseMessage';
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
  PageAndSize,
  MemberPost,
} from './dto';

const postKeys = {
  memberPost: (param: PageAndSize & { memberId: number }) => ['memberPost', param] as const,
  memberTempPost: (param: PageAndSize) => ['memberTempPost', param] as const,
};

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
  const fetcher = ({ postId, thumbnail }: { postId: number; thumbnail: Blob | null }) => {
    const formData = new FormData();
    if (thumbnail) formData.append('thumbnail', thumbnail);

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

const useAddFilesMutation = () => {
  const fetcher = ({ postId, files }: { postId: number; files: File[] }) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return axios.post(`/posts/${postId}/files`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

const useDeleteFilesMutation = () => {
  const fetcher = ({ postId, fileIds }: { postId: number; fileIds: number[] }) => {
    return axios.delete(`/posts/${postId}/files`, { data: { fileIds } });
  };

  return useMutation(fetcher);
};

const useGetEachPostQuery = (
  postId: number,
  isSecret: boolean | null,
  setIsSecretPasswordSubmited: boolean,
  password?: string,
) => {
  const location = useLocation();

  const { handleError } = useApiError({
    400: {
      default: () => {
        // TODO 페이지 문구로 띄워주기
        toast.error(BOARD.error.readCondition);
      },
    },
    403: {
      40301: () => {
        toast.error(BOARD.error.mismatchPassword);
      },
      40302: () => {
        // 비밀글 여부 true로 변경
        location.state = true;
      },
    },
  });
  const fetcher = () => axios.get(`/posts/${postId}`, { params: { password } }).then(({ data }) => data);

  return useQuery<PostInfo>(['post', postId, password], fetcher, {
    enabled: !isSecret || Boolean(isSecret && setIsSecretPasswordSubmited),
    onError: (err) => {
      if ((err as AxiosError)?.response?.status === 403) {
        if (isSecret === null) {
          return handleError(err, 40302);
        }
        return handleError(err, 40301);
      }
      return handleError(err);
    },
  });
};

const useGetPostFilesQuery = (postId: number, fileOpen: boolean, password?: string) => {
  const queryClient = useQueryClient();
  const fetcher = () =>
    axios.get(`/posts/${postId}/files`).then(({ data }) => {
      return data;
    });

  return useQuery<FileInfo[]>(['files', postId], fetcher, {
    enabled: fileOpen,
    onSuccess: () => {
      queryClient.setQueryData(['post', postId, password], (oldData) => oldData && { ...oldData, isRead: true });
    },
  });
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
    onError: (error) => {
      if ((error as AxiosError)?.response?.status === 400) {
        toast.error(BOARD.error.requiredComment);
      }
    },
  });
};

const useGetMemberPostsQuery = ({ page, size = 10, memberId }: PageAndSize & { memberId: number }) => {
  const fetcher = () => axios.get(`/posts/members/${memberId}`, { params: { page, size } }).then(({ data }) => data);

  return useQuery<MemberPost>(postKeys.memberPost({ page, size, memberId }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetMemberTempPostsQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () => axios.get('/posts/temp', { params: { page, size } }).then(({ data }) => data);

  return useQuery<MemberPost>(postKeys.memberTempPost({ page, size }), fetcher, {
    keepPreviousData: true,
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
  useAddFilesMutation,
  useDeleteFilesMutation,
  useGetEachPostQuery,
  useGetPostFilesQuery,
  useDownloadFileMutation,
  useGetMemberPostsQuery,
  useGetMemberTempPostsQuery,
};
