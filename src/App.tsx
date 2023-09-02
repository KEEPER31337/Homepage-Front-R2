import React from 'react';
import { useQueryClient } from 'react-query';
import { useApiError } from '@hooks/useGetApiError';
import useMainRouter from '@router/useMainRouter';

const App = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  queryClient.setDefaultOptions({
    queries: {
      onError: handleError,
      retry: false,
    },
    mutations: {
      onError: handleError,
    },
  });

  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
