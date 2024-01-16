import { useQuery } from 'react-query';
import axios from 'axios';
import { PageBlockInfo } from './dto';

const aboutKeys = {
  base: ['about'] as const,
  titleType: () => [...aboutKeys.base, 'titleType'] as const,
  blockList: (params: { type: string }) => [...aboutKeys.base, 'blockList', params] as const,
};

const useGetTitleTypesQuery = () => {
  const fetcher = () => axios.get(`/about/titles/types`).then(({ data }) => data.list);

  return useQuery<string[]>(aboutKeys.titleType(), fetcher);
};

const useGetBlockListQuery = ({ type }: { type: string }) => {
  const params = { type };
  const fetcher = () => axios.get(`/about/titles/types/${type}`).then(({ data }) => data);

  return useQuery<PageBlockInfo>(aboutKeys.blockList(params), fetcher);
};

export { useGetTitleTypesQuery, useGetBlockListQuery };
