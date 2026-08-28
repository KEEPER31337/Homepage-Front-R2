import hotToast from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  examFilesAccess: (postId: number) => ['examFilesAccess', postId] as const,
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

  return useMutation({ mutationFn: fetcher });
};

const useUploadPostImageMutation = () => {
  const fetcher = async ({ file }: { file: Blob }) => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post('/posts/files', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return data;
  };

  return useMutation({ mutationFn: fetcher });
};

const useGetPostListQuery = ({ categoryId, searchType, search, page, size }: BoardSearch) => {
  const fetcher = () =>
    axios.get('/posts', { params: { categoryId, searchType, search, page, size } }).then(({ data }) => data);

  return useQuery<BoardPosts>({
    queryKey: ['posts', categoryId, searchType, search, page, size],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  });
};

const useEditPostMutation = () => {
  const fetcher = ({ postId, editPostInfo }: { postId: number; editPostInfo: Omit<UploadPostCore, 'categoryId'> }) =>
    axios.put(`/posts/${postId}`, editPostInfo);

  return useMutation({ mutationFn: fetcher });
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

  return useMutation({ mutationFn: fetcher });
};

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetcher = (postId: number) => axios.delete(`/posts/${postId}`).then(({ data }) => data);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: ({ categoryName }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      navigate(`/board/${categoryName}`);
    },
  });
};

const useControlPostLikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (postId: number) => axios.patch(`/posts/${postId}/likes`);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const useControlPostDislikesMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (postId: number) => axios.patch(`/posts/${postId}/dislikes`);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

const useGetNoticePostListQuery = ({ categoryId }: { categoryId: number }) => {
  const fetcher = () => axios.get('/posts/notices', { params: { categoryId } }).then(({ data }) => data.posts);

  return useQuery<PostSummaryInfo[]>({
    queryKey: ['posts', 'notices', categoryId],
    queryFn: fetcher,
    placeholderData: keepPreviousData,
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

  return useMutation({ mutationFn: fetcher });
};

const useDeleteFilesMutation = () => {
  const fetcher = ({ postId, fileIds }: { postId: number; fileIds: number[] }) => {
    return axios.delete(`/posts/${postId}/files`, { data: { fileIds } });
  };

  return useMutation({ mutationFn: fetcher });
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
        hotToast.error(BOARD.error.readCondition);
      },
    },
    403: {
      40301: () => {
        hotToast.error(BOARD.error.mismatchPassword);
      },
      40302: () => {
        // 비밀글 여부 true로 변경
        location.state = true;
      },
    },
  });
  const fetcher = () => axios.get(`/posts/${postId}`, { params: { password } }).then(({ data }) => data);

  const query = useQuery<PostInfo>({
    queryKey: ['post', postId, password],
    queryFn: fetcher,
    enabled: !isSecret || Boolean(isSecret && setIsSecretPasswordSubmited),
  });
  const handledErrorUpdatedAt = useRef(0);

  useEffect(() => {
    if (!query.isError || query.errorUpdatedAt <= handledErrorUpdatedAt.current) return;

    handledErrorUpdatedAt.current = query.errorUpdatedAt;
    const err = query.error;
    if ((err as AxiosError)?.response?.status === 403) {
      if (isSecret === null) {
        handleError(err, 40302);
        return;
      }
      handleError(err, 40301);
      return;
    }
    handleError(err);
  }, [handleError, isSecret, query.error, query.errorUpdatedAt, query.isError]);

  return query;
};

const useGetPostFilesQuery = (postId: number, fileOpen: boolean, _password?: string) => {
  const fetcher = () => axios.get(`/posts/${postId}/files`).then(({ data }) => data);

  return useQuery<FileInfo[]>({ queryKey: ['files', postId], queryFn: fetcher, enabled: fileOpen });
};

const useGetExamPostFilesAccessQuery = (postId: number, enabled: boolean) => {
  const { handleError } = useApiError({
    403: {
      default: () => undefined,
    },
  });
  const fetcher = () => axios.get(`/posts/${postId}/exam-files-access`).then(() => true);

  const query = useQuery<boolean>({
    queryKey: postKeys.examFilesAccess(postId),
    queryFn: fetcher,
    enabled,
    retry: false,
  });
  const handledErrorUpdatedAt = useRef(0);

  useEffect(() => {
    if (!query.isError || query.errorUpdatedAt <= handledErrorUpdatedAt.current) return;

    handledErrorUpdatedAt.current = query.errorUpdatedAt;
    handleError(query.error);
  }, [handleError, query.error, query.errorUpdatedAt, query.isError]);

  return query;
};

const useGrantExamPostFilesAccessMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError({
    403: {
      default: () => {
        hotToast.error(BOARD.error.examFilePointNotEnough);
      },
    },
  });
  const fetcher = (postId: number) => axios.post(`/posts/${postId}/exam-files-access`);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.examFilesAccess(postId) });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: (error) => handleError(error),
  });
};

const useGetRecentPostsQuery = () => {
  const fetcher = () => axios.get('/posts/recent').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>({ queryKey: ['recentPosts'], queryFn: fetcher });
};

const useGetTrendPostsQuery = () => {
  const fetcher = () => axios.get('/posts/trend').then(({ data }) => data);

  return useQuery<TrendingPostInfo[]>({ queryKey: ['trendPosts'], queryFn: fetcher });
};

const useDownloadFileMutation = () => {
  const { handleError } = useApiError({
    400: {
      default: () => {
        hotToast.error(BOARD.error.requiredComment);
      },
    },
    403: {
      default: () => {
        hotToast.error(BOARD.error.requiredExamFileAccess);
      },
    },
  });
  const fetcher = ({ postId, fileId, fileName }: { postId: number; fileId: number; fileName: string }) =>
    axios
      .get(`/posts/${postId}/files/${fileId}`, { responseType: 'blob' })
      .then(({ data }) => ({ blob: data, fileName }));

  return useMutation({
    mutationFn: fetcher,
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();
      link.remove();
    },
    onError: (error) => handleError(error),
  });
};

const useGetMemberPostsQuery = ({ page, size = 10, memberId }: PageAndSize & { memberId: number }) => {
  const fetcher = () => axios.get(`/posts/members/${memberId}`, { params: { page, size } }).then(({ data }) => data);

  return useQuery<MemberPost>({
    queryKey: postKeys.memberPost({ page, size, memberId }),
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  });
};

const useGetMemberTempPostsQuery = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () => axios.get('/posts/temp', { params: { page, size } }).then(({ data }) => data);

  return useQuery<MemberPost>({
    queryKey: postKeys.memberTempPost({ page, size }),
    queryFn: fetcher,
    placeholderData: keepPreviousData,
  });
};

export {
  useUploadPostMutation,
  useUploadPostImageMutation,
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
  useGetExamPostFilesAccessQuery,
  useGrantExamPostFilesAccessMutation,
  useDownloadFileMutation,
  useGetMemberPostsQuery,
  useGetMemberTempPostsQuery,
};
