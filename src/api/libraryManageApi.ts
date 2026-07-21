import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { DateTime } from 'luxon';
import {
  ManageBookInfo,
  BookListSearch,
  BookCoreData,
  BorrowInfoListSearch,
  BorrowInfo,
  BorrowLogInfo,
  BorrowLogListSearch,
} from './dto';

const libraryManageKeys = {
  base: ['manage'] as const,
  book: () => [...libraryManageKeys.base, 'books'] as const,
  borrowInfo: () => [...libraryManageKeys.base, 'borrowInfos'] as const,
  bookManageList: (params: BookListSearch) => [...libraryManageKeys.book(), params] as const,
  bookDetail: (bookId: number) => [...libraryManageKeys.book(), bookId] as const,
  borrowInfoList: (params: BorrowInfoListSearch) => [...libraryManageKeys.borrowInfo(), params] as const,
  overdueInfoList: (params: BorrowInfoListSearch) => [...libraryManageKeys.borrowInfo(), 'overdue', params] as const,
  borrowLogList: (params: BorrowLogListSearch) => [...libraryManageKeys.borrowInfo(), 'logs', params] as const,
};

type FormattedBorrowLogInfo = Omit<
  BorrowLogInfo,
  'borrowDateTime' | 'expireDateTime' | 'returnDateTime' | 'rejectDateTime'
> & {
  borrowDateTime: string;
  expireDateTime: string;
  returnDateTime: string;
  rejectDateTime: string;
};

const useGetBookManageListQuery = ({ page, size = 10, searchType, search }: BookListSearch) => {
  const params = { page, size, searchType, search };
  const fetcher = () =>
    axios.get('/manage/books', { params }).then(({ data }) => {
      const content = data.content.map((bookInfo: ManageBookInfo) => ({
        bookId: bookInfo.bookId,
        title: bookInfo.title,
        author: bookInfo.author,
        currentQuantity: bookInfo.currentQuantity,
        totalQuantity: bookInfo.totalQuantity,
        borrowers: bookInfo.borrowInfos.map((borrowInfo) => borrowInfo.borrowerRealName).join(', '),
        canBorrow: !!bookInfo.currentQuantity,
      }));
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: ManageBookInfo[]; totalElement: number; size: number }>({
    queryKey: libraryManageKeys.bookManageList(params),
    queryFn: fetcher,
  });
};

const useAddBookMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ bookCoreData, thumbnail }: { bookCoreData: BookCoreData; thumbnail?: Blob | null }) => {
    const formData = new FormData();
    formData.append('bookMetaData', new Blob([JSON.stringify(bookCoreData)], { type: 'application/json' }));
    if (thumbnail) formData.append('thumbnail', thumbnail);

    return axios.post('/manage/books', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookManageList({}) });
    },
  });
};

const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (bookId: number) => axios.delete(`/manage/books/${bookId}`);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookManageList({}) });
    },
  });
};

const useEditBookInfoMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ bookId, bookCoreData }: { bookId: number; bookCoreData: BookCoreData }) =>
    axios.put(`/manage/books/${bookId}`, bookCoreData);

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookManageList({}) });
    },
  });
};

const useEditBookThumbnailMutation = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();

  const fetcher = ({ thumbnail }: { thumbnail: Blob | null }) => {
    const formData = new FormData();
    if (thumbnail) formData.append('thumbnail', thumbnail);

    return axios.patch(`/manage/books/${bookId}/thumbnail`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookDetail(bookId) });
    },
  });
};

const useGetBookDetailQuery = (bookId: number) => {
  const fetcher = () => axios.get(`/manage/books/${bookId}`).then(({ data }) => data);

  return useQuery<ManageBookInfo>({
    queryKey: libraryManageKeys.bookDetail(bookId),
    queryFn: fetcher,
    enabled: bookId !== 0,
  });
};

