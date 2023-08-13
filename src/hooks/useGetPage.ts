import { useSearchParams } from 'react-router-dom';

const useGetPage = () => {
  const [searchParams] = useSearchParams();

  if (!searchParams.get('page')) return { page: 0 };

  return { page: Number(searchParams.get('page')) - 1 };
};

export default useGetPage;
