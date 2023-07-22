import axios from 'axios';
import { useMutation } from 'react-query';
import { UploadPost } from './dto';

const useUploadPostMutation = () => {
  const fetcher = (postInfo: UploadPost) => axios.post('/posts', postInfo);

  return useMutation(fetcher);
};

export default useUploadPostMutation;
