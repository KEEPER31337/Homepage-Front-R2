import axios from 'axios';
import { useQuery } from 'react-query';
import { BookInfo } from './dto';

const libraryKeys = {
  bookListContent: ['bookList'] as const,
};

interface getBookListProps {
  searchType?: 'title' | 'author' | 'all' | null;
  search?: string;
  page?: number;
  size?: number;
}

const useGetBookListQuery = (param: getBookListProps) => {
  const fetcher = () =>
    axios.get('/books', { params: { ...param } }).then(({ data }) =>
      data.content.map(({ currentQuantity, totalQuantity, ...rest }: BookInfo) => ({
        ...rest,
        bookQuantity: `${currentQuantity}/${totalQuantity}`,
      })),
    );

  return useQuery<BookInfo[]>(libraryKeys.bookListContent, fetcher);
};

export default useGetBookListQuery;