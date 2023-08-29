import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DateTime } from 'luxon';
import { ManageBookInfo, BookListSearch, BookCoreData, BorrowInfoListSearch, BorrowInfo } from './dto';

const libraryManageKeys = {
  bookManageList: (param: BookListSearch) => ['libraryManage', 'bookManageList', param] as const,
  bookDetail: (param: number) => ['library', 'bookDetail', param] as const,
  borrowInfoList: (param: BorrowInfoListSearch) => ['libraryManage', 'borrowInfoList', param] as const,
  overdueInfoList: (param: BorrowInfoListSearch) => ['libraryManage', 'overdueInfoList', param] as const,
};

const useGetBookManageListQuery = ({ page, size = 10, searchType, search }: BookListSearch) => {
  const fetcher = () =>
    axios.get('/manage/books', { params: { page, size, searchType, search } }).then(({ data }) => {
      const content = data.content.map((bookInfo: ManageBookInfo) => ({
        bookId: bookInfo.bookId,
        title: bookInfo.title,
        author: bookInfo.author,
        bookQuantity: `${bookInfo.currentQuantity}/${bookInfo.totalQuantity}`,
        borrowers: bookInfo.borrowInfos.map((borrowInfo) => borrowInfo.borrowerRealName).join(', '),
        canBorrow: !!bookInfo.currentQuantity,
      }));
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: ManageBookInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.bookManageList({ page, size, searchType, search }),
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

const useEditBookThumbnailMutation = () => {
  const fetcher = ({ bookId, thumbnail }: { bookId: number; thumbnail?: Blob | null }) =>
    axios.patch(`/manage/books/${bookId}`, thumbnail);

  return useMutation(fetcher);
};

const useGetBookDetailQuery = (bookId: number) => {
  const fetcher = () => axios.get(`/manage/books/${bookId}`).then(({ data }) => data);

  return useQuery<ManageBookInfo>(libraryManageKeys.bookDetail(bookId), fetcher);
};

const useGetBorrowInfoListQuery = ({ page, size = 10, status, search }: BorrowInfoListSearch) => {
  const fetcher = () =>
    axios.get('/manage/borrow-infos', { params: { page, size, status, search } }).then(({ data }) => {
      const content = data.content.map((borrowInfo: BorrowInfo) => {
        const borrowStatus: { [key: string]: string } = {
          대출대기중: '대출 신청',
          반납대기중: '반납 신청',
        };
        return {
          borrowInfoId: borrowInfo.borrowInfoId,
          status: borrowStatus[borrowInfo.status],
          requestDatetime: DateTime.fromISO(borrowInfo?.requestDatetime || '').toFormat('yyyy.MM.dd'),
          bookTitle: borrowInfo.bookTitle,
          author: borrowInfo.author,
          bookQuantity: '3/3', // `${borrowInfo.currentQuantity}/${borrowInfo.totalQuantity}`,
          borrowerRealName: borrowInfo.borrowerRealName,
        };
      });
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.borrowInfoList({ page, size, status, search }),
    fetcher,
  );
};

const useGetOverdueInfoListQuery = ({ page, size = 10, status = 'overdue' }: BorrowInfoListSearch) => {
  const fetcher = () =>
    axios.get('/manage/borrow-infos', { params: { page, size, status } }).then(({ data }) => {
      const content = data.content.map((borrowInfo: BorrowInfo) => {
        const borrowStatus: { [key: string]: string } = {
          대출승인: '대출중',
          반납대기중: '반납대기',
        };

        return {
          bookTitle: borrowInfo.bookTitle,
          author: borrowInfo.author,
          borrowerRealName: borrowInfo.borrowerRealName,
          requestDatetime: DateTime.fromISO(borrowInfo?.requestDatetime || '').toFormat('yyyy.MM.dd'),
          expiredDateTime: DateTime.fromISO(borrowInfo?.expiredDateTime || '').toFormat('yyyy.MM.dd'),
          status: borrowStatus[borrowInfo.status],
        };
      });
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BorrowInfo[]; totalElement: number; size: number }>(
    libraryManageKeys.overdueInfoList({ page, size, status }),
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
};
