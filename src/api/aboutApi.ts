import axios from 'axios';
import { useQuery } from 'react-query';
import { PageBlockInfo } from './dto';

const aboutKeys = {
  titleType: ['titleType'] as const,
  blockList: ['blockList'] as const,
};

const useGetTitleTypesQuery = () => {
  const fetcher = () => axios.get(`/about/titles/types`).then(({ data }) => data.list);

  return useQuery<string[]>(aboutKeys.titleType, fetcher);
};

const useGetBlockListQuery = ({ type }: { type: string }) => {
  const fetcher = () => axios.get(`/about/titles/types/${type}`).then(({ data }) => data);

  return useQuery<PageBlockInfo>([aboutKeys.blockList, type], fetcher);
};

export { useGetTitleTypesQuery, useGetBlockListQuery };
