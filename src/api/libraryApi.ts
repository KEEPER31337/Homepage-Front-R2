import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { BookInfo, BorrowedBookInfo, BookListSearch } from './dto';

const libraryKeys = {
  bookList: (param: BookListSearch) => ['library', 'bookList', param] as const,
  borrowedBookList: ['library', 'borrowedBookList'] as const,
};

const useGetBookListQuery = (param: BookListSearch) => {
  const fetcher = () =>
    axios.get('/books', { params: { ...param } }).then(({ data }) => {
      const content = data.content.map(({ currentQuantity, totalQuantity, ...rest }: BookInfo) => ({
        ...rest,
        bookQuantity: `${currentQuantity}/${totalQuantity}`,
      }));
      return { content, totalElement: data.totalElements };
    });

  return useQuery<{ content: BookInfo[]; totalElement: number }>(libraryKeys.bookList(param), fetcher);
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

export { useGetBookListQuery, useRequestBorrowBookMutation, useGetBookBorrowsQuery };
