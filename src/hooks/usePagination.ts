import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (pageKey = 'page') => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(pageKey) ? Number(searchParams.get(pageKey)) - 1 : 0;

  const getRowNumber = ({ size = 10, index }: { size?: number; index: number }) => {
    return size * page + (index + 1);
  };

  const setPage = (newPage: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [pageKey]: String(newPage) });
  };

  useEffect(() => {
    if (!searchParams.get(pageKey)) {
      setSearchParams({ ...Object.fromEntries(searchParams), [pageKey]: String(1) });
    }
  }, [page]);

  return { page, getRowNumber, setPage };
};

export default usePagination;
