import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/home/Home';
import SeminarManage from '@pages/admin/SeminarManage';
import SeminarAttend from '@pages/senimarAttend/SenimarAttend';

const useMainRouter = () =>
  useRoutes([
    {
      path: '/',
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'admin',
          children: [
            {
              path: 'seminarManage',
              element: <SeminarManage />,
            },
          ],
        },
        {
          path: 'seminarAttend',
          element: <SeminarAttend />,
        },
      ],
    },
  ]);

export default useMainRouter;
