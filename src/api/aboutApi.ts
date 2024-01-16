import { useQuery } from 'react-query';
import axios from 'axios';
import { PageBlockInfo } from './dto';

const aboutKeys = {
  base: ['about'] as const,
  titleType: () => [...aboutKeys.base, 'titles', 'types'] as const,
  blockList: (type: string) => [...aboutKeys.base, 'titles', 'types', type] as const,
};

const useGetTitleTypesQuery = () => {
  const fetcher = () => axios.get(`/about/titles/types`).then(({ data }) => data.list);

  return useQuery<string[]>(aboutKeys.titleType(), fetcher);
};

const useGetBlockListQuery = ({ type }: { type: string }) => {
  const fetcher = () => axios.get(`/about/titles/types/${type}`).then(({ data }) => data);

  return useQuery<PageBlockInfo>(aboutKeys.blockList(type), fetcher);
};

export { useGetTitleTypesQuery, useGetBlockListQuery };
