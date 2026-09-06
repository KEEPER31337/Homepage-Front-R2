import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiError } from '@hooks/useGetApiError';
import { meQueryOptions } from '@api/meApi';
import useMainRouter from '@router/useMainRouter';

const App = () => {
  const { handleError } = useApiError();
  useQuery({ ...meQueryOptions, refetchOnMount: 'always' });
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribeFromQueries = queryClient.getQueryCache().subscribe((event) => {
      if (event.type === 'updated' && event.action.type === 'error') {
        handleError(event.action.error);
      }
    });
    const unsubscribeFromMutations = queryClient.getMutationCache().subscribe((event) => {
      if (event.type === 'updated' && event.action.type === 'error' && !event.mutation.meta?.skipGlobalErrorHandler) {
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
