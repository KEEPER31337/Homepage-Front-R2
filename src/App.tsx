import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
        retry: false,
        refetchOnWindowFocus: false,
      },
    });

    const unsubscribeFromQueries = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === 'updated' && event.action.type === 'error') {
        handleError(event.action.error);
      }
    });
    const unsubscribeFromMutations = queryClient.getMutationCache().subscribe((event) => {
      if (event.type === 'updated' && event.action.type === 'error') {
        handleError(event.action.error);
      }
    });

    return () => {
      unsubscribeFromQueries();
      unsubscribeFromMutations();
    };
  }, [queryClient, handleError]);

  const routes = useMainRouter();

  return <div className="bg-subBlack">{routes}</div>;
};

export default App;
