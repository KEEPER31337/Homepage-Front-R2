import React from 'react';
import useMainRouter from '@router/useMainRouter';
import { useApiError } from '@hooks/useGetApiError';
import { useQueryClient } from 'react-query';

const App = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      onError: handleError,
    },
    mutations: {
      onError: handleError,
    },
  });

  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
