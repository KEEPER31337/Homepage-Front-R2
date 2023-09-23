import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { StudyCore, StudyDetail, StudyInfo, UploadStudy } from './dto';

const useAddStudyMutation = () => {
  const fetcher = ({ request, thumbnail }: UploadStudy) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (thumbnail) formData.append('thumbnail', thumbnail);

    return axios.post('/studies', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
    },
  });
};

const useDeleteStudyMutation = () => {
  const fetcher = ({ studyId }: { studyId: number }) => {
    return axios.delete(`/studies/${studyId}`);
  };

  return useMutation(fetcher);
};

const useGetStudyListQuery = ({ year, season }: { year: number; season: number }) => {
  const fetcher = () => axios.get('/studies', { params: { year, season } }).then(({ data }) => data.studies);

  return useQuery<StudyInfo[]>(['studies', year, season], fetcher);
};

const useGetStudyQuery = ({ studyId, enabled }: { studyId: number; enabled?: boolean }) => {
  const fetcher = () => axios.get(`/studies/${studyId}`).then(({ data }) => data);

  return useQuery<StudyDetail>(['studies', studyId], fetcher, { enabled });
};

const useEditStudyThumbnailMutation = ({ studyId }: { studyId: number }) => {
  const fetcher = () => axios.patch(`/studies/${studyId}/thumbnail`);

  return useMutation(fetcher);
};

const useEditStudyMutation = () => {
  const fetcher = ({ studyId, studyInfo }: { studyId: number; studyInfo: StudyCore }) =>
    axios.put(`/studies/${studyId}`, studyInfo);

  return useMutation(fetcher);
};

export {
  useAddStudyMutation,
  useDeleteStudyMutation,
  useGetStudyListQuery,
  useGetStudyQuery,
  useEditStudyThumbnailMutation,
  useEditStudyMutation,
};
