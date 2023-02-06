import axios from 'axios';
import { useQuery } from 'react-query';
import { PageBlockInfo } from './dto';

const useGetTitleTypesQuery = () => {
  const fetcher = () => axios.get(`/about/titles/types`).then(({ data }) => data.list);

  return useQuery<string[]>('titleType', fetcher);
};

const useGetBlockListQuery = ({ type }: { type: string }) => {
  const fetcher = () => axios.get(`/about/titles/types/${type}`).then(({ data }) => data);

  return useQuery<PageBlockInfo>('blockList', fetcher);
};

export { useGetTitleTypesQuery, useGetBlockListQuery };
