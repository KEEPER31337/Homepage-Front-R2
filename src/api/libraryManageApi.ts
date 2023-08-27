import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { BookManageInfo, BookListSearch, EditBookCore } from './dto';

const libraryManageKeys = {
  bookManageList: (param: BookListSearch) => ['libraryManage', 'bookManageList', param] as const,
};

const useGetBookManageListQuery = (param: BookListSearch) => {
  const fetcher = () =>
    axios.get('/manage/books', { params: { ...param } }).then(({ data }) => {
      const content = data.content.map((bookInfo: BookManageInfo) => ({
        id: bookInfo.bookId,
        title: bookInfo.title,
        author: bookInfo.author,
        bookQuantity: `${bookInfo.currentQuantity}/${bookInfo.totalQuantity}`,
        borrowers: bookInfo.borrowInfos.map((borrowInfo) => borrowInfo.borrowerRealName).join(', '),
        canBorrow: bookInfo.totalQuantity > bookInfo.currentQuantity,
      }));
      return { content, totalElement: data.totalElements };
    });

  return useQuery<{ content: BookManageInfo[]; totalElement: number }>(
    libraryManageKeys.bookManageList(param),
    fetcher,
  );
};

const useAddBookMutation = () => {
  const fetcher = ({ bookMetaData, thumbnail }: { bookMetaData: EditBookCore; thumbnail?: Blob | null }) => {
    const formData = new FormData();
    formData.append('bookMetaData', new Blob([JSON.stringify(bookMetaData)], { type: 'application/json' }));
    if (thumbnail) formData.append('thumbnail', thumbnail);

    return axios.post('/manage/books', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

const useDeleteBookMutation = () => {
  const fetcher = (bookId: number) => axios.delete(`/manage/books/${bookId}`);

  return useMutation(fetcher);
};

export { useGetBookManageListQuery, useAddBookMutation, useDeleteBookMutation };
