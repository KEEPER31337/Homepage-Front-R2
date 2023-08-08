import axios from 'axios';
import { useMutation } from 'react-query';
import { UploadPost } from './dto';

const useUploadPostMutation = () => {
  const fetcher = (postInfo: UploadPost) => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(postInfo)], { type: 'application/json' }));

    return axios.post('/posts', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return useMutation(fetcher);
};

export default useUploadPostMutation;
