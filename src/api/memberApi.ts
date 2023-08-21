import axios from 'axios';
import { useQuery } from 'react-query';
import { Member, Job } from './dto';

const memberKeys = {
  executives: ['member', 'executives'] as const,
  executiveJob: ['member', 'executiveJobs'] as const,
};

const useGetExecutives = () => {
  const fetcher = () => axios.get('/members/executives').then(({ data }) => data);

  return useQuery<Member[]>(memberKeys.executives, fetcher);
};

const useGetExecutiveJobs = () => {
  const fetcher = () => axios.get('/members/executive-jobs').then(({ data }) => data);

  return useQuery<Job[]>(memberKeys.executiveJob, fetcher);
};

export { useGetExecutives, useGetExecutiveJobs };
