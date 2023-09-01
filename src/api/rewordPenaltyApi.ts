import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { PageAndSize, RewordPenaltyLog, RewordPenaltyType } from './dto';

const rewordPenaltyKeys = {
  rewordPenaltyLog: (param: PageAndSize) => ['reword-penalty-log', param] as const,
  rewordPenaltyType: (param: PageAndSize) => ['reword-penalty-type', param] as const,
};

const useGetRewordPenaltyLog = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<RewordPenaltyLog>(rewordPenaltyKeys.rewordPenaltyLog({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

const useGetRewordPenaltyType = ({ page, size = 10 }: PageAndSize) => {
  const fetcher = () =>
    axios
      .get('/merits/types', {
        params: { page, size },
      })
      .then(({ data }) => data);

  return useQuery<RewordPenaltyType>(rewordPenaltyKeys.rewordPenaltyType({ page, size }), fetcher, {
    keepPreviousData: true,
  });
};

export { useGetRewordPenaltyLog, useGetRewordPenaltyType };
