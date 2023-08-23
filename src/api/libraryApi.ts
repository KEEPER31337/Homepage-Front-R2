import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { BookInfo } from './dto';

interface getBookListProps {
  searchType?: 'title' | 'author' | 'all';
  search?: string;
  page?: number;
  size?: number;
}

const libraryKeys = {
  bookListContent: (param: getBookListProps) => ['library', 'bookList', param] as const,
};

const useGetBookListQuery = (param: getBookListProps) => {
  const fetcher = () =>
    axios.get('/books', { params: { ...param } }).then(({ data }) => {
      const content = data.content.map(({ currentQuantity, totalQuantity, ...rest }: BookInfo) => ({
        ...rest,
        bookQuantity: `${currentQuantity}/${totalQuantity}`,
      }));
      return { content, totalElement: data.totalElements };
    });

  return useQuery<{ content: BookInfo[]; totalElement: number }>(libraryKeys.bookListContent(param), fetcher);
};

const useRequestBorrowBookMutation = () => {
  const fetcher = (selectedBookId: number) => axios.post(`/books/${selectedBookId}/request-borrow`);

  return useMutation(fetcher);
};

export { useGetBookListQuery, useRequestBorrowBookMutation };
