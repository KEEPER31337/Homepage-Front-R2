import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useApiError } from '@hooks/useGetApiError';
import useAuthBootstrap from '@hooks/useAuthBootstrap';
import useMainRouter from '@router/useMainRouter';

const App = () => {
  const { handleError } = useApiError();
  useAuthBootstrap();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        onError: handleError,
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: handleError,
      },
    });
  }, [queryClient, handleError]);

  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