const useGetBorrowInfoListQuery = ({ page, size = 10, status, search }: BorrowInfoListSearch) => {
  const params = { page, size, status, search };
  const fetcher = () =>
    axios.get('/manage/borrow-infos', { params }).then(({ data }) => {
      const content = data.content.map((borrowInfo: BorrowInfo) => {
        const borrowStatus: { [key: string]: string } = {
          대출대기: '대출 신청',
          반납대기: '반납 신청',
        };
        return {
          borrowInfoId: borrowInfo.borrowInfoId,
          status: borrowStatus[borrowInfo.status],
          requestDatetime: DateTime.fromISO(borrowInfo?.requestDatetime || '').toFormat('yyyy.MM.dd'),
          bookTitle: borrowInfo.bookTitle,
          author: borrowInfo.author,
          bookQuantity: `${borrowInfo.currentQuantity}/${borrowInfo.totalQuantity}`,
          borrowerRealName: borrowInfo.borrowerRealName,
        };
      });
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>({
    queryKey: libraryManageKeys.borrowInfoList(params),
    queryFn: fetcher,
  });
};

const useGetOverdueInfoListQuery = ({ page, size = 10, status = 'overdue' }: BorrowInfoListSearch) => {
  const params = { page, size, status };
  const fetcher = () =>
    axios.get('/manage/borrow-infos', { params }).then(({ data }) => {
      const content = data.content.map((borrowInfo: BorrowInfo) => {
        return {
          borrowInfoId: borrowInfo.borrowInfoId,
          bookTitle: borrowInfo.bookTitle,
          author: borrowInfo.author,
          borrowerRealName: borrowInfo.borrowerRealName,
          requestDatetime: DateTime.fromISO(borrowInfo?.requestDatetime || '').toFormat('yyyy.MM.dd'),
          expiredDateTime: DateTime.fromISO(borrowInfo?.expiredDateTime || '').toFormat('yyyy.MM.dd'),
          status: borrowInfo.status,
        };
      });
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>({
    queryKey: libraryManageKeys.overdueInfoList(params),
    queryFn: fetcher,
  });
};

const useApproveRequestMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/requests-approve`);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useDenyRequestMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/requests-deny`);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useApproveReturnMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/return-approve`);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useDenyReturnMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/return-deny`);
  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useGetBorrowLogListQuery = ({ page, size = 10, searchType, search }: BorrowLogListSearch) => {
  const params = { page, size, searchType, search };
  const fetcher = () =>
    axios.get('/manage/borrow-infos/logs', { params }).then(({ data }) => {
      const content = data.content.map((borrowLogInfo: BorrowLogInfo): FormattedBorrowLogInfo => {
        return {
          ...borrowLogInfo,
          returnDateTime: borrowLogInfo?.returnDateTime
            ? DateTime.fromISO(borrowLogInfo.returnDateTime).toFormat('yyyy.MM.dd')
            : '',
          expireDateTime: borrowLogInfo?.expireDateTime
            ? DateTime.fromISO(borrowLogInfo.expireDateTime).toFormat('yyyy.MM.dd')
            : '',
          borrowDateTime: borrowLogInfo?.borrowDateTime
            ? DateTime.fromISO(borrowLogInfo.borrowDateTime).toFormat('yyyy.MM.dd')
            : '',
          rejectDateTime: borrowLogInfo?.rejectDateTime
            ? DateTime.fromISO(borrowLogInfo.rejectDateTime).toFormat('yyyy.MM.dd')
            : '',
        };
      });
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: FormattedBorrowLogInfo[]; totalElement: number; size: number }>({
    queryKey: libraryManageKeys.borrowLogList(params),
    queryFn: fetcher,
  });
};
export {
  useGetBookManageListQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useGetBorrowInfoListQuery,
  useGetOverdueInfoListQuery,
  useApproveRequestMutation,
  useDenyRequestMutation,
  useApproveReturnMutation,
  useDenyReturnMutation,
  useGetBookDetailQuery,
  useEditBookInfoMutation,
  useEditBookThumbnailMutation,
  useGetBorrowLogListQuery,
};
