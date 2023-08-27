import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { ManageBookInfo, BookListSearch } from './dto';

const libraryManageKeys = {
  bookManageList: (param: BookListSearch) => ['libraryManage', 'bookManageList', param] as const,
};

const useGetBookManageListQuery = (param: BookListSearch) => {
  const fetcher = () =>
    axios.get('/manage/books', { params: { ...param } }).then(({ data }) => {
      const content = data.content.map((bookInfo: ManageBookInfo) => ({
        id: bookInfo.bookId,
        title: bookInfo.title,
        author: bookInfo.author,
        bookQuantity: `${bookInfo.currentQuantity}/${bookInfo.totalQuantity}`,
        borrowers: bookInfo.borrowInfos.map((borrowInfo) => borrowInfo.borrowerRealName).join(', '),
        canBorrow: !!bookInfo.currentQuantity,
      }));
      return { content, totalElement: data.totalElements };
    });

  return useQuery<{ content: ManageBookInfo[]; totalElement: number }>(
    libraryManageKeys.bookManageList(param),
    fetcher,
  );
};

const useDeleteBookMutation = () => {
  const fetcher = (bookId: number) => axios.delete(`/manage/books/${bookId}`);

  return useMutation(fetcher);
};

export { useGetBookManageListQuery, useDeleteBookMutation };