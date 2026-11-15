import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  WikiDocument,
  WikiDocumentCreateRequest,
  WikiDocumentIdResponse,
  WikiDocumentListParams,
  WikiDocumentSummary,
  WikiDocumentUpdateRequest,
  WikiPage,
  WikiRevision,
  WikiRevisionListParams,
  WikiRevisionSummary,
} from './wikiDto';

/* NOTE 위키 백엔드 API가 배포되기 전까지 개발 환경(import.meta.env.DEV)에서는 mock(@mocks/wikiApiMock)으로 동작합니다.
  프로덕션 빌드에서는 실제 API를 호출하고, mock은 동적 import라 번들에 포함되지 않습니다.
  백엔드 배포 후에는 아래 fetcher들의 DEV 분기와 mock을 제거하면 됩니다. */
const wikiKeys = {
  base: ['wiki'] as const,
  docList: (params: WikiDocumentListParams) => [...wikiKeys.base, 'docs', params] as const,
  doc: (docId: number) => [...wikiKeys.base, 'doc', docId] as const,
  revisionList: (docId: number, params: WikiRevisionListParams) =>
    [...wikiKeys.doc(docId), 'revisions', params] as const,
  revision: (docId: number, revisionNo: number) => [...wikiKeys.doc(docId), 'revision', revisionNo] as const,
};

/* NOTE searchType과 search가 모두 있어야 검색되므로, 하나라도 없으면 둘 다 보내지 않습니다. */
const normalizeDocListParams = ({ searchType, search, sort, page, size }: WikiDocumentListParams) => {
  const trimmedSearch = search?.trim();
  const hasSearch = Boolean(searchType && trimmedSearch);

  return {
    searchType: hasSearch ? searchType : undefined,
    search: hasSearch ? trimmedSearch : undefined,
    sort,
    page,
    size,
  };
};

const getWikiDocs = async (params: WikiDocumentListParams) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).getWikiDocsMock(params);

  const { data } = await axios.get<WikiPage<WikiDocumentSummary>>('/wiki/docs', { params });
  return data;
};

const getWikiDoc = async (docId: number) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).getWikiDocMock(docId);

  const { data } = await axios.get<WikiDocument>(`/wiki/docs/${docId}`);
  return data;
};

const getWikiRevisions = async (docId: number, params: WikiRevisionListParams) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).getWikiRevisionsMock(docId, params);

  const { data } = await axios.get<WikiPage<WikiRevisionSummary>>(`/wiki/docs/${docId}/revisions`, { params });
  return data;
};

const getWikiRevision = async (docId: number, revisionNo: number) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).getWikiRevisionMock(docId, revisionNo);

  const { data } = await axios.get<WikiRevision>(`/wiki/docs/${docId}/revisions/${revisionNo}`);
  return data;
};

const createWikiDoc = async (request: WikiDocumentCreateRequest) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).createWikiDocMock(request);

  const { data } = await axios.post<WikiDocumentIdResponse>('/wiki/docs', request);
  return data;
};

const updateWikiDoc = async ({ docId, request }: { docId: number; request: WikiDocumentUpdateRequest }) => {
  if (import.meta.env.DEV) return (await import('@mocks/wikiApiMock')).updateWikiDocMock(docId, request);

  const { data } = await axios.put<WikiDocumentIdResponse>(`/wiki/docs/${docId}`, request);
  return data;
};

/* NOTE 위키 에러 응답에는 에러 코드가 없고 message에 사용자 입력값이 그대로 담기므로, HTTP 상태 코드로만 분기합니다. */
const getWikiErrorStatus = (error: unknown) => (error as AxiosError | null)?.response?.status;

const useGetWikiDocListQuery = (params: WikiDocumentListParams) => {
  const normalizedParams = normalizeDocListParams(params);

  return useQuery<WikiPage<WikiDocumentSummary>>({
    queryKey: wikiKeys.docList(normalizedParams),
    queryFn: () => getWikiDocs(normalizedParams),
    placeholderData: keepPreviousData,
  });
};

const useGetWikiDocQuery = ({ docId }: { docId: number }) => {
  return useQuery<WikiDocument>({
    queryKey: wikiKeys.doc(docId),
    queryFn: () => getWikiDoc(docId),
  });
};

const useGetWikiRevisionListQuery = ({ docId, page, size }: WikiRevisionListParams & { docId: number }) => {
  const params = { page, size };

  return useQuery<WikiPage<WikiRevisionSummary>>({
    queryKey: wikiKeys.revisionList(docId, params),
    queryFn: () => getWikiRevisions(docId, params),
    placeholderData: keepPreviousData,
  });
};

const useGetWikiRevisionQuery = ({ docId, revisionNo }: { docId: number; revisionNo: number }) => {
  return useQuery<WikiRevision>({
    queryKey: wikiKeys.revision(docId, revisionNo),
    queryFn: () => getWikiRevision(docId, revisionNo),
  });
};

const useCreateWikiDocMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<WikiDocumentIdResponse, Error, WikiDocumentCreateRequest>({
    mutationFn: createWikiDoc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wikiKeys.base });
    },
  });
};

const useUpdateWikiDocMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<WikiDocumentIdResponse, Error, { docId: number; request: WikiDocumentUpdateRequest }>({
    mutationFn: updateWikiDoc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wikiKeys.base });
    },
  });
};

export {
  getWikiDoc,
  getWikiErrorStatus,
  useCreateWikiDocMutation,
  useGetWikiDocListQuery,
  useGetWikiDocQuery,
  useGetWikiRevisionListQuery,
  useGetWikiRevisionQuery,
  useUpdateWikiDocMutation,
  wikiKeys,
};
