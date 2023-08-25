import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) - 1 : 0;

  const getRowNumber = ({ size = 10, index }: { size?: number; index: number }) => {
    return size * page + (index + 1);
  };

  return { page, getRowNumber };
};

export default usePagination;
