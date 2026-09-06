import { matchQuery, queryOptions, useQuery, type QueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { formatGeneration } from '@utils/converter';
import { getStoredMe, removeMe, storeMe } from '@utils/meStorage';
import type { MemberDetailInfo } from './dto';

export const meKey = ['members', 'me'] as const;

export const normalizeMe = (member: MemberDetailInfo): MemberDetailInfo => ({
  ...member,
  generation: formatGeneration(member.generation),
});

export const meQueryOptions = queryOptions({
  queryKey: meKey,
  queryFn: async ({ signal }): Promise<MemberDetailInfo | null> => {
    try {
      const { data } = await axios.get<MemberDetailInfo>('/members/me', { signal });
      return normalizeMe(data);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) return null;
      throw error;
    }
  },
  initialData: getStoredMe,
  staleTime: Infinity,
  retry: false,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
});

export const useMeQuery = () => useQuery(meQueryOptions);

export const cancelMe = (client: QueryClient) => client.cancelQueries({ queryKey: meKey, exact: true });

export const setMe = async (client: QueryClient, member: MemberDetailInfo | null) => {
  await cancelMe(client);
  client.setQueryData(meKey, member);
};

export const subscribeToMe = (client: QueryClient) =>
  client.getQueryCache().subscribe((event) => {
    if (
      event.type === 'updated' &&
      event.action.type === 'success' &&
      matchQuery({ queryKey: meKey, exact: true }, event.query)
    ) {
      const member = event.query.state.data as MemberDetailInfo | null;
      if (member === null) removeMe();
      else storeMe(member);
    }
  });
