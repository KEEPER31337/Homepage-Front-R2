import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { PageAndSize, MeritLog, MeritType } from './dto';

const meritKeys = {
  meritLog: (param: PageAndSize) => ['merit-log', param] as const,
  meritType: (param: PageAndSize) => ['merit-type', param] as const,
};

const useGetMeritLog = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MeritLog>(meritKeys.meritLog({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetMeritType = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits/types', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<MeritType>(meritKeys.meritType({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

export { useGetMeritLog, useGetMeritType };
