import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { BookInfo, BorrowedBookInfo, BookListSearch, PageAndSize } from './dto';

const libraryKeys = {
  base: ['books'] as const,
  bookList: (params: BookListSearch) => [...libraryKeys.base, params] as const,
  borrowedBookList: (params: PageAndSize) => [...libraryKeys.base, 'bookBorrows', params] as const,
};

const useGetBookListQuery = ({ page, size = 6, searchType, search }: BookListSearch) => {
  const params = { page, size, searchType, search };
  const fetcher = () =>
    axios.get('/books', { params }).then(({ data }) => {
      const content = data.content.map(({ currentQuantity, totalQuantity, ...rest }: BookInfo) => ({
        ...rest,
        bookQuantity: `${currentQuantity}/${totalQuantity}`,
      }));
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BookInfo[]; totalElement: number; size: number }>(libraryKeys.bookList(params), fetcher);
};

const useGetBorrowedBookListQuery = ({ page, size }: PageAndSize) => {
  const params = { page, size };
  const fetcher = () =>
    axios.get(`/books/book-borrows`, { params }).then(({ data }) => {
      return { content: data.content, totalElement: data.totalElements };
    });
  return useQuery<{ content: BorrowedBookInfo[]; totalElement: number }>(libraryKeys.borrowedBookList(params), fetcher);
};

const useRequestBorrowBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (selectedBookId: number) => axios.post(`/books/${selectedBookId}/request-borrow`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.bookList({}) });
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList({}) });
    },
  });
};

const useRequestReturnBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (selectedBookId: number) => axios.patch(`/books/borrows/${selectedBookId}/request-return`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList({}) });
    },
  });
};

const useCancelReturnBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (selectedBookId: number) => axios.patch(`/books/borrows/${selectedBookId}/cancel-return`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList({}) });
    },
  });
};

const useCancelBorrowBookMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (selectedBookId: number) => axios.delete(`/books/borrows/${selectedBookId}/cancel-borrow`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList({}) });
    },
  });
};

export {
  useGetBookListQuery,
  useGetBorrowedBookListQuery,
  useRequestBorrowBookMutation,
  useRequestReturnBookMutation,
  useCancelReturnBookMutation,
  useCancelBorrowBookMutation,
};
