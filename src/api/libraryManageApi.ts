import { useQuery, useMutation, useQueryClient } from 'react-query';
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

  return useQuery<{ content: ManageBookInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.bookManageList(params),
    fetcher,
  );
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

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookManageList({}) });
    },
  });
};

const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (bookId: number) => axios.delete(`/manage/books/${bookId}`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookManageList({}) });
    },
  });
};

const useEditBookInfoMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = ({ bookId, bookCoreData }: { bookId: number; bookCoreData: BookCoreData }) =>
    axios.put(`/manage/books/${bookId}`, bookCoreData);

  return useMutation(fetcher, {
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
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.bookDetail(bookId) });
    },
  });
};

const useGetBookDetailQuery = (bookId: number) => {
  const fetcher = () => axios.get(`/manage/books/${bookId}`).then(({ data }) => data);

  return useQuery<ManageBookInfo>(libraryManageKeys.bookDetail(bookId), fetcher, { enabled: bookId !== 0 });
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

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.borrowInfoList(params),
    fetcher,
  );
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

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.overdueInfoList(params),
    fetcher,
  );
};

const useApproveRequestMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/requests-approve`);
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useDenyRequestMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/requests-deny`);
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useApproveReturnMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/return-approve`);
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useDenyReturnMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (borrowId: number) => axios.post(`/manage/borrow-infos/${borrowId}/return-deny`);
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryManageKeys.borrowInfoList({}) });
    },
  });
};

const useGetBorrowLogListQuery = ({ page, size = 10, searchType, search }: BorrowLogListSearch) => {
  const params = { page, size, searchType, search };
  const fetcher = () =>
    axios.get('/manage/borrow-infos/logs', { params }).then(({ data }) => {
      const content = data.content.map((borrowLogInfo: BorrowLogInfo) => {
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

  return useQuery<{ content: BorrowLogInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.borrowLogList(params),
    fetcher,
  );
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
