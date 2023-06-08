import axios from 'axios';
import { useQuery } from 'react-query';

const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMzgiLCJyb2xlcyI6IlJPTEVf7ZqM7JuQLFJPTEVf7ZqM7J6lIiwiaWF0IjoxNjg1ODc4NTM4LCJleHAiOjE2ODU4ODIxMzh9.3cQnX3WTDuQhY1ZWiAFSih0ib8V72Wls4-DeeYiYq74;';
axios.defaults.withCredentials = true;
export interface SeminarListInfo {
  id: number;
  opemnTime: string;
  attendanceCloseTime: string;
  latenessCloseTime: string;
  attendanceCode: string;
  name: string;
  registerTime: string;
  updateTime: string;
}

const seminarKeys = {
  seminarList: ['seminarList'] as const,
};

const listAllSeminarList = () => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Set-Cookie': `${accessToken}`,
      // 'document.cookie': `accessToken=${accessToken}`,
    },
    crossDomain: true,
    credentials: 'same-origin',
  };
  axios.get(`/seminars`, axiosConfig).then(({ data }) => data);

  //   return useQuery<string[]>('listAllSeminarList', fetcher);
};

/* const listAllSeminarList = () => {
  const fetcher = () =>
    axios
      .get(`/seminars`, {
        headers: {
          Authorization: `${accessToken}`,
          eithCredentials: true,
        },
      })
      .then<SeminarListInfo>((res) => res.data);
  return useQuery({
    queryKey: seminarKeys.seminarList,
    queryFn: fetcher,
  });
}; */

/* const listAllSeminarList = () => {
  const fetcher = () =>
    axios
      .get(`/seminars`, {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },
      })
      .then(({ data }) => data.seminarList);
  return useQuery({
    queryKey: seminarKeys.seminarList,
    queryFn: fetcher,
  });
}; */

export default listAllSeminarList;
