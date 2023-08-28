import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { ManageBookInfo, BookListSearch, BookCoreData } from './dto';

const libraryManageKeys = {
  bookManageList: (param: BookListSearch) => ['libraryManage', 'bookManageList', param] as const,
};

const useGetBookManageListQuery = ({ page, size = 10, searchType, search }: BookListSearch) => {
  const fetcher = () =>
    axios.get('/manage/books', { params: { page, size, searchType, search } }).then(({ data }) => {
      const content = data.content.map((bookInfo: ManageBookInfo) => ({
        id: bookInfo.bookId,
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
  const fetcher = ({ bookMetaData, thumbnail }: { bookMetaData: BookCoreData; thumbnail?: Blob | null }) => {
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
