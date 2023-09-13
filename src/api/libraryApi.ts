import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { BookInfo, BorrowedBookInfo, BookListSearch } from './dto';

const libraryKeys = {
  bookList: (param: BookListSearch) => ['library', 'bookList', param] as const,
  borrowedBookList: ['library', 'borrowedBookList'] as const,
};

const useGetBookListQuery = ({ page, size = 6, searchType, search }: BookListSearch) => {
  const fetcher = () =>
    axios.get('/books', { params: { page, size, searchType, search } }).then(({ data }) => {
      const content = data.content.map(({ currentQuantity, totalQuantity, ...rest }: BookInfo) => ({
        ...rest,
        bookQuantity: `${currentQuantity}/${totalQuantity}`,
      }));
      return { content, totalElement: data.totalElements, size: data.size };
    });

  return useQuery<{ content: BookInfo[]; totalElement: number; size: number }>(
    libraryKeys.bookList({ page, size, searchType, search }),
    fetcher,
  );
};

const useRequestBorrowBookMutation = () => {
  const fetcher = (selectedBookId: number) => axios.post(`/books/${selectedBookId}/request-borrow`);

  return useMutation(fetcher);
};

const useGetBookBorrowsQuery = ({ page, size }: { page: number; size: number }) => {
  const fetcher = () =>
    axios.get(`/books/book-borrows`, { params: { page, size } }).then(({ data }) => {
      return { content: data.content, totalElement: data.totalElements };
    });
  return useQuery<{ content: BorrowedBookInfo[]; totalElement: number }>(libraryKeys.borrowedBookList, fetcher);
};

const useRequestReturnBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (selectedBookId: number) => axios.patch(`/books/borrows/${selectedBookId}/request-return`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList });
    },
  });
};

const useCancleReturnBookMutation = () => {
  const queryClient = useQueryClient();
  const fetcher = (selectedBookId: number) => axios.patch(`/books/borrows/${selectedBookId}/cancel-return`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList });
    },
  });
};

const useCancleBorrowBookMutation = () => {
  const queryClient = useQueryClient();

  const fetcher = (selectedBookId: number) => axios.delete(`/books/borrows/${selectedBookId}/cancel-borrow`);

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: libraryKeys.borrowedBookList });
    },
  });
};

export {
  useGetBookListQuery,
  useRequestBorrowBookMutation,
  useGetBookBorrowsQuery,
  useRequestReturnBookMutation,
  useCancleReturnBookMutation,
  useCancleBorrowBookMutation,
};
